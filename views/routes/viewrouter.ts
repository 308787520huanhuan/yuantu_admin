import express = require('express');
import qs = require('qs');
import _ = require('underscore');
import pm = require('../scripts/manager');

function checkLogin(req: express.Request, res: express.Response, callback: Function) 
{
    if (req.param("handerMethod") != "loginAction") 
    {
        var sessionReq = req.session;
        if (!sessionReq||!sessionReq["PMUser"]) 
        {
            // 将用户重定向到登录页面
            res.send({code:401});  
            return;
        }
    }
    callback();
}

export function login(req: express.Request, res: express.Response) {
    res.redirect('/admin/login.html')
};

export function viewGet(req: express.Request, res: express.Response) {
    // pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.query, req, res);
    // console.log("get请求");
    checkLogin(req, res, function () {
        pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.query, req, res);
    });
};

export function viewPost(req: express.Request, res: express.Response) {
    // pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.body, req, res);
    checkLogin(req, res, function () {
        pm.handle().platforms[req.param("handerClass")][req.param("handerMethod")](req.body, req, res);
    });
};