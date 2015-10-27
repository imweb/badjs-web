/**
 * @info : 页面申请路由
 * @author : coverguo
 * @date : 2014-12-16
 */

var LogAction = require('./action/LogAction'),
    ApplyAction = require('./action/ApplyAction'),
    UserAction = require("./action/UserAction"),
    IndexAction = require("./action/IndexAction"),
    StatisticsAction = require("./action/StatisticsAction"),
    ApproveAction = require("./action/ApproveAction"),
    realtimeService = require("../service/RealtimeService"),
    UserApplyAction = require("./action/UserApplyAction"),
    compassService = require("../service/compassService"),
    ConfigFileService = require('../service/ConfigFileService');


var log4js = require('log4js'),
    logger = log4js.getLogger(),
    path = require('path');

module.exports = function (app) {


    realtimeService(app);

    //html页面请求
    app.get('/', function (req, res) {
        res.render('index', {});
    });

    app.get('/index.html', function (req, res) {
        res.render('index', {});
    });

    app.get('/user/index.html', function (req, res) {
        IndexAction.index({}, req, res);
    });

    app.use('/login.html', function (req, res) {
        UserAction.login({}, req, res);
    });

    app.use('/register.html', function (req , res){
        UserAction.register({}, req , res);
    } );

    app.get('/user/apply.html', function(req, res){
        var user  = req.session.user;
        if(req.query && req.query.applyId){
            ApplyAction.queryByApplyId({applyId :req.query.applyId } , function (err , apply){
                if (apply.status != 1) {
                    res.render('apply', {layout: false, user: user, index: 'apply', apply: apply});
                } else {
                    res.render('apply', {layout: false, user: user, index: 'apply', apply: {}});
                }
            });
        } else {
            res.render('apply', {layout: false, user: user, index: 'apply', apply: {}});
        }
    });
    app.get('/user/applyList.html', function (req, res) {
        var user = req.session.user;
        res.render('applyList', {layout: false, user: user, index: 'manage', manageTitle: '申请列表'});
    });

    app.get('/user/userManage.html', function (req , res){
        UserAction.index({} , req , res);
    });
    app.use('/user/modifyUser.html', function (req , res){
        UserAction.modify(req.param  , req , res);
    });

    app.get('/user/authUserManage.html', function (req, res) {
        UserAction.authUserManger(req.param, req, res);
    });

    app.get('/user/statistics.html', function (req, res) {
        StatisticsAction.index({tpl: "statistics", statisticsTitle: "日志统计"}, req, res);
    });
    app.get('/user/realtimelog.html', function (req, res) {
        IndexAction.realtime({}, req, res);
    });
    app.get('/user/charts.html', function (req, res) {
        StatisticsAction.index({tpl: "charts", statisticsTitle: "图表统计"}, req, res);
    });
    app.get('/user/projectTotal.html', function (req, res) {
        StatisticsAction.projectTotal({tpl: "projectTotal", statisticsTitle: "项目统计"}, req, res);
    });
    app.get('/user/introduce.html', function (req, res) {
        res.render('introduce', {layout: false, user: req.session.user, index: 'guide', guideTitle: '使用指南'});
    });

    app.get('/user/monitor.html', function (req, res) {
        res.render('monitor', {layout: false, user: req.session.user, index: 'guide', guideTitle: '实时监控'});
    });


    /**
     * 登出
     * */
    app.get('/logout', function (req, res) {
        req.session.user = null;
        var homeUrl = req.protocol + "://" + req.get('host') + '/index.html';
        delete req.session.user;
        res.redirect(homeUrl);
    });

    //错误量的查询接口
    app.get('/errorMessageQuery', function (req, res) {
        var method = req.method.toLowerCase();
        var params = method == "post" ? req.body : req.query;
        LogAction.queryLogCount(params, req, res);
    });
    app.get('/errorMessageQueryCount', function (req, res) {
        logger.info('web query start' + Date.now());
        var method = req.method.toLowerCase();
        var params = method == "post" ? req.body : req.query;
        LogAction.queryLogCountOnly(params, req, res);
    });
    app.get('/errorMessageSvgCount', function (req, res) {
        logger.info('web query start' + Date.now());
        var method = req.method.toLowerCase();
        var params = method == "post" ? req.body : req.query;
        LogAction.querySvgCount(params, req, res);
    });
    //pv测速的对外查询接口
    app.get('/pvList', function (req, res) {
        logger.info('web query start ' + Date.now());
        var method = req.method.toLowerCase();
        var params = method == 'post' ? req.body : req.query;
        compassService.httpQuery(params, function (err, result) {
            if (err) {
                res.jsonp(JSON.stringify(err));
                return;
            }
            res.jsonp(JSON.stringify(result));
        });
    });
    /**
     * 提供给accepter
     * 管理员用户信息查询,告警阀值查询
     * method get only
     */
    app.get('/getUserList', function (req, res) {
        var params = req.query;
        UserAction.queryListByCondition(params, req, res);
    });
    app.get('/getThreshold', function (req, res) {
        var params = req.query,
            filePath = path.resolve(GLOBAL.pjconfig.fileStorage.threshold);
        ConfigFileService.query(filePath, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    });


    // 请求路径为： controller/xxxAction/xxx.do (get || post)
    app.use("/", function (req, res, next) {
        //controller 请求action
        if (!/\/controller/i.test(req.url)) {
            next();
            return;
        }
        var url = req.url;
        var action = url.match(/controller\/(\w*)Action/i)[1];
        var operation = url.match(/\/(\w+)\.do/i)[1];
        logger.debug("the operation is: " + action + " --operation: " + operation);
        //判断是get还是post请求， 获取参数params
        var method = req.method.toLowerCase();
        var params = method == "post" ? req.body : req.query;
        params.user = req.session.user;

        try {
            if (action == "statistics") {
                StatisticsAction[operation](params, req, res);
                return;
            }
        } catch (e) {
            res.send(404, 'Sorry! can not found action.');
        }

        if (!params.user) {
            res.json({ret: -2, msg: "should login"});
            return;
        }

        //根据不同actionName 调用不同action
        try {
            switch (action) {
                case "user":
                    UserAction[operation](params, req, res);
                    break;
                case "apply":
                    ApplyAction[operation](params, req, res);
                    break;
                case "approve":
                    ApproveAction[operation](params, req, res);
                    break;
                case "log" :
                    LogAction[operation](params, req, res);
                    break;
                case "userApply":
                    UserApplyAction[operation](params, req, res);
                    break;
                case "statistics" :
                    StatisticsAction[operation](params, req, res);
                    break;

                default  :
                    next();
            }
        } catch (e) {
            res.send(404, 'Sorry! can not found action.');
        }
        return;
    });


};
