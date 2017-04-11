"use strict";
const pm = require("../scripts/manager");
class indexSql {
    constructor() {
    }
    getDB() {
        return pm.handle().yuantu_db;
    }
    checkLoginAccount(userName) {
        return this.getDB().select('user', 'username', userName);
    }
    getTravelInfo() {
        var sql = "select * from user, articles where articles.user_id = user.id";
        return this.getDB().selectBySql(sql);
    }
    getArticleInfo(articleId) {
        return this.getDB().select('articles_content', 'article_id', articleId);
    }
    getArticleContent(id) {
        return this.getDB().select('articles', 'id', id);
    }
    getUserName(id) {
        return this.getDB().select('user', 'id', id);
    }
    updateStatus(para) {
        return this.getDB().updateObject("articles", para, ["id"]);
    }
    //游记通过审核 赠送优惠券
    giveCounpon(params) {
        return this.getDB().insertObject(params, "counpon");
    }
    getUserList() {
        return this.getDB().selectAll('user');
    }
    getOrdersList(id) {
        return this.getDB().select('orders', 'user_id', id);
    }
    getTravelsList(id) {
        return this.getDB().select('articles', 'user_id', id);
    }
    getContactsList(id) {
        return this.getDB().select('user_client', 'user_id', id);
    }
    getAllOrdersList() {
        var sql = "select * from user, orders where orders.user_id = user.id";
        return this.getDB().selectBySql(sql);
    }
    getOrdersInfo(ordersId) {
        return this.getDB().select('orders', 'id', ordersId);
    }
    getActivityInfo(data) {
        return this.getDB().select('activity', 'id', data);
    }
    getGoodsList() {
        return this.getDB().selectAll('goods');
    }
    getGoodsInfo(id) {
        return this.getDB().select('goods', 'id', id);
    }
    getGuideList() {
        return this.getDB().selectAll('travel_raiders');
    }
    addGoods(input) {
        return this.getDB().insertObject(input, 'goods');
    }
    deleteGoods(id) {
        var sql = "delete from goods where id = " + id;
        return this.getDB().selectBySql(sql);
    }
    updateGoods(para) {
        return this.getDB().updateObject("goods", para, ["id"]);
    }
    addGuide(input) {
        return this.getDB().insertObject(input, 'travel_raiders');
    }
    updateGuide(para) {
        return this.getDB().updateObject("travel_raiders", para, ["id"]);
    }
    getGuideInfo(id) {
        return this.getDB().select('travel_raiders', 'id', id);
    }
    deleteGuide(id) {
        var sql = "delete from travel_raiders where id = " + id;
        return this.getDB().selectBySql(sql);
    }
    deleteById(table, key, value) {
        var sql = "delete from " + table + " where " + key + " = " + value;
        return this.getDB().selectBySql(sql);
    }
}
module.exports = indexSql;
//# sourceMappingURL=indexSql.js.map