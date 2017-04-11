import util = require("../../scripts/util");
import _ = require('underscore');
import qs = require('qs');
import express = require('express');
import man = require('../scripts/manager');
import activitySql = require('../mysql/activitySql');
class Activity {
    constructor() {

    }
    editActivity(input: any, req: express.Request, res: express.Response): void 
    {
        var info = {},pac = input['package'];
        for(var op in input.info){
            info[op] = input.info[op]
        }
        var getActivityList = new activitySql();
        getActivityList.editInfo('activity',info,["id"]).then(data => 
        {
            console.log(data);
            //先删除活动套餐
            getActivityList.deleteActivityPackage(info['id']).then(data => 
            {
                getActivityList.addArr('activity_package',pac).then(data => 
                {
                    res.send({code:200})
                })
            })
            // if(data['insertId'])
            // {
            //     var pac = [];
            //     for(var i = 0; i < input.package.length; i++)
            //     {
            //         var obj = {};
            //         obj = input.package[i];
            //         obj['activity_id'] = data['insertId'];
            //         pac.push(obj);
            //     }
            //     console.log(pac)
            //     getActivityList.addArr('activity_package',pac).then(data => 
            //     {
            //         res.send({code:200})
            //     })
            // }
            // console.log(data)
        })
    }
    addActivity(input: any, req: express.Request, res: express.Response): void 
    {
        
        var info = {};
        for(var op in input.info){
            info[op] = input.info[op]
        }
        var getActivityList = new activitySql();
        getActivityList.addActivity(info).then(data => 
        {
            //  res.send(data);
            console.log(data)
            if(data['insertId'])
            {
                var pac = [];
                for(var i = 0; i < input.package.length; i++)
                {
                    var obj = {};
                    obj = input.package[i];
                    obj['activity_id'] = data['insertId'];
                    pac.push(obj);
                }
                console.log(pac)
                getActivityList.addArr('activity_package',pac).then(data => 
                {
                    res.send({code:200})
                })
            }
            console.log(data)
        })
    }
    getActivityList(input: any, req: express.Request, res: express.Response): void 
    {
        var getActivityList = new activitySql();
        getActivityList.getActivityList().then(data => {
             res.send(data);
        })
    }

    deleteActivity(input: any, req: express.Request, res: express.Response): void 
    {
        var getActivityList = new activitySql();
        getActivityList.deleteActivity(input.id).then(data => {
             getActivityList.deleteActivityPackage(input.id).then(data => {
                res.send({code:200});
            })
        })
    }

    getActivityInfo(input: any, req: express.Request, res: express.Response): void 
    {
        var getActivityList = new activitySql();
        var sendData = {};
        getActivityList.getDataById("activity",'id',input.id).then(data => {
            
            sendData['info'] = data[0];
             getActivityList.getDataById("activity_package",'activity_id',input.id).then(data => {
                sendData['package'] = data;
                res.send(sendData)
            })
        })
    }
}

export = Activity;