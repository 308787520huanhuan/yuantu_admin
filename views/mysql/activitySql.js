"use strict";
const pm = require("../scripts/manager");
class activitySql {
    constructor() {
    }
    getDB() {
        return pm.handle().yuantu_db;
    }
    getActivityList() {
        var sql = "select * from activity order by addtime desc";
        return this.getDB().selectBySql(sql);
    }
    addActivity(para) {
        return this.getDB().insertObject(para, "activity");
    }
    addArr(table, arr) {
        return this.getDB().insertArr(arr, table);
    }
    deleteActivity(id) {
        var sql = "delete from activity where id = " + id;
        return this.getDB().selectBySql(sql);
    }
    deleteActivityPackage(id) {
        var sql = "delete from activity_package where activity_package.activity_id = " + id;
        return this.getDB().selectBySql(sql);
    }
    editInfo(table, para, key) {
        return this.getDB().updateObject(table, para, key);
    }
    getDataById(table, key, id) {
        var sql = "select * from " + table + " where " + key + " = " + id;
        return this.getDB().selectBySql(sql);
    }
}
module.exports = activitySql;
//# sourceMappingURL=activitySql.js.map