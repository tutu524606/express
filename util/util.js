/**
 * Created by fujunou on 2015/3/6.
 */

module.exports = {
    extend: function(target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key))
                flag ?
                (target[key] = source[key]) :
                (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    jsonWrite: function(res, ret) {
        if (typeof ret === 'undefined') {
            res.json({
                code: '1',
                msg: '操作失败'
            });
        } else {
            res.json(ret);
        }
    },
    // 匹配请求方式
    matchMethod: function(param) {
        return param.match(/_([a-z]+)/i)[1];
    },
    // 匹配请求的子路由
    matchChildRouteName: function(param) {
        return param.match(/([a-z]+)_/i)[1];
    },
    // 处理数据更新sql set语句
    updateSqlHandling: function(request, noset) {
        // 'UPDATE `good` SET `name`=?,`desc`=?,`price`=?,`sum`=? WHERE `id`=?'
        var setOption = '';
        Object.entries(request).forEach(function(val) {
            if (!noset.includes(val[0]))
                setOption += '`' + val[0] + '`=' + '?,';
        });
        return setOption.slice(0, setOption.length - 1);
    },
    // 处理数据更新的数据
    handleRequest: function(request, noset) {
        var cloneRequest = Object.assign(request);
        noset.forEach(function(name) {
            delete cloneRequest[name];
        });
        return Object.values(cloneRequest);
    }
}