/**
 * 数据库地址池连接以及释放连接
 */
var express = require('express');
var mysql = require('mysql');
const { databaseConfig } = require('./config');
class MySqlPool {
    constructor() {
        this.flag = true;
        this.pool = mysql.createPool(databaseConfig);
    }
    getPool() {
        if (this.pool) {
            this.pool.on('connection', (connection) => {
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            });
        }
        return this.pool;
    }
    async query(sql, data = null, cb) {
        const that = this;
        that.pool.getConnection(function(err, connection) {
            connection.query(sql, cb ? data : null, function(err, result) {
                cb ? cb(result) : data(result);
                // connection.release();
                that.pool.releaseConnection(connection);
            });
        });
    }
}

module.exports = MySqlPool;