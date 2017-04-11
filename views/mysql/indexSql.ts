import util = require("../../scripts/util");
import _ = require('underscore');
import qs = require('qs');
import db = require('../../scripts/db');
import express = require('express');
import pm = require('../scripts/manager');

class indexSql {

    constructor() {

    }
    getDB(): db.Pool {
        return pm.handle().yuantu_db;
    }

     checkLoginAccount(userName: string): Promise<any[]> {
        return this.getDB().select('user', 'username', userName);
    }
    getTravelInfo():Promise<any[]> {
        var sql = "select * from user, articles where articles.user_id = user.id";
        return this.getDB().selectBySql(sql);
    }
    getArticleInfo(articleId): Promise<any[]> {
        return this.getDB().select('articles_content','article_id',articleId);
    }
    getArticleContent(id): Promise<any[]> {
        return this.getDB().select('articles','id',id);
    }
     getUserName(id): Promise<any[]> {
        return this.getDB().select('user','id',id);
    }
    updateStatus(para: any):Promise<{}> {
       return this.getDB().updateObject("articles", para, ["id"]); 
    }
    //游记通过审核 赠送优惠券
    giveCounpon(params:any): Promise<Array<any>> 
    {
        return this.getDB().insertObject(params, "counpon");
    }
     getUserList(): Promise<any[]> {
        return this.getDB().selectAll('user');
    }
    getOrdersList(id): Promise<any[]> {
        return this.getDB().select('orders','user_id',id);
    }
    getTravelsList(id): Promise<any[]> {
        return this.getDB().select('articles','user_id',id);
    }
    getContactsList(id): Promise<any[]> {
        return this.getDB().select('user_client','user_id',id);
    }
    getAllOrdersList(): Promise<any[]> {
        var sql = "select * from user, orders where orders.user_id = user.id";
        return this.getDB().selectBySql(sql);
    }
    getOrdersInfo(ordersId): Promise<any[]> {
        return this.getDB().select('orders','id',ordersId);
    }
    getActivityInfo(data): Promise<any[]> {
        return this.getDB().select('activity','id',data);
    }
    getGoodsList():Promise<any[]> {
        return this.getDB().selectAll('goods');
    }
    getGoodsInfo(id): Promise<any[]> {
        return this.getDB().select('goods','id',id);
    }
    getGuideList():Promise<any[]> {
        return this.getDB().selectAll('travel_raiders');
    }
    addGoods(input):Promise<any[]> {
        return this.getDB().insertObject(input,'goods');
    }
    deleteGoods(id):Promise<any[]> {
        var sql = "delete from goods where id = " + id;
        return this.getDB().selectBySql(sql);
    }
    updateGoods(para: any):Promise<{}> {
       return this.getDB().updateObject("goods", para, ["id"]); 
    }
    addGuide(input):Promise<any[]> {
        return this.getDB().insertObject(input,'travel_raiders');
    }
    updateGuide(para: any):Promise<{}> {
       return this.getDB().updateObject("travel_raiders", para, ["id"]); 
    }
    getGuideInfo(id): Promise<any[]> {
        return this.getDB().select('travel_raiders','id',id);
    }
    deleteGuide(id):Promise<any[]> {
        var sql = "delete from travel_raiders where id = " + id;
        return this.getDB().selectBySql(sql);
    }

    deleteById(table,key,value):Promise<any[]> {
        var sql = "delete from "+table+" where "+key+" = " + value;
        return this.getDB().selectBySql(sql);
    }
}

export = indexSql;