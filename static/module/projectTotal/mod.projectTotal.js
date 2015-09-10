/**
 * @info 图表统计js
 * @author coverguo
 * */


require("jquery/jquery.datetimepicker");
require("charts/highcharts");
require("charts/sand-signika");
//require('w2ui/w2ui-1.4.3.min.js');
//require('w2ui/w2ui-1.4.3.min.css');
var Dialog = require("dialog/dialog");
var statisticsTpl = require("./template/statistics.ejs");


var dayNumber = 0,
    days = [];

var chart_title, chart_projects = [];
var statistics = {
    init: function () {

        this.bindEvent();

    },
    setChart: function (data) {
        /*  $('#chartsContainer').highcharts({                   //图表展示容器，与div的id保持一致
         chart: {
         type: 'line'                         //指定图表的类型，默认是折线图（line）
         },
         title: {
         text: ""  //指定图表标题
         },
         xAxis: {
         categories: setChartX(dayNumber)
         },
         yAxis: {
         title: {
         text: '报错数量'                  //指定y轴的标题
         }
         },
         series: chart_projects
         });*/
    },
    renderTable: function (data) {
        renderTable(data);
        //$('#chart-table').html(statisticsTpl({item: chart_projects}));
    },
    bindEvent: function () {
        var self = this;


        $('#showCharts').bind("click", function (e) {
            var param = {
                projectId: $("#select-chartBusiness").val(),
                timeScope: $("#select-timeScope").val()
            };
            $.getJSON("/controller/statisticsAction/queryByChartForAdmin.do", param, function (data) {
                //chart_projects = [];
                dayNumber = param.timeScope == 1 ? 7 : 30;
                console.log(dayNumber);
                data.groups = getformateTime(dayNumber);
                data.columns = getColumns(data.groups);
                /* if (param.projectId == -1) {
                 var projectLength = $options.length;
                 for (var i = 1; i < projectLength; i++) {
                 var defaultData1 = [];
                 setDefaultTotal(defaultData1, dayNumber);
                 var project = {
                 name: $options.eq(i).text(),
                 projectId: $options.eq(i).val() - 0,
                 date: days,
                 data: defaultData1
                 };
                 chart_projects.push(project);
                 }
                 } else {
                 var defaultData2 = [];
                 setDefaultTotal(defaultData2, dayNumber);
                 var project = {
                 name: $selectedOption.text(),
                 projectId: $("#select-chartBusiness").val() - 0,
                 date: days,
                 data: defaultData2
                 };
                 chart_projects.push(project)
                 };

                 //设置表格title*/
                chart_title = $("#select-chartBusiness").find("option:selected").text() + $("#select-timeScope").find("option:selected").text() + "统计";
                data.data = sortData(data.data);
                //sortChartData(data.data);
                console.log('project', chart_projects);
                //  self.setChart();
                self.renderTable(data);
            });
        });

        $('#showCharts').click();

    }

};
/*

 function setChartX(number) {
 var days = [];
 var nowDay = new Date() - 0;

 for (var i = number; i > 0; i--) {
 var day = nowDay - i * 1000 * 60 * 60 * 24;
 days.push(_.formatDate(new Date(day), 'MM-DD'));
 }
 return days;
 };
 function setDefaultTotal(arr, number) {
 for (var i = number; i > 0; i--) {
 arr.push(0);
 }
 };
 function whichDayIndex(day1) {
 for (var i = 0, len = days.length; i < len; i++) {
 if (day1 == days[i]) {
 return i;
 }
 }
 return false;
 }
 */
//

function sortChartData(data) {

    for (var i = 0, len = data.length; i < len; i++) {
        data[i].startDate = _.formatDate(new Date(data[i].startDate), 'MM-DD');
        for (var j = 0, length = chart_projects.length; j < length; j++) {
            if (data[i].projectId == chart_projects[j].projectId) {
                chart_projects[j]['data'][whichDayIndex(data[i].startDate)] = data[i].total;
            }
        }
    }
    ;
}

function getNameList() {
    var $options = $("#select-chartBusiness option"),
        projectLength = $options.length,
        project = {};
    for (var i = 1; i < projectLength; i++) {
        project[$options.eq(i).val() - 0] = $options.eq(i).text();
    }
    return project;
}


function formateTime(time) {
    var DateObj = new Date(time),
        year = DateObj.getFullYear(),
        month = DateObj.getMonth() - -1,
        date = DateObj.getDate() - 0;
    return year + (month > 9 ? month : 0 + '' + month) + (date > 9 ? date : 0 + '' + date);
}

function getformateTime(day) {
    var dayObj = new Date(),
        dayTime = 1000 * 60 * 60 * 24,
        today = Date.parse(dayObj.getFullYear() + '-' + (dayObj.getMonth() - -1) + '-' + (dayObj.getDate() - 1)),
        groups = [];
    groups.push({caption: ' ', span: 1});
    for (var i = day; i--;) {
        var item = {};
        item.caption = formateTime(today - i * dayTime);
        item.span = 3;
        groups.push(item);
    }
    console.log(groups,'groups');
    return groups;
}

function sortData(data) {
    var result = [], resultObj = {}, nameListObj = getNameList();
    data.forEach(function (item) {
        if (!resultObj.hasOwnProperty(item.projectId)) {
            resultObj[item.projectId] = {};
            resultObj[item.projectId]['recid'] = item.projectId;
        }
        resultObj[item.projectId][formateTime(item.startDate) + '-total'] = item.total;
        resultObj[item.projectId][formateTime(item.startDate) + '-pv'] = item.pv;
        resultObj[item.projectId][formateTime(item.startDate) + '-rate'] = item.rate;
        resultObj[item.projectId]['name'] = nameListObj[item.projectId];

    });
    for (var key in resultObj) {
        result.push(resultObj[key]);
    }
    console.log(result);
    return result;
}

function getColumns(groups) {
    var columns = [];
    columns.push({
        field: 'name',
        caption: '项目名称',
        size: '100px',
        sortable: false,
        attr: 'align=center',
        resizable: true
    });

    groups.slice(1).forEach(function (item) {
        var columnTotal = {caption: 'total', size: '13%', sortable: true, attr: 'align=center', resizable: true},
            columnPv = {caption: 'pv', size: '13%', sortable: true, attr: 'align=center', resizable: true},
            columnRate = {caption: 'total/pv', size: '13%', sortable: true, attr: 'align=center', resizable: true};
        console.log(item);
        columnTotal['field'] = item.caption + '-total';
        columnPv['field'] = item.caption + '-pv';
        columnRate['field'] = item.caption + '-rate';
        columns.push(columnTotal);
        columns.push(columnPv);
        columns.push(columnRate);
    });
    console.log(columns);
    return columns;
}

function renderTable(data) {
    $('#grid').w2grid({
        name: 'grid',
        searches: [
            {field: 'lname', caption: 'Last Name', type: 'text'},
            {field: 'fname', caption: 'First Name', type: 'text'},
            {field: 'email', caption: 'Email', type: 'text'},
        ],
        show: {footer: true},
        columnGroups: data.groups,
        columns: data.columns,
        records: data.data,
        sort: [
            { "field": getformateTime(1)[1]['caption']+'-pv', "direction": "DASC" },
        ]
    });
}


module.exports = statistics;
