/**
 * 用来获取罗盘的测速上报信息
 * @author homkerliu
 * @type {PG|exports|module.exports}
 */

var pg = require('pg'),
    log4js = require('log4js'),
    logger = log4js.getLogger(),
    fs = require('fs'),
    configFileService = require('./ConfigFileService'),
    path = require('path');

var connString = GLOBAL.pjconfig.postgreSql.connString,
    filePath = path.resolve(GLOBAL.pjconfig.fileStorage.pageid);

//cache
var postgreSql = new pg.Client(connString),
    Result;

/*pg.connect(connString, function (err, client, done) {
 if (err) {
 logger.warn('client err,the err is ' + err);
 }
 postgreSql = postgreSql||client;
 Done = done;
 });*/

/**
 * 格式化时间为需要的对象格式
 * @param time
 * @returns {string} yyyyMMdd
 */

function formateTime(time) {
    var DateObj = new Date(time),
        year = DateObj.getFullYear(),
        month = DateObj.getMonth() - -1,
        date = DateObj.getDate() - 0;
    return year + (month > 9 ? month : 0 + '' + month) + (date > 9 ? date : 0 + '' + date);
}

/**
 * 得到格式化的时间字符串，默认长度为最近7天
 * @param day
 * @returns {string}
 */
function getformateTime(day) {
    var dayObj = new Date(),
        dayTime = 1000 * 60 * 60 * 24,
        today = Date.parse(dayObj.getFullYear() + '-' + (dayObj.getMonth() - -1) + '-' + (dayObj.getDate() - 1)),
        timeString = '';
    for (var i = day; i--;) {
        timeString += '' + formateTime(today - i * dayTime);
        if (i != 0) {
            timeString += ',';
        }
    }
    return timeString;
}

/**
 * 通过postgresql来查询上报总数（pv）
 * @param day
 * @param callback (function)
 */
function queryPvList(day, callback) {
    var timeString = getformateTime(day);
    var sql = "select ftime,data_cnt,concat(buzid,'-',siteid,'-',pageid)as pageid from( " +
        "select " +
        "ftime, " +
        "- 999998 as develop_center," +
        "page_name, " +
        "owner, " +
        "platform_name, " +
        "network, " +
        "version_name, " +
        "sum(data_cnt) as data_cnt, " +
        "sum(dt_client) as dt_client, " +
        "sum(dt_network) as dt_network, " +
        "sum(dt_page) as dt_page, " +
        "sum(dt_net_page) as dt_net_page," +
        "sum(dt_total) as dt_total, " +
        "sum(dt_webview) as dt_webview," +
        "sum(dt_url) as dt_url, " +
        "sum(dt_domready) as dt_domready, " +
        "sum(dt_activity) as dt_activity, " +
        "iswebcache, " +
        "is_offline, " +
        "ispreloadwebprocess, " +
        "is_key_page, " +
        "sum(pageid) as pageid, " +
        "sum(buzid) as buzid," +
        "sum(siteid) as siteid," +
        "- 600034 as product_id " +
        "from ( " +
        "SELECT " +
        "ftime, " +
        "develop_center, " +
        "buzid, " +
        "siteid, " +
        "pageid," +
        "page_name," +
        "owner," +
        "is_key_page," +
        "platform_name," +
        "network," +
        "version_name," +
        "dt_client," +
        "dt_network," +
        "dt_page," +
        "dt_net_page," +
        "dt_total," +
        "dt_webview," +
        "dt_url," +
        "dt_domready," +
        "dt_activity," +
        "data_cnt," +
        "is_offline," +
        "ispreloadwebprocess," +
        "iswebcache " +
        "FROM (" +
        "SELECT " +
        "ftime," +
        "buzid, " +
        "siteid," +
        "pageid, " +
        "concat(buzid, '_', siteid, '_', pageid) as pagename," +
        "platform_name, " +
        "case when net_type = '-1000000' then '全网络' " +
        "when net_type = '2g' then '2g' " +
        "when net_type = '3g' then '3g' " +
        "when net_type = '4g' then '4g' " +
        "when net_type = 'wifi' then 'wifi' " +
        "else '-911' end as network," +
        "version_name, " +
        "isoffline as is_offline, " +
        "ispreload as ispreloadwebprocess, " +
        "iswebcache as iswebcache, " +
        "(loadurl_sum - clickstart_sum)/ data_cnt as dt_client, " +
        "(head_sum - loadurl_sum)/ data_cnt as dt_network, " +
        "(active_sum - head_sum)/ data_cnt as dt_page, " +
        "(active_sum - loadurl_sum)/ data_cnt as dt_net_page," +
        "(active_sum - clickstart_sum)/ data_cnt as dt_total, " +
        "(webviewstart_sum - clickstart_sum )/ data_cnt as dt_webview, " +
        "(loadurl_sum - webviewstart_sum)/ data_cnt as dt_url, " +
        "(domready_sum - head_sum)/ data_cnt as dt_domready, " +
        "(active_sum - domready_sum)/ data_cnt as dt_activity, " +
        "data_cnt as data_cnt " +
        "FROM " +
        " public.r_zscai_sng_network_speed_time  " +
        "where data_cnt > 100" +
        " and buzid > 0 and siteid > 0 and pageid > 0 )" +
        " t1 LEFT JOIN public.r_haozhengwu_sng_page_info t2 ON t1.pagename = t2.page_key ) ElmData" +
        " where " +
        "ftime in(" + timeString + ") " +
        "and platform_name =- 1000000 " +
        "and network = '全网络' and version_name = '-1000000' " +
        "and iswebcache = '-1000000' " +
        "and is_offline = '-1000000' " +
        "and ispreloadwebprocess = '-1000000' " +
        "and is_key_page = '1' " +
        "group by " +
        "ftime," +
        "page_name," +
        "owner," +
        "platform_name," +
        "network," +
        "version_name," +
        "iswebcache," +
        "is_offline," +
        "ispreloadwebprocess," +
        "is_key_page order by ftime desc nulls last," +
        "dt_total desc nulls last ) " +
        "as tmpElmData ";
    if(Result){
    	callback&&callback(null, Result);
	return;
    };
    postgreSql.connect(function (err) {
        if (err) {
            logger.error('postgresql has connect err ,the err is' + err);
            return;
        }
        postgreSql.query(sql, function (err, result) {
            if (err) {
                logger.warn('query has some err,err is :' + err);
                typeof callback == 'function' && callback(err);
            }
	    postgreSql.end();
            Result = Result||result;
            typeof callback == 'function' && callback(null, Result);
            //postgreSql.end();
        });
    });
}

/**
 * 将appid转换成pageid
 * 这个函数用的是同步
 * @param key {siteid-pageid-buzid}
 */

function turn2ApplyIdFrom(key) {
    logger.debug(filePath);
    var data = querySync(filePath);
    logger.debug(data);
    return data[key];
}

function querySync(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        if (err) {
            logger.error('read file err,err is' + err);
        }
    }
}

/**
 * 将pageid和appid成对的以json的格式存入到指定的文件中去。
 * @param key {siteid-pageid-buzid}
 * @param applyid
 * @param callback
 */
function writePageid(key, applyid, callback) {
    var Data = {};
    Data[key] = applyid;
    configFileService.insert(filePath, Data, function (err) {
        if (err) {
            logger.warn('write file is wrong the err is' + err);
            return;
        }
        callback && callback(err);
    }, 'json');
    /*    fs.readFile(filePath, function (err, data) {
     if (err) {
     logger.warn('file read is wrong ,the err is ' + err);
     return;
     }
     if (data) {
     Data = JSON.parse(data);
     }
     Data[appid] = pageid;
     fs.writeFile(filePath, JSON.stringify(Data), function (err) {
     if (err) {
     logger.warn('write file is wrong the err is' + err);
     }
     typeof callback == 'function' && callback(err);
     });
     });*/
}

/**
 * 查询pv
 * @param callback
 */
function queryPv(callback) {
    queryPvList(7, function (err, result) {
        if (err) {
            logger.error('query sql is err ,the error is' + err);
            typeof callback == 'function' && callback(err);
        }
        var data = result.rows.length != 0 ? result.rows : [],
            result = [];
        data.forEach(function (ele, index) {
            ele.applyid = turn2ApplyIdFrom(ele.pageid);
            result.push(ele);
        });
        logger.debug(result);
        typeof callback == 'function' && callback(null, result);
    })
}
/**
 * 提供对外查询接口
 * @param param
 * @param callback
 */
function httpQuery(param, callback) {
    var day = parseInt(param.day) || 7,
        appid = parseInt(param.appid);
    if (appid) {
        queryPv(function (err, result) {
            callback && callback(err, result);
        });
    } else {
        queryPvList(day, function (err, result) {
            callback && callback(err, result)
        })
    }
}

module.exports = {
    insert: function (appid, pageid) {
        writePageid(appid, pageid);
    },
    query: function (callback) {
        queryPv(callback);
    },
    httpQuery: function (param, callback) {
        httpQuery(param, callback);
    },
    turn2ApplyIdFrom: function (appid) {
        turn2ApplyIdFrom(appid);
    },
    formateTime: function (timeString) {
        formateTime(timeString);
    }
}
