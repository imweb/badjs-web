var pg = require('pg');
var conString = "postgres://tdw_v_zscai:234516038@pub-bi-tdw.oa.com:5432/sng_vas_speedtest_database";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function (err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }
    var sql = "select * from( " +
        "select " +
        "ftime, " +
        "page_name, " +
        "owner, " +
        "platform_name, " +
        "network, " +
        "version_name, " +
        "sum(data_cnt) as data_cnt, " +
        "sum(dt_client) as dt_client, " +
        "sum(dt_network) as dt_network, " +
        "sum(dt_page) as dt_page, " +
        "sum(dt_total) as dt_total, " +
        "sum(dt_webview) as dt_webview, " +
        "sum(dt_url) as dt_url, " +
        "sum(dt_domready) as dt_domready, " +
        "sum(dt_activity) as dt_activity, " +
        "iswebcache, " +
        "is_offline, " +
        "ispreloadwebprocess, " +
        "is_key_page, " +
        "sum(pageid) as pageid, " +
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
        "dt_page dt_total," +
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
        "case when net_type = '-1000000' then 'È«ÍøÂç' " +
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
        "ftime in(20150826, 20150827) " +
        "and platform_name =- 1000000 " +
        "and network = 'È«ÍøÂç' and version_name = '-1000000' " +
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
    client.query(sql, function (err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });
});