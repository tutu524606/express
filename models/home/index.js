var MysqlPool = require('../../conf/db');
var mysql = new MysqlPool();
var $sql = require('./indexsql.js');
var $util = require('../../util/util');
// 数据处理层
module.exports = {
    //得到所有商品 在路由routes调用本方法，这个方法调用sql语句 ，并返回相应结果jsonwrite
    /**
     * name: 获取表所有数据
     * method: 'get'
     * params: req.query
     */
    goodAll_get: function(req, res, next) {
        mysql.query($sql.goodAll, function(response) {
            $util.jsonWrite(res, response);
        });
    },
    /**
     * name: 查询商品详情
     * method: 'get'
     * params: req.query
     */
    goodDetail_get: function(req, res, next) {
        var param = req.query;
        mysql.query($sql.goodById, +param.id, function(response) {
            $util.jsonWrite(res, response);
        });
    },
    /**
     * name: 删除
     * method: 'delete'
     * params: req.body
     */
    goodDel_delete: function(req, res, next) {
        var param = req.body;
        mysql.query($sql.gooddelete, +param.id, function(response) {
            if (response.affectedRows > 0) {
                response = {
                    code: 200,
                    msg: '删除成功'
                };
            } else {
                response = void 0;
            }
            $util.jsonWrite(res, response);
        });
    },
    /**
     * name: 新增
     * method: 'post'
     * params: req.body
     */
    goodAdd_post: function(req, res, next) {
        // 获取前台页面传过来的参数
        var param = req.body;
        // 建立连接，向表中插入值
        // 'INSERT INTO `good` (`id`,`name`,`desc`,`price`,`sum`) VALUES(0,?,?,?,?)'
        mysql.query($sql.goodinsert, [param.name, param.desc, param.price, param.sum], function(response) {
            if (response) {
                response = {
                    code: 200,
                    msg: '增加成功'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            $util.jsonWrite(res, response);
        });
    },
    /**
     * name: 更新
     * method: 'put'
     * params: req.body
     */
    goodUpdate_put: function(req, res, next) {
        // 获取前台页面传过来的参数
        var param = req.body;
        var noset = ['id'];
        var sql = 'UPDATE `good` SET ' + $util.updateSqlHandling(param, noset) + ' WHERE `id`=' + param.id;
        mysql.query(sql, $util.handleRequest(param, noset), function(response) {
            if (response) {
                response = {
                    code: 200,
                    msg: '修改成功'
                };
            }
            $util.jsonWrite(res, response);
        });
    },
}