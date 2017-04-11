import util = require("../../scripts/util");
import _ = require('underscore');
import qs = require('qs');
import db = require('../../scripts/db');
import express = require('express');
import pm = require('../scripts/manager');

class activitySql {

    constructor() {

    }
    getDB(): db.Pool {
        return pm.handle().yuantu_db;
    }
    getActivityList():Promise<any[]> {
        var sql = "select * from activity order by addtime desc";
        return this.getDB().selectBySql(sql);
    }

    addActivity(para):Promise<any[]> {
        return this.getDB().insertObject(para, "activity");
    }
    addArr(table,arr):Promise<any[]> {
        return this.getDB().insertArr(arr,table);
    }
    
    deleteActivity(id):Promise<any[]> {
        var sql = "delete from activity where id = " + id;
        return this.getDB().selectBySql(sql);
    }

    deleteActivityPackage(id):Promise<any[]> {
        var sql = "delete from activity_package where activity_package.activity_id = " + id;
        return this.getDB().selectBySql(sql);
    }
    editInfo(table,para,key):Promise<any[]> {
        return this.getDB().updateObject(table,para,key);
    }

    getDataById(table,key,id):Promise<any[]> {
        var sql = "select * from "+table+" where "+key+" = " + id;
        return this.getDB().selectBySql(sql);
    }
}

export = activitySql;