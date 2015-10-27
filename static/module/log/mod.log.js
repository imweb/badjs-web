/* global _ */
var Dialog = require("dialog/dialog");
var Chart = require("charts/highcharts");
var Delegator = require("delegator");

var logTable = require("./template/logTable.ejs");
var keyword = require("./template/keyword.ejs");
var debar = require("./template/debar.ejs");

require("jquery/jquery.datetimepicker");

var logConfig = {
        id: 0,
        startDate: 0,
        endDate: 0,
        include: [],
        exclude: [],
        index: 0,
        level: [4]
    },

    encodeHtml = function(str) {
        return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x60/g, '&#96;').replace(/\x27/g, '&#39;').replace(/\x22/g, '&quot;');
    };


var maxDate = 60 * 60 * 1000 * 24 * 2,
    onDate = 60 * 60 * 1000 * 24;

var currentSelectId = -1,
    currentIndex = 0,
    noData = false,
    MAX_LIMIT = 500,
    loading = false;

var currentSelectId = -1, currentIndex = 0, noData = false, MAX_LIMIT = 500, loading = false;

function addKeyword() {
    var value = $.trim($('#keyword-ipt').val());
    if (value !== '') {
        if (!removeValue(value, logConfig.include)) {
            $('#keyword-group').append(keyword({
                it: {
                    value: value
                },
                opt: {
                    encodeHtml: encodeHtml,
                    set: Delegator.set
                }
            }));
        }
        logConfig.include.push(value);
        $('#keyword-ipt').val('');
    }
}

function addDebar() {
    var value = $.trim($('#debar-ipt').val());
    if (value !== '') {
        if (!removeValue(value, logConfig.exclude)) {
            $('#debar-group').append(debar({
                it: {
                    value: value
                },
                opt: {
                    encodeHtml: encodeHtml,
                    set: Delegator.set
                }
            }));
        }
        logConfig.exclude.push(value);
        $('#debar-ipt').val('');
    }
}

function bindEvent() {
    new Delegator(document.body)
        .on('click', 'searchBusiness', function() {
            // search business
        }).on('click', 'addKeyword', addKeyword)
        .on('keyup', 'addKeyword', function(e) {
            if (e.which === 13) addKeyword();
        }).on('click', 'removeKeywords', function() {
            logConfig.include.length = 0;
            $('#keyword-group').empty();
        }).on('click', 'removeKeyword', function(e, value) {
            $(this).closest('.keyword-tag').remove();
            removeValue(value, logConfig.include);
        }).on('click', 'addDebar', addDebar)
        .on('keyup', 'addDebar', function(e) {
            if (e.which === 13) addDebar();
        }).on('click', 'removeDebars', function() {
            logConfig.exclude.length = 0;
            $('#debar-group').empty();
        }).on('click', 'removeDebar', function(e, value) {
            $(this).closest('.keyword-tag').remove();
            removeValue(value, logConfig.exclude);
        }).on('click', 'showLogs', function() {
            var startTime = $('#startTime').val(),
                endTime = $('#endTime').val();
            logConfig.startDate = startTime === '' ?
                new Date().getTime() - maxDate :
                new Date(startTime).getTime();
            logConfig.endDate = endTime === '' ?
                new Date().getTime() :
                new Date(endTime).getTime();
            //测试时间是否符合
            if (isTimeRight(logConfig.startDate, logConfig.endDate)) {
                showLogs(logConfig, false);
            }

        }).on('click', 'showCharts', function () {
            var startTime = $('#startTime').val(),
                endTime = $('#endTime').val();
            //console.log('data', endTime);
            logConfig.startDate = startTime == '' ? new Date().getTime() - maxDate : new Date(startTime).getTime();
            logConfig.endDate = endTime == '' ? new Date().getTime() : new Date(endTime).getTime();
            //console.log('data', logConfig);
            //测试时间是否符合
            if (isTimeRight(logConfig.startDate, logConfig.endDate, true)) {
                showCharts(logConfig);
            }
        }).on('click', 'showSource', function (e, data) {
            // 内网服务器，拉取不到 外网数据,所以屏蔽掉请求
        }).on('change', 'selectBusiness', function() {
            var val = $(this).val() - 0;
            currentSelectId = val;
            $('#log-table').html('');
            currentIndex = 0;
            noData = false;
            logConfig.id = val;
        }).on('click', 'errorTypeClick', function() {
            if ($(this).hasClass('msg-dis')) {
                logConfig.level.push(4);
                $(this).removeClass('msg-dis');
            } else {
                logConfig.level.splice($.inArray(4, logConfig.level), 1);
                $(this).addClass('msg-dis');
            }
        }).on('click', 'logTypeClick', function() {
            if ($(this).hasClass('msg-dis')) {
                logConfig.level.push(2);
                $(this).removeClass('msg-dis');
            } else {
                logConfig.level.splice($.inArray(2, logConfig.level), 1);
                $(this).addClass('msg-dis');
            }
        }).on('click', 'debugTypeClick', function() {
            if ($(this).hasClass('msg-dis')) {
                logConfig.level.push(1);
                $(this).removeClass('msg-dis');
            } else {
                logConfig.level.splice($.inArray(1, logConfig.level), 1);
                $(this).addClass('msg-dis');
            }
        });

    var throttled = _.throttle(function(e) {
        var $this = $(this);
        var top = $this.scrollTop();
        var height = $this.height();
        var scrollHeight = $this.prop('scrollHeight');

        if (scrollHeight - height - top <= 200 && !noData) {
            logConfig.id = currentSelectId;
            showLogs(logConfig, true);
        }
    }, 100);

    $('.main-mid').scroll(throttled);

}

function isTimeRight(begin, end, isChart) {
    if (begin > end) {
        Dialog({
            header: '时间范围错误',
            body: '结束时间必须在开始时间之后！'
        });
        return false;
    } else if (end - maxDate > begin) {
        Dialog({
            header: '时间范围错误',
            body: '结束时间和开始时间间隔需在三天之内！'
        });
        return false;
    } else if (isChart) {
        if (end - onDate > begin) {
            Dialog({
                header: '时间范围错误',
                body: '图表时间范围请控制在一天之内！'
            });
            return false;
        }
    }
    return true;

}

function removeValue(value, arr) {
    for (var l = arr.length; l--;) {
        if (arr[l] === value) {
            return arr.splice(l, 1);
        }
    }
}


function showLogs(opts, isAdd) {
    opts.id = $('#select-business').val() >> 0; // jshint ignore:line
    $('.main-table').show();
    $('#chart-container').remove();
    if (opts.id <= 0 || loading) {
        !loading && Dialog({
            header: '警告',
            body: '请选择一个项目'
        });
        return;
    }

    loading = true;

    if (!isAdd) {
        currentIndex = 0;
        noData = false;
    }

    var url = '/controller/logAction/queryLogList.do';
    $.ajax({
        url: url,
        data: {
            id: opts.id,
            startDate: opts.startDate,
            endDate: opts.endDate,
            include: opts.include,
            exclude: opts.exclude,
            index: currentIndex,
            _t: new Date() - 0,
            level: opts.level
        },
        success: function(data) {
            var ret = data.ret;
            if (ret === 0) {
                var param = {
                    encodeHtml: encodeHtml,
                    set: Delegator.set,
                    startIndex: currentIndex * MAX_LIMIT
                };

                if (isAdd) {
                    $('#log-table').append(logTable({
                        it: data.data,
                        opt: param
                    }));
                } else {
                    $('#log-table').html(logTable({
                        it: data.data,
                        opt: param
                    }));
                }

                currentIndex++;
                if (data.data.length === 0) {
                    noData = true;
                }
            }
            loading = false;
        },
        error: function() {
            loading = false;
        }
    });
}
function ChartHelper() {
    var resultArr = [], timeArr = [], chart,
        getTime = (function () {
            var dateString;
            return function (date, type) {
                var date = new Date(date);
                switch (type) {
                    case 'time' :
                        dateString = date.getHours() + ":" + date.getMinutes();
                        break;
                    case 'date' :
                        dateString = (date.getMonth() - -1) + '-' + date.getDate();
                        break;
                    case 'datetime' :
                        dateString = date.getHours() + ":" + date.getMinutes() + ' ' + (date.getMonth() - -1) + '-' + date.getDate();
                }
                return dateString;
            }
        })(),
        formatArr = function (arr, isTime, isSvg) {
            var countObj = {};
            countObj.name = isSvg ? '五日均值' : getTime(arr[0].time, 'date');
            countObj.data = [];
            for (var l = arr.length; l--;) {
                countObj.data.push(arr[l].count);
                if (isTime) {
                    timeArr.push(getTime(arr[l].time, 'time'));
                }
            }
            countObj.data.reverse();
            return countObj;
        },
        getArray = function (result) {
            var resultArr = [];
            resultArr.push(formatArr(result.data, true, false));
            resultArr.push(formatArr(result.history, false, false));
            timeArr.reverse();
            return resultArr;
        },
        init = function (result) {
            resultArr = getArray(result);
            $('.main-table').hide();
            var box = $('.main-mid');
            if (!$.contains(box[0], $('#chart-container')[0])) {
                box.append('<div id="chart-container"></div>');
            }
            var container = $('#chart-container');
            container.highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: '错误数据统计'
                },
                subtitle: {
                    text: '数据量'
                },
                xAxis: {
                    categories: timeArr
                },
                yAxis: {
                    title: {
                        text: '错误量'
                    }
                },
                tooltip: {
                    enabled: true,
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br>' + this.x + ': ' + this.y;
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    }
                },
                credits: {
                    enabled: false
                },
                series: resultArr
            });
            chart = container.highcharts();
        },
        addData = function (result) {
            console.log(chart);
            chart && chart.addSeries(result, false);
            chart && chart.redraw();
        };
    return {
        init: init,
        addData: addData
    }
}
function showCharts(opts) {
    if (opts.id <= 0 || loading) {
        !loading && Dialog({
            header: '警告',
            body: '请选择一个项目'
        });
        return;
    }

    loading = true;
    console.log(Chart);
    var url = "/errorMessageQueryCount",
        svgUrl = '/errorMessageSvgCount',
        chart = new ChartHelper();
    $.ajax({
        url: url,
        data: {
            id: opts.id,
            startDate: opts.startDate,
            endDate: opts.endDate,
            history: 1
        },
        success: function (data) {
            chart.init(data);
            loading = false;
            $.get(svgUrl, {
                id: opts.id,
                startDate: opts.startDate,
                endDate: opts.endDate,
                withTime: false
            }, function (data) {
                data = {
                    name: '五日均值线',
                    data: data.svg
                };
                chart.addData(data, true);
            });
        },
        error: function () {
            loading = false;
        }

    });
}
function init() {
    bindEvent();
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD HH:mm'
    }).data("DateTimePicker").setMaxDate(new Date());

    $('#startTime').data("DateTimePicker").setDate(new Date(new Date() - maxDate));
    $('#endTime').data("DateTimePicker").setDate(new Date());
}

exports.init = init;