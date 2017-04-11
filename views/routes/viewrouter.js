"use strict";
const pm = require("../scripts/manager");
function checkLogin(req, res, callback) {
    if (req.param("handerMethod") != "loginAction") {
        var sessionReq = req.session;
        if (!sessionReq || !sessionReq["PMUser"]) {
            // 将用户重定向到登录页面
            res.send({ code: 401 });
            return;
        }
    }
    callback();
}
function login(req, res) {
    res.redirect('/admin/login.html');
}
exports.login = login;
;
function viewGet(req, res) {
    // pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.query, req, res);
    // console.log("get请求");
    checkLogin(req, res, function () {
        pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.query, req, res);
    });
}
exports.viewGet = viewGet;
;
function viewPost(req, res) {
    // pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.body, req, res);
    checkLogin(req, res, function () {
        pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.body, req, res);
    });
}
exports.viewPost = viewPost;
;
//# sourceMappingURL=viewrouter.js.map