"use strict";
const indexSql = require("../mysql/indexSql");
class Index {
    constructor() {
    }
    loginAction(input, req, res) {
        var userName = input['userName'];
        var passWord = input['passWord'];
        var user = {};
        user['name'] = userName;
        user['passWord'] = passWord;
        var loginsql = new indexSql();
        loginsql.checkLoginAccount(userName).then(data => {
            var sendData = {};
            if (data.length == 0) {
                sendData['code'] = 400;
                sendData['info'] = '该用户不存在';
            }
            else {
                if (data[0]['password'] != passWord) {
                    sendData['code'] = 400;
                    sendData['info'] = '密码错误';
                }
                else {
                    sendData['code'] = 200;
                    req.session['PMUser'] = user;
                }
            }
            //返回给前端
            res.send(sendData);
        });
    }
    exitLogin(input, req, res) {
        console.log("logoutlogoutlogout");
        var sendData = {};
        sendData['code'] = 200;
        req.session['PMUser'] = null;
        //返回给前端
        res.send(sendData);
    }
    getTravelInfo(input, req, res) {
        var getTravelInfo = new indexSql();
        getTravelInfo.getTravelInfo().then(data => {
            res.send(data);
        });
    }
    getArticleInfo(input, req, res) {
        var articleId = input['articleId'];
        var id = input['articleId'];
        var userId = input['userId'];
        var getArticleInfo = new indexSql();
        var getArticleContent = new indexSql();
        var getUserName = new indexSql();
        var sendData = {};
        getArticleInfo.getArticleInfo(articleId).then(data => {
            sendData['list'] = data;
            getArticleContent.getArticleContent(id).then(data => {
                sendData['detail'] = data[0];
                getUserName.getUserName(userId).then(data => {
                    sendData['user'] = data[0];
                    res.send(sendData);
                });
            });
        });
    }
    updateStatus(input, req, res) {
        var para = {};
        para['status'] = input['status'];
        para['id'] = input['id'];
        var userId = input['userId'];
        var addTime = input['addTime'];
        var updateStatus = new indexSql();
        updateStatus.updateStatus(para).then(data => {
            //是首单
            updateStatus.giveCounpon({ "type": 2, "userId": userId, "money": 5, "addTime": addTime }).then(data => {
                res.send({ 'code': 200, 'isFirstOrder': true });
            });
        });
    }
    getUserList(input, req, res) {
        var getUserList = new indexSql();
        getUserList.getUserList().then(data => {
            res.send(data);
        });
    }
    ordersList(input, req, res) {
        var user_id = input['userId'];
        console.log(input);
        var getOrdersList = new indexSql();
        getOrdersList.getOrdersList(user_id).then(data => {
            res.send(data);
        });
    }
    travelsList(input, req, res) {
        var user_id = input['userId'];
        var getTravelsList = new indexSql();
        getTravelsList.getTravelsList(user_id).then(data => {
            res.send(data);
        });
    }
    contactsList(input, req, res) {
        var user_id = input['userId'];
        var getContactsList = new indexSql();
        getContactsList.getContactsList(user_id).then(data => {
            res.send(data);
        });
    }
    getAllOrdersList(input, req, res) {
        var getAllOrdersList = new indexSql();
        getAllOrdersList.getAllOrdersList().then(data => {
            res.send(data);
        });
    }
    getOrdersInfo(input, req, res) {
        var getOrdersInfo = new indexSql();
        var ordersId = input['ordersId'];
        var sendData = {};
        getOrdersInfo.getOrdersInfo(ordersId).then(data => {
            sendData['ordersInfo'] = data[0];
            data = data[0].activity_id;
            getOrdersInfo.getActivityInfo(data).then(data => {
                sendData['activityInfo'] = data[0];
                res.send(sendData);
            });
        });
    }
    goodsList(input, req, res) {
        var getGoodsList = new indexSql();
        getGoodsList.getGoodsList().then(data => {
            res.send(data);
        });
    }
    getGoodsInfo(input, req, res) {
        var id = input['id'];
        var getGoodsInfo = new indexSql();
        getGoodsInfo.getGoodsInfo(id).then(data => {
            res.send(data);
        });
    }
    getGuideList(input, req, res) {
        var getGuideList = new indexSql();
        getGuideList.getGuideList().then(data => {
            res.send(data);
        });
    }
    addGoods(input, req, res) {
        var addGoods = new indexSql();
        var para = {};
        for (var i in input) {
            para[i] = input[i];
        }
        addGoods.addGoods(para).then(data => {
            var sendData = {};
            if (data['insertId']) {
                sendData['code'] = 200;
            }
            else {
                sendData["code"] = 500;
            }
            res.send(sendData);
        });
    }
    deleteGoods(input, req, res) {
        var id = input['id'];
        var deleteGoods = new indexSql();
        deleteGoods.deleteGoods(id).then(data => {
            res.send(data);
        });
    }
    editGoods(input, req, res) {
        var editGoods = new indexSql();
        var para = {};
        for (var i in input) {
            para[i] = input[i];
        }
        editGoods.updateGoods(para).then(data => {
            var sendData = {};
            if (data) {
                sendData['code'] = 200;
            }
            else {
                sendData["code"] = 500;
            }
            res.send(sendData);
        });
    }
    addGuide(input, req, res) {
        var addGuide = new indexSql();
        var para = {};
        for (var i in input) {
            para[i] = input[i];
        }
        addGuide.addGuide(para).then(data => {
            res.send(data);
        });
    }
    editGuide(input, req, res) {
        var editGuide = new indexSql();
        var para = {};
        for (var i in input) {
            para[i] = input[i];
        }
        editGuide.updateGuide(para).then(data => {
            res.send(data);
        });
    }
    getGuideInfo(input, req, res) {
        var id = input['id'];
        var getGuideInfo = new indexSql();
        getGuideInfo.getGuideInfo(id).then(data => {
            var sendData = {};
            sendData['list'] = data[0];
            res.send(sendData);
        });
    }
    deleteGuide(input, req, res) {
        var id = input['id'];
        var deleteGuide = new indexSql();
        deleteGuide.deleteGuide(id).then(data => {
            res.send(data);
        });
    }
    //删除游记
    deleteArticle(input, req, res) {
        var raidersList = new indexSql();
        var id = input['id'];
        raidersList.deleteById('articles_content', 'article_id', id).then(data => {
            raidersList.deleteById('articles', 'id', id).then(data => {
                var obj = {};
                obj['code'] = 200;
                res.send(obj);
            });
        });
    }
}
module.exports = Index;
//# sourceMappingURL=index.js.map