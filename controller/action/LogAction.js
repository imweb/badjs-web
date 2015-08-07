/**
 * @info : LOG ACION
 * @author : coverguo
 * @date : 2014-12-16
 */

var LogService = require('../../service/LogService'),
    log4js = require('log4js'),
    http = require('http'),
    logger = log4js.getLogger(),
    isError = function (res, error) {
        if (error) {
            res.json({ret: 1, msg: error});
            return true;
        }
        return false;
    };

var LogAction = {
    queryLogList: function (params, req, res) {

        var logService = new LogService();

        params['endDate'] -= 0;
        params['startDate'] -= 0;
        params['id'] -= 0;
        delete params.user;
        logService.query(params, function (err, items) {
            if (isError(res, err)) {
                return;
            }
            ;

            res.json({ret: 0, msg: "success-query", data: items});
        });
    },
    queryLogCountOnly: function(){
        var logService = new LogService();

        params['endDate'] -= 0;
        params['startDate'] -= 0;
        params['id'] -= 0;
        delete params.user;
        logService.queryCount(params, function (err, items) {
            if (isError(res, err)) {
                return;
            }
            ;

            res.json({ret: 0, msg: "success-query", data: items});
        });
    },
    queryLogCount: function (params, req, res) {
        var logService = new LogService(),
            errorObj = {}, resArr = [],
            endDate = params['endDate'] -= 0,
            startDate = params['startDate'] -= 0,
            contentVisable = params['content'] || false;
        params['id'] -= 0;
        params['level'] = ['4'];
        delete params.user;
        var timePeriod = (params['timePeriod'] || 1) * 60000;
        logService.query(params, function (err, items) {
            if (isError(res, err)) {
                return;
            }
            var timeCount = Math.ceil((endDate - startDate) / timePeriod);
            items.forEach(function (ele) {
                var date = Date.parse(ele.date);
                for (var i = 0; i <= timeCount; i++) {
                    var tag = startDate + i * timePeriod;
                    errorObj[tag] = Array.isArray(errorObj[tag]) ? errorObj[tag] : [];
                    if (date > tag && date < startDate + (i + 1) * timePeriod) {
                        errorObj[tag].push(ele);
                    }
                }
            });
            for (var key in errorObj) {
                if (contentVisable) {
                    errorObj[key] = errorObj[key];
                } else {
                    var item = {
                        time: key,
                        errorCount: errorObj[key].length
                    };
                    resArr.push(item);
                }
            }
            ;
            var resData = contentVisable ? errorObj : resArr;
            res.jsonp({ret: 0, msg: 'success-query', data: resData});
        });
    },
    code: function (params, req, res) {
        http.get(params.target, function (response) {
            var buffer = '';
            response.on('data', function (chunk) {
                buffer += chunk.toString();
            }).on('end', function () {
                res.json({ret: 0, msg: "success-query", data: buffer});
            });
        })
    }
};

module.exports = LogAction;

