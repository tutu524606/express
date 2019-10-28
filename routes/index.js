var express = require('express');
var router = express.Router();
var $util = require('../util/util');
//关联主程序
var indexModel = require('../models/home/index');
/* GET home page. */
// 进入主页面信息
router.get('/', function(req, res, next) {
    res.render('index', { title: '主页面1234' });
});
// 所有子路由的调用
Object.entries(indexModel).forEach(childRoute => {
    router[$util.matchMethod(childRoute[0])]('/' + $util.matchChildRouteName(childRoute[0]), function(req, res, next) {
        indexModel[childRoute[0]](req, res, next);
    });
});
module.exports = router;