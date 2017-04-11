//重新封装jquery的ajax方法
(function($)
{
    //备份jquery的ajax方法
    var _ajax = $.ajax;

    //重写jquery的ajax方法
    $.ajax = function (opt)
    {
        //json提交要修改contentType和格式化json
        if (opt.submitType == "json")
        {
            opt.data = JSON.stringify(opt.data);
            opt.contentType = "application/json";
        }
        //备份opt中error和success方法
        var fn =
        {
            beforeSend: function(xhr)
            {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown)
            {

            },
            success: function (data, textStatus)
            {

            }
        };

        if (opt.error)
        {
            fn.error = opt.error;
        }
        if (opt.success)
        {
            fn.success = opt.success;
        }
        if (opt.beforeSend)
        {
            fn.beforeSend = opt.beforeSend;
        }

        var _opt;

        //扩展增强处理
        _opt = $.extend(opt,
        {
            beforeSend: function (xhr)
            {
                fn.beforeSend(xhr);
            },

            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                

                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },

            success: function(data, textStatus)
            {
                //若要移除loading,则移除
                if (opt.removeLoading != false)
                {
                     Tools.processLoading("end");
                }

                //认证失败
                if(data.code && data.code == Server.serverStatusCode.auth_fail)
                {
                    window.location.href = "/admin/login.html";
                }
                else
                {
                    fn.success(data, textStatus);
                }
            }
        });

        //超时
        if (opt.timeout == null)
        {
            opt.timeout = 30000;
        }

        //是否缓存
        if (opt.cache == null)
        {
            opt.cache = false;
        }

        //若要显示loading,则显示
        if (opt.showLoading != false)
        {
            Tools.processLoading("start");
        }

        return _ajax(_opt);
    };
})(jQuery);

//服务器类
var Server =
{
    //服务器状态码
    serverStatusCode:
    {
        //会话过期
        session_expired: 9997,

        //认证失败
        auth_fail: 401,

        //页面未找到
        page_not_found: 9991
    },

    //默认数据
    defaultData:
    {
        //登录背景图片url
        loginImage: "img/login_bg.jpg",
        //logo图片url
        logoImage: "img/logo.png",
        //logo背景颜色
        backgroundColor: "0073c6",
        //主表格行数,针对页面只有表格的页面
        mainPageSize: 15,
        //副表格行数,如子页面上表格
        vicePageSize: 10
    },

    //判断是否为当前页面的ajax请求返回的错误
    checkAjaxError: function(status)
    {
        return status && status.readyState == 4;
    }
};

$(document).ready(function()
{
    //返回和取消
    $('.comeBack,#cancel').on('click',function(){
        // self.opener.location.reload();
        window.history.go(-1);
        location.reload();
    })

    //退出登录
    $('#logout').on('click',function()
    {
        $.ajax 
        ({
            type:'get',
            url:'/views/index/exitLogin',
            success: function(data)
            {	
                if(data.code == 200)
                {
                    layer.alert('操作成功', 
                    {
                        icon: 1,
                        skin: 'layer-ext-moon',
                        closeBtn: 0
                    },
                    function()
                    {
                        $.cookie('userName', null); 
                        window.location.href = "/admin/login.html";
                    })
                }
                else if(data.code==400)
                {
                    alert(data.info);
                }
                
            }
        })
    })

    //输入框内容改变后,即时验证
    $(this).on("input change blur", "input", function()
    {
        var $this = $(this);
        //必填却没有填入输入
        if($this.prop("required")){
            if($this.val().length == 0)
            {
                $this.closest(".has-feedback").removeClass("has-success").addClass("has-error");
                if($this.closest(".has-feedback").find(".icon-remove-sign").length == 0 )
                {
                    $('<i class="icon-remove-sign"></i>').insertAfter($this)
                }
            }
            else
            {
               $this.closest(".has-feedback").removeClass("has-error").find(".icon-remove-sign").remove();     
            }
        }
    })

    //登录名
    if($.cookie("userName"))
    {
        $(".user-info").text("welcome , " + $.cookie("userName"))
    }
});

var Tools = 
{
    //处理Loading,参数为状态,"start"为开始loading时传递的参数, "end"为结束时传递的参数
    processLoading: function(status)
    {
        //开始
        if (status == "start")
        {
            $("body").modalmanager("loading");
        }
        //结束
        else if (status == "end")
        {
            $("body").modalmanager("removeLoading").removeClass("modal-open");
        }
    },
    //将元素的值添加到对应字段的数据中
    GetData: function ($page) 
    {
        var data = {};
        $.each($page.find("input, select, textarea,div"), function () 
        {
            //拥有id的才添加数据
            if ($(this).data("id")) {
                var value;
                //文本或者密码输入框
                if ($(this).is("input[type='text'], input[type='password'], textarea") == true) {
                    value = $(this).val();
                    data[$(this).data("id")] = value ? value : "";
                }
                //下拉列表
                else if ($(this).is("select") == true) {
                    value = $(this).val();
                    data[$(this).data("id")] = value == "null" ? null : value;
                }
                //复选框
                else if ($(this).is("input[type='checkbox']") == true) {
                    value = $(this).prop("checked");
                    data[$(this).data("id")] = value == true ? 1 : 0;
                }
                //我们规定,单选框取有id的选项的check状态
                else if ($(this).is("input[type='radio']") == true) {
                    value = $(this).prop("checked");
                    data[$(this).data("id")] = value ? 1 : 0;
                }
                //如果是编辑器
                else if ($(this).is("div") == true || $(this).data("type") == 'editor') {
                    value = $(this).html();
                    data[$(this).data("id")] = encodeURIComponent(value);
                }
            }
        });
        return data;
    },
    //将数据对应的id的元素填充上数据
    SetData: function (data, $page) {
        var option;
        var value;
        //遍历每个数据
        for (option in data) {
            value = data[option];
            var $option = $page.find("[data-id='" + option + "']");
            if (value || value == false || value == 0) {
                //bool类型值,代表勾选框或者单选框
                if (typeof value === "boolean") {
                }
                //其他数据
                else {
                    //选择框
                    if ($option.is("select") == true) {
                        $option.children("option[value='" + value + "']").prop("selected", true).end().trigger("chosen:updated");
                    }
                    //复选框
                    if ($option.is("input[type='checkbox']") == true) {
                        value = value == 1 ? true : false
                        $option.prop("checked",value)
                    }
                    if ($option.is("label") == true || $option.is("span") == true) {
                        $option.text(value);
                    }
                    if ($option.is("div") == true || $option.data("type") == 'editor') {
                        $option.html(decodeURIComponent(value));
                    }
                    //输入框
                    else {
                        $option.val(value).trigger("change");
                    }
                }
            }
            //若选择框返回的值为null,则设置value=null的选项,因为选择框的value无法设置为真正的null
            else {
                //选择框
                if ($option.is("select") == true) {
                    $option.children("option[value=null]").prop("selected", true).end().trigger("chosen:updated");
                }
            }
        }
    },
    //将毫秒数转换为日期 格式为 yyyy-m-d hh:mm:ss
    getDateTime: function (time) {
        if (time && parseInt(time)) {
            var date = new Date();
            date.setTime(time);

            var month = ((date.getMonth() + 1) < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1),
                day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate(),
                hour = (date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours(),
                minute = ((date.getMinutes()) < 10) ? ("0" + date.getMinutes()) : date.getMinutes(),
                second = (date.getSeconds()) < 10 ? ("0" + date.getSeconds()) : date.getSeconds();

            return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        }
        else {
            return "";
        }
    },

    //将毫秒数转换为日期 格式为 yyyy-m-d
    getDate: function (time) {
        if (time && parseInt(time)) {
            var date = new Date();
            date.setTime(time);

            var month = ((date.getMonth() + 1) < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
            var day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();

            return date.getFullYear() + "-" + month + "-" + day;
        }
        else {
            return "";
        }
    },
}