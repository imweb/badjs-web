webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var charts = __webpack_require__(10);

	charts.init();

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, _) {/**
	 * @info 图表统计js
	 * @author coverguo
	 * */


	__webpack_require__(18);
	__webpack_require__(21);
	__webpack_require__(22);
	var Dialog = __webpack_require__(20);


	    var dayNumber = 0,
	        days =[];

	    var chart_title, chart_projects=[];
	    var statistics = {
	        init : function (){

	            this.bindEvent();

	        },
	        setChart : function (data) {
	            $('#chartsContainer').highcharts({                   //图表展示容器，与div的id保持一致
	                chart: {
	                    type: 'line'                         //指定图表的类型，默认是折线图（line）
	                },
	                title: {
	                    text:  chart_title  //指定图表标题
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
	            });
	        },
	        bindEvent : function (){
	            var self = this;
	            $('#showCharts').bind("click" , function(e){
	                var param = {
	                    projectId : $("#select-chartBusiness").val(),
	                    timeScope : $("#select-timeScope").val()
	                };
	                $.getJSON("/controller/statisticsAction/queryByChart.do" , param , function (data){
	                    var $options =  $("#select-chartBusiness option");
	                    var $selectedOption = $("#select-chartBusiness").find("option:selected");

	                    chart_projects= [];
	                    dayNumber = param.timeScope==1?7:30;
	                    days = setChartX(dayNumber);
	                    if(param.projectId == -1){
	                        var projectLength =$options.length;
	                        for(var i=1; i<projectLength; i++){
	                            var defaultData1  = [];
	                            setDefaultTotal(defaultData1, dayNumber);
	                            var project ={
	                                name:$options.eq(i).text(),
	                                projectId :$options.eq(i).val()-0,
	                                date:days,
	                                data:defaultData1
	                            };
	                            chart_projects.push(project);
	                        }
	                    }else{
	                        var defaultData2  = [];
	                        setDefaultTotal(defaultData2, dayNumber);
	                        var project ={
	                            name:$selectedOption.text(),
	                            projectId :$("#select-chartBusiness").val()-0,
	                            date:days,
	                            data:defaultData2
	                        };
	                        chart_projects.push(project)
	                    };

	                    //设置表格title
	                    chart_title = $("#select-chartBusiness").find("option:selected").text() + $("#select-timeScope").find("option:selected").text()+"统计";
	                    console.log(data);
	                    sortChartData(data.data);
	                    console.log('project', chart_projects);
	                    self.setChart();
	                });
	            });
	        }

	    };

	    function setChartX(number){
	        var days = [];
	        var nowDay = new Date()-0;

	        for(var i = number;i>0; i--){
	            var day = nowDay - i*1000*60*60*24;
	            days.push(_.formatDate(new Date(day), 'MM-DD'));
	        }
	        return days;
	    };
	    function setDefaultTotal(arr, number){
	        for(var i = number;i>0; i--){
	            arr.push(0);
	        }
	    };
	    function whichDayIndex(day1){
	        for(var i =0,len = days.length; i<len; i++){
	            if(day1 == days[i]){
	                return i;
	            }
	        }
	        return false;
	    }
	    //

	    function sortChartData(data){

	        for(var i = 0, len= data.length;i<len; i++){
	            data[i].startDate = _.formatDate( new Date(data[i].startDate) , 'MM-DD' );
	            for(var j= 0, length=chart_projects.length; j<length; j++){
	                if(data[i].projectId == chart_projects[j].projectId){
	                    chart_projects[j]['data'][whichDayIndex(data[i].startDate)] = data[i].total;
	                }
	            }
	        };
	    }

	module.exports = statistics;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(1)))

/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * @preserve jQuery DateTimePicker plugin v2.4.1
	 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
	 * (c) 2014, Chupurnov Valeriy.
	 */
	/*global document,window,jQuery,setTimeout,clearTimeout*/
	(function ($) {
		'use strict';
		var default_options  = {
			i18n: {
				ar: { // Arabic
					months: [
						"كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
					],
					dayOfWeek: [
						"ن", "ث", "ع", "خ", "ج", "س", "ح"
					]
				},
				ro: { // Romanian
					months: [
						"ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
					],
					dayOfWeek: [
						"l", "ma", "mi", "j", "v", "s", "d"
					]
				},
				id: { // Indonesian
					months: [
						"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
					],
					dayOfWeek: [
						"Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"
					]
				},
				bg: { // Bulgarian
					months: [
						"Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
					],
					dayOfWeek: [
						"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
					]
				},
				fa: { // Persian/Farsi
					months: [
						'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
					],
					dayOfWeek: [
						'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
					]
				},
				ru: { // Russian
					months: [
						'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
					],
					dayOfWeek: [
						"Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
					]
				},
				uk: { // Ukrainian
					months: [
						'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
					],
					dayOfWeek: [
						"Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
					]
				},
				en: { // English
					months: [
						"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
					],
					dayOfWeek: [
						"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
					]
				},
				el: { // Ελληνικά
					months: [
						"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
					],
					dayOfWeek: [
						"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
					]
				},
				de: { // German
					months: [
						'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
					],
					dayOfWeek: [
						"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
					]
				},
				nl: { // Dutch
					months: [
						"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
					],
					dayOfWeek: [
						"zo", "ma", "di", "wo", "do", "vr", "za"
					]
				},
				tr: { // Turkish
					months: [
						"Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
					],
					dayOfWeek: [
						"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
					]
				},
				fr: { //French
					months: [
						"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
					],
					dayOfWeek: [
						"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
					]
				},
				es: { // Spanish
					months: [
						"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
					],
					dayOfWeek: [
						"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
					]
				},
				th: { // Thai
					months: [
						'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
					],
					dayOfWeek: [
						'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
					]
				},
				pl: { // Polish
					months: [
						"styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
					],
					dayOfWeek: [
						"nd", "pn", "wt", "śr", "cz", "pt", "sb"
					]
				},
				pt: { // Portuguese
					months: [
						"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
					],
					dayOfWeek: [
						"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
					]
				},
				ch: { // Simplified Chinese
					months: [
						"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
					],
					dayOfWeek: [
						"日", "一", "二", "三", "四", "五", "六"
					]
				},
				se: { // Swedish
					months: [
						"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September",  "Oktober", "November", "December"
					],
					dayOfWeek: [
						"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
					]
				},
				kr: { // Korean
					months: [
						"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
					],
					dayOfWeek: [
						"일", "월", "화", "수", "목", "금", "토"
					]
				},
				it: { // Italian
					months: [
						"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
					],
					dayOfWeek: [
						"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
					]
				},
				da: { // Dansk
					months: [
						"January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"
					],
					dayOfWeek: [
						"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
					]
				},
				no: { // Norwegian
					months: [
						"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
					],
					dayOfWeek: [
						"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
					]
				},
				ja: { // Japanese
					months: [
						"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
					],
					dayOfWeek: [
						"日", "月", "火", "水", "木", "金", "土"
					]
				},
				vi: { // Vietnamese
					months: [
						"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
					],
					dayOfWeek: [
						"CN", "T2", "T3", "T4", "T5", "T6", "T7"
					]
				},
				sl: { // Slovenščina
					months: [
						"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
					],
					dayOfWeek: [
						"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
					]
				},
				cs: { // Čeština
					months: [
						"Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
					],
					dayOfWeek: [
						"Ne", "Po", "Út", "St", "Čt", "Pá", "So"
					]
				},
				hu: { // Hungarian
					months: [
						"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
					],
					dayOfWeek: [
						"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
					]
				},
				az: { //Azerbaijanian (Azeri)
					months: [
						"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
					],
					dayOfWeek: [
						"B", "Be", "Ça", "Ç", "Ca", "C", "Ş"
					]
				},
				bs: { //Bosanski
					months: [
						"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
					],
					dayOfWeek: [
						"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
					]
				},
				ca: { //Català
					months: [
						"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
					],
					dayOfWeek: [
						"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
					]
				},
				'en-GB': { //English (British)
					months: [
						"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
					],
					dayOfWeek: [
						"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
					]
				},
				et: { //"Eesti"
					months: [
						"Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
					],
					dayOfWeek: [
						"P", "E", "T", "K", "N", "R", "L"
					]
				},
				eu: { //Euskara
					months: [
						"Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
					],
					dayOfWeek: [
						"Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
					]
				},
				fi: { //Finnish (Suomi)
					months: [
						"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
					],
					dayOfWeek: [
						"Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
					]
				},
				gl: { //Galego
					months: [
						"Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
					],
					dayOfWeek: [
						"Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
					]
				},
				hr: { //Hrvatski
					months: [
						"Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
					],
					dayOfWeek: [
						"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
					]
				},
				ko: { //Korean (한국어)
					months: [
						"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
					],
					dayOfWeek: [
						"일", "월", "화", "수", "목", "금", "토"
					]
				},
				lt: { //Lithuanian (lietuvių)
					months: [
						"Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"
					],
					dayOfWeek: [
						"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
					]
				},
				lv: { //Latvian (Latviešu)
					months: [
						"Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
					],
					dayOfWeek: [
						"Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
					]
				},
				mk: { //Macedonian (Македонски)
					months: [
						"јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"
					],
					dayOfWeek: [
						"нед", "пон", "вто", "сре", "чет", "пет", "саб"
					]
				},
				mn: { //Mongolian (Монгол)
					months: [
						"1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
					],
					dayOfWeek: [
						"Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"
					]
				},
				'pt-BR': { //Português(Brasil)
					months: [
						"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
					],
					dayOfWeek: [
						"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
					]
				},
				sk: { //Slovenčina
					months: [
						"Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
					],
					dayOfWeek: [
						"Ne", "Po", "Ut", "St", "Št", "Pi", "So"
					]
				},
				sq: { //Albanian (Shqip)
					months: [
						"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
					],
					dayOfWeek: [
						"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
					]
				},
				'sr-YU': { //Serbian (Srpski)
					months: [
						"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
					],
					dayOfWeek: [
						"Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"
					]
				},
				sr: { //Serbian Cyrillic (Српски)
					months: [
						"јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"
					],
					dayOfWeek: [
						"нед", "пон", "уто", "сре", "чет", "пет", "суб"
					]
				},
				sv: { //Svenska
					months: [
						"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
					],
					dayOfWeek: [
						"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
					]
				},
				'zh-TW': { //Traditional Chinese (繁體中文)
					months: [
						"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
					],
					dayOfWeek: [
						"日", "一", "二", "三", "四", "五", "六"
					]
				},
				zh: { //Simplified Chinese (简体中文)
					months: [
						"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
					],
					dayOfWeek: [
						"日", "一", "二", "三", "四", "五", "六"
					]
				},
				he: { //Hebrew (עברית)
					months: [
						'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
					],
					dayOfWeek: [
						'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
					]
				}
			},
			value: '',
			lang: 'en',

			format:	'Y/m/d H:i',
			formatTime:	'H:i',
			formatDate:	'Y/m/d',

			startDate:	false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
			step: 60,
			monthChangeSpinner: true,

			closeOnDateSelect: false,
			closeOnWithoutClick: true,
			closeOnInputClick: true,

			timepicker: true,
			datepicker: true,
			weeks: false,

			defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
			defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

			minDate: false,
			maxDate: false,
			minTime: false,
			maxTime: false,

			allowTimes: [],
			opened: false,
			initTime: true,
			inline: false,
			theme: '',

			onSelectDate: function () {},
			onSelectTime: function () {},
			onChangeMonth: function () {},
			onChangeYear: function () {},
			onChangeDateTime: function () {},
			onShow: function () {},
			onClose: function () {},
			onGenerate: function () {},

			withoutCopyright: true,
			inverseButton: false,
			hours12: false,
			next:	'xdsoft_next',
			prev : 'xdsoft_prev',
			dayOfWeekStart: 0,
			parentID: 'body',
			timeHeightInTimePicker: 25,
			timepickerScrollbar: true,
			todayButton: true,
			defaultSelect: true,

			scrollMonth: true,
			scrollTime: true,
			scrollInput: true,

			lazyInit: false,
			mask: false,
			validateOnBlur: true,
			allowBlank: true,
			yearStart: 1950,
			yearEnd: 2050,
			style: '',
			id: '',
			fixed: false,
			roundTime: 'round', // ceil, floor
			className: '',
			weekends: [],
			disabledDates : [],
			yearOffset: 0,
			beforeShowDay: null,

			enterLikeTab: true
		};
		// fix for ie8
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (obj, start) {
				var i, j;
				for (i = (start || 0), j = this.length; i < j; i += 1) {
					if (this[i] === obj) { return i; }
				}
				return -1;
			};
		}
		Date.prototype.countDaysInMonth = function () {
			return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
		};
		$.fn.extend ( "xdsoftScroller"   ,  function (percent) {
			return this.each(function () {
				var timeboxparent = $(this),
					pointerEventToXY = function (e) {
						var out = {x: 0, y: 0},
							touch;
						if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
							touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
							out.x = touch.clientX;
							out.y = touch.clientY;
						} else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
							out.x = e.clientX;
							out.y = e.clientY;
						}
						return out;
					},
					move = 0,
					timebox,
					parentHeight,
					height,
					scrollbar,
					scroller,
					maximumOffset = 100,
					start = false,
					startY = 0,
					startTop = 0,
					h1 = 0,
					touchStart = false,
					startTopScroll = 0,
					calcOffset = function () {};
				if (percent === 'hide') {
					timeboxparent.find('.xdsoft_scrollbar').hide();
					return;
				}
				if (!$(this).hasClass('xdsoft_scroller_box')) {
					timebox = timeboxparent.children().eq(0);
					parentHeight = timeboxparent[0].clientHeight;
					height = timebox[0].offsetHeight;
					scrollbar = $('<div class="xdsoft_scrollbar"></div>');
					scroller = $('<div class="xdsoft_scroller"></div>');
					scrollbar.append(scroller);

					timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
					calcOffset = function calcOffset(event) {
						var offset = pointerEventToXY(event).y - startY + startTopScroll;
						if (offset < 0) {
							offset = 0;
						}
						if (offset + scroller[0].offsetHeight > h1) {
							offset = h1 - scroller[0].offsetHeight;
						}
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
					};

					scroller
						.on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
							if (!parentHeight) {
								timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
							}

							startY = pointerEventToXY(event).y;
							startTopScroll = parseInt(scroller.css('margin-top'), 10);
							h1 = scrollbar[0].offsetHeight;

							if (event.type === 'mousedown') {
								if (document) {
									$(document.body).addClass('xdsoft_noselect');
								}
								$([document.body, window]).on('mouseup.xdsoft_scroller', function arguments_callee() {
									$([document.body, window]).off('mouseup.xdsoft_scroller', arguments_callee)
										.off('mousemove.xdsoft_scroller', calcOffset)
										.removeClass('xdsoft_noselect');
								});
								$(document.body).on('mousemove.xdsoft_scroller', calcOffset);
							} else {
								touchStart = true;
								event.stopPropagation();
								event.preventDefault();
							}
						})
						.on('touchmove', function (event) {
							if (touchStart) {
								event.preventDefault();
								calcOffset(event);
							}
						})
						.on('touchend touchcancel', function (event) {
							touchStart =  false;
							startTopScroll = 0;
						});

					timeboxparent
						.on('scroll_element.xdsoft_scroller', function (event, percentage) {
							if (!parentHeight) {
								timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
							}
							percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

							scroller.css('margin-top', maximumOffset * percentage);

							setTimeout(function () {
								timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
							}, 10);
						})
						.on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
							var percent, sh;
							parentHeight = timeboxparent[0].clientHeight;
							height = timebox[0].offsetHeight;
							percent = parentHeight / height;
							sh = percent * scrollbar[0].offsetHeight;
							if (percent > 1) {
								scroller.hide();
							} else {
								scroller.show();
								scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
								maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
								if (noTriggerScroll !== true) {
									timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
								}
							}
						});

					timeboxparent.on('mousewheel', function (event) {
						var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

						top = top - (event.deltaY * 20);
						if (top < 0) {
							top = 0;
						}

						timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
						event.stopPropagation();
						return false;
					});

					timeboxparent.on('touchstart', function (event) {
						start = pointerEventToXY(event);
						startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
					});

					timeboxparent.on('touchmove', function (event) {
						if (start) {
							event.preventDefault();
							var coord = pointerEventToXY(event);
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
						}
					});

					timeboxparent.on('touchend touchcancel', function (event) {
						start = false;
						startTop = 0;
					});
				}
				timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
			});
		});

		$.fn.extend ( "datetimepicker" , function (opt) {
			var KEY0 = 48,
				KEY9 = 57,
				_KEY0 = 96,
				_KEY9 = 105,
				CTRLKEY = 17,
				DEL = 46,
				ENTER = 13,
				ESC = 27,
				BACKSPACE = 8,
				ARROWLEFT = 37,
				ARROWUP = 38,
				ARROWRIGHT = 39,
				ARROWDOWN = 40,
				TAB = 9,
				F5 = 116,
				AKEY = 65,
				CKEY = 67,
				VKEY = 86,
				ZKEY = 90,
				YKEY = 89,
				ctrlDown	=	false,
				options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

				lazyInitTimer = 0,
				createDateTimePicker,
				destroyDateTimePicker,
				_xdsoft_datetime,

				lazyInit = function (input) {
					input
						.on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function initOnActionCallback(event) {
							if (input.is(':disabled') || input.is(':hidden') || !input.is(':visible') || input.data('xdsoft_datetimepicker')) {
								return;
							}
							clearTimeout(lazyInitTimer);
							lazyInitTimer = setTimeout(function () {

								if (!input.data('xdsoft_datetimepicker')) {
									createDateTimePicker(input);
								}
								input
									.off('open.xdsoft focusin.xdsoft mousedown.xdsoft', initOnActionCallback)
									.trigger('open.xdsoft');
							}, 100);
						});
				};

			createDateTimePicker = function (input) {
				var datetimepicker = $('<div ' + (options.id ? 'id="' + options.id + '"' : '') + ' ' + (options.style ? 'style="' + options.style + '"' : '') + ' class="xdsoft_datetimepicker xdsoft_' + options.theme + ' xdsoft_noselect ' + (options.weeks ? ' xdsoft_showweeks' : '') + options.className + '"></div>'),
					xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
					datepicker = $('<div class="xdsoft_datepicker active"></div>'),
					mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
						'<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
						'<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
						'<button type="button" class="xdsoft_next"></button></div>'),
					calendar = $('<div class="xdsoft_calendar"></div>'),
					timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
					timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
					timebox = $('<div class="xdsoft_time_variant"></div>'),
					/*scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
					scroller = $('<div class="xdsoft_scroller"></div>'),*/
					monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
					yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
					triggerAfterOpen = false,
					XDSoft_datetime,
					//scroll_element,
					xchangeTimer,
					timerclick,
					current_time_index,
					setPos,
					timer = 0,
					timer1 = 0;

				mounth_picker
					.find('.xdsoft_month span')
						.after(monthselect);
				mounth_picker
					.find('.xdsoft_year span')
						.after(yearselect);

				mounth_picker
					.find('.xdsoft_month,.xdsoft_year')
						.on('mousedown.xdsoft', function (event) {
						var select = $(this).find('.xdsoft_select').eq(0),
							val = 0,
							top = 0,
							visible = select.is(':visible'),
							items,
							i;

						mounth_picker
							.find('.xdsoft_select')
								.hide();
						if (_xdsoft_datetime.currentTime) {
							val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
						}

						select[visible ? 'hide' : 'show']();
						for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
							if (items.eq(i).data('value') === val) {
								break;
							} else {
								top += items[0].offsetHeight;
							}
						}

						select.xdsoftScroller(top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
						event.stopPropagation();
						return false;
					});

				mounth_picker
					.find('.xdsoft_select')
						.xdsoftScroller()
					.on('mousedown.xdsoft', function (event) {
						event.stopPropagation();
						event.preventDefault();
					})
					.on('mousedown.xdsoft', '.xdsoft_option', function (event) {
						var year = _xdsoft_datetime.currentTime.getFullYear();
						if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
							_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
						}

						$(this).parent().parent().hide();

						datetimepicker.trigger('xchange.xdsoft');
						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
							options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
					});

				datetimepicker.setOptions = function (_options) {
					options = $.extend(true, {}, options, _options);

					if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
						options.allowTimes = $.extend(true, [], _options.allowTimes);
					}

					if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
						options.weekends = $.extend(true, [], _options.weekends);
					}

					if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
	                    options.disabledDates = $.extend(true, [], _options.disabledDates);
	                }

					if ((options.open || options.opened) && (!options.inline)) {
						input.trigger('open.xdsoft');
					}

					if (options.inline) {
						triggerAfterOpen = true;
						datetimepicker.addClass('xdsoft_inline');
						input.after(datetimepicker).hide();
					}

					if (options.inverseButton) {
						options.next = 'xdsoft_prev';
						options.prev = 'xdsoft_next';
					}

					if (options.datepicker) {
						datepicker.addClass('active');
					} else {
						datepicker.removeClass('active');
					}

					if (options.timepicker) {
						timepicker.addClass('active');
					} else {
						timepicker.removeClass('active');
					}

					if (options.value) {
						if (input && input.val) {
							input.val(options.value);
						}
						_xdsoft_datetime.setCurrentTime(options.value);
					}

					if (isNaN(options.dayOfWeekStart)) {
						options.dayOfWeekStart = 0;
					} else {
						options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
					}

					if (!options.timepickerScrollbar) {
						timeboxparent.xdsoftScroller('hide');
					}

					if (options.minDate && /^-(.*)$/.test(options.minDate)) {
						options.minDate = _xdsoft_datetime.strToDateTime(options.minDate).dateFormat(options.formatDate);
					}

					if (options.maxDate &&  /^\+(.*)$/.test(options.maxDate)) {
						options.maxDate = _xdsoft_datetime.strToDateTime(options.maxDate).dateFormat(options.formatDate);
					}

					mounth_picker
						.find('.xdsoft_today_button')
							.css('visibility', !options.todayButton ? 'hidden' : 'visible');

					if (options.mask) {
						var e,
							getCaretPos = function (input) {
								try {
									if (document.selection && document.selection.createRange) {
										var range = document.selection.createRange();
										return range.getBookmark().charCodeAt(2) - 2;
									}
									if (input.setSelectionRange) {
										return input.selectionStart;
									}
								} catch (e) {
									return 0;
								}
							},
							setCaretPos = function (node, pos) {
								node = (typeof node === "string" || node instanceof String) ? document.getElementById(node) : node;
								if (!node) {
									return false;
								}
								if (node.createTextRange) {
									var textRange = node.createTextRange();
									textRange.collapse(true);
									textRange.moveEnd('character', pos);
									textRange.moveStart('character', pos);
									textRange.select();
									return true;
								}
								if (node.setSelectionRange) {
									node.setSelectionRange(pos, pos);
									return true;
								}
								return false;
							},
							isValidValue = function (mask, value) {
								var reg = mask
									.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
									.replace(/_/g, '{digit+}')
									.replace(/([0-9]{1})/g, '{digit$1}')
									.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
									.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
								return (new RegExp(reg)).test(value);
							};
						input.off('keydown.xdsoft');

						if (options.mask === true) {
							options.mask = options.format
								.replace(/Y/g, '9999')
								.replace(/F/g, '9999')
								.replace(/m/g, '19')
								.replace(/d/g, '39')
								.replace(/H/g, '29')
								.replace(/i/g, '59')
								.replace(/s/g, '59');
						}

						if ($.type(options.mask) === 'string') {
							if (!isValidValue(options.mask, input.val())) {
								input.val(options.mask.replace(/[0-9]/g, '_'));
							}

							input.on('keydown.xdsoft', function (event) {
								var val = this.value,
									key = event.which,
									pos,
									digit;

								if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
									pos = getCaretPos(this);
									digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

									if ((key === BACKSPACE || key === DEL) && pos) {
										pos -= 1;
										digit = '_';
									}

									while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
										pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
									}

									val = val.substr(0, pos) + digit + val.substr(pos + 1);
									if ($.trim(val) === '') {
										val = options.mask.replace(/[0-9]/g, '_');
									} else {
										if (pos === options.mask.length) {
											event.preventDefault();
											return false;
										}
									}

									pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
									while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
										pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
									}

									if (isValidValue(options.mask, val)) {
										this.value = val;
										setCaretPos(this, pos);
									} else if ($.trim(val) === '') {
										this.value = options.mask.replace(/[0-9]/g, '_');
									} else {
										input.trigger('error_input.xdsoft');
									}
								} else {
									if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
										return true;
									}
								}

								event.preventDefault();
								return false;
							});
						}
					}
					if (options.validateOnBlur) {
						input
							.off('blur.xdsoft')
							.on('blur.xdsoft', function () {
								if (options.allowBlank && !$.trim($(this).val()).length) {
									$(this).val(null);
									datetimepicker.data('xdsoft_datetime').empty();
								} else if (!Date.parseDate($(this).val(), options.format)) {
									$(this).val((_xdsoft_datetime.now()).dateFormat(options.format));
									datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
								} else {
									datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
								}
								datetimepicker.trigger('changedatetime.xdsoft');
							});
					}
					options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

					datetimepicker
						.trigger('xchange.xdsoft')
						.trigger('afterOpen.xdsoft');
				};

				datetimepicker
					.data('options', options)
					.on('mousedown.xdsoft', function (event) {
						event.stopPropagation();
						event.preventDefault();
						yearselect.hide();
						monthselect.hide();
						return false;
					});

				//scroll_element = timepicker.find('.xdsoft_time_box');
				timeboxparent.append(timebox);
				timeboxparent.xdsoftScroller();

				datetimepicker.on('afterOpen.xdsoft', function () {
					timeboxparent.xdsoftScroller();
				});

				datetimepicker
					.append(datepicker)
					.append(timepicker);

				if (options.withoutCopyright !== true) {
					datetimepicker
						.append(xdsoft_copyright);
				}

				datepicker
					.append(mounth_picker)
					.append(calendar);

				$(options.parentID)
					.append(datetimepicker);

				XDSoft_datetime = function () {
					var _this = this;
					_this.now = function (norecursion) {
						var d = new Date(),
							date,
							time;

						if (!norecursion && options.defaultDate) {
							date = _this.strToDate(options.defaultDate);
							d.setFullYear(date.getFullYear());
							d.setMonth(date.getMonth());
							d.setDate(date.getDate());
						}

						if (options.yearOffset) {
							d.setFullYear(d.getFullYear() + options.yearOffset);
						}

						if (!norecursion && options.defaultTime) {
							time = _this.strtotime(options.defaultTime);
							d.setHours(time.getHours());
							d.setMinutes(time.getMinutes());
						}

						return d;
					};

					_this.isValidDate = function (d) {
						if (Object.prototype.toString.call(d) !== "[object Date]") {
							return false;
						}
						return !isNaN(d.getTime());
					};

					_this.setCurrentTime = function (dTime) {
						_this.currentTime = (typeof dTime === 'string') ? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime : _this.now();
						datetimepicker.trigger('xchange.xdsoft');
					};

					_this.empty = function () {
						_this.currentTime = null;
					};

					_this.getCurrentTime = function (dTime) {
						return _this.currentTime;
					};

					_this.nextMonth = function () {
						var month = _this.currentTime.getMonth() + 1,
							year;
						if (month === 12) {
							_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
							month = 0;
						}

						year = _this.currentTime.getFullYear();

						_this.currentTime.setDate(
							Math.min(
								new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
								_this.currentTime.getDate()
							)
						);
						_this.currentTime.setMonth(month);

						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
							options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						datetimepicker.trigger('xchange.xdsoft');
						return month;
					};

					_this.prevMonth = function () {
						var month = _this.currentTime.getMonth() - 1;
						if (month === -1) {
							_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
							month = 11;
						}
						_this.currentTime.setDate(
							Math.min(
								new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
								_this.currentTime.getDate()
							)
						);
						_this.currentTime.setMonth(month);
						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
						datetimepicker.trigger('xchange.xdsoft');
						return month;
					};

					_this.getWeekOfYear = function (datetime) {
						var onejan = new Date(datetime.getFullYear(), 0, 1);
						return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
					};

					_this.strToDateTime = function (sDateTime) {
						var tmpDate = [], timeOffset, currentTime;

						if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
							return sDateTime;
						}

						tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime);
						if (tmpDate) {
							tmpDate[2] = Date.parseDate(tmpDate[2], options.formatDate);
						}
						if (tmpDate  && tmpDate[2]) {
							timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
							currentTime = new Date((_xdsoft_datetime.now()).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
						} else {
							currentTime = sDateTime ? Date.parseDate(sDateTime, options.format) : _this.now();
						}

						if (!_this.isValidDate(currentTime)) {
							currentTime = _this.now();
						}

						return currentTime;
					};

					_this.strToDate = function (sDate) {
						if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
							return sDate;
						}

						var currentTime = sDate ? Date.parseDate(sDate, options.formatDate) : _this.now(true);
						if (!_this.isValidDate(currentTime)) {
							currentTime = _this.now(true);
						}
						return currentTime;
					};

					_this.strtotime = function (sTime) {
						if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
							return sTime;
						}
						var currentTime = sTime ? Date.parseDate(sTime, options.formatTime) : _this.now(true);
						if (!_this.isValidDate(currentTime)) {
							currentTime = _this.now(true);
						}
						return currentTime;
					};

					_this.str = function () {
						return _this.currentTime.dateFormat(options.format);
					};
					_this.currentTime = this.now();
				};

				_xdsoft_datetime = new XDSoft_datetime();

				mounth_picker
					.find('.xdsoft_today_button')
					.on('mousedown.xdsoft', function () {
						datetimepicker.data('changed', true);
						_xdsoft_datetime.setCurrentTime(0);
						datetimepicker.trigger('afterOpen.xdsoft');
					}).on('dblclick.xdsoft', function () {
						input.val(_xdsoft_datetime.str());
						datetimepicker.trigger('close.xdsoft');
					});
				mounth_picker
					.find('.xdsoft_prev,.xdsoft_next')
					.on('mousedown.xdsoft', function () {
						var $this = $(this),
							timer = 0,
							stop = false;

						(function arguments_callee1(v) {
							var month =  _xdsoft_datetime.currentTime.getMonth();
							if ($this.hasClass(options.next)) {
								_xdsoft_datetime.nextMonth();
							} else if ($this.hasClass(options.prev)) {
								_xdsoft_datetime.prevMonth();
							}
							if (options.monthChangeSpinner) {
								if (!stop) {
									timer = setTimeout(arguments_callee1, v || 100);
								}
							}
						}(500));

						$([document.body, window]).on('mouseup.xdsoft', function arguments_callee2() {
							clearTimeout(timer);
							stop = true;
							$([document.body, window]).off('mouseup.xdsoft', arguments_callee2);
						});
					});

				timepicker
					.find('.xdsoft_prev,.xdsoft_next')
					.on('mousedown.xdsoft', function () {
						var $this = $(this),
							timer = 0,
							stop = false,
							period = 110;
						(function arguments_callee4(v) {
							var pheight = timeboxparent[0].clientHeight,
								height = timebox[0].offsetHeight,
								top = Math.abs(parseInt(timebox.css('marginTop'), 10));
							if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
								timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
							} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
								timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
							}
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
							period = (period > 10) ? 10 : period - 10;
							if (!stop) {
								timer = setTimeout(arguments_callee4, v || period);
							}
						}(500));
						$([document.body, window]).on('mouseup.xdsoft', function arguments_callee5() {
							clearTimeout(timer);
							stop = true;
							$([document.body, window])
								.off('mouseup.xdsoft', arguments_callee5);
						});
					});

				xchangeTimer = 0;
				// base handler - generating a calendar and timepicker
				datetimepicker
					.on('xchange.xdsoft', function (event) {
						clearTimeout(xchangeTimer);
						xchangeTimer = setTimeout(function () {
							var table =	'',
								start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
								i = 0,
								j,
								today = _xdsoft_datetime.now(),
								maxDate = false,
								minDate = false,
								d,
								y,
								m,
								w,
								classes = [],
								customDateSettings,
								newRow = true,
								time = '',
								h = '',
								line_time;

							while (start.getDay() !== options.dayOfWeekStart) {
								start.setDate(start.getDate() - 1);
							}

							table += '<table><thead><tr>';

							if (options.weeks) {
								table += '<th></th>';
							}

							for (j = 0; j < 7; j += 1) {
								table += '<th>' + options.i18n[options.lang].dayOfWeek[(j + options.dayOfWeekStart) % 7] + '</th>';
							}

							table += '</tr></thead>';
							table += '<tbody>';

							if (options.maxDate !== false) {
								maxDate = _xdsoft_datetime.strToDate(options.maxDate);
								maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
							}

							if (options.minDate !== false) {
								minDate = _xdsoft_datetime.strToDate(options.minDate);
								minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
							}

							while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
								classes = [];
								i += 1;

								d = start.getDate();
								y = start.getFullYear();
								m = start.getMonth();
								w = _xdsoft_datetime.getWeekOfYear(start);

								classes.push('xdsoft_date');

								if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
									customDateSettings = options.beforeShowDay.call(datetimepicker, start);
								} else {
									customDateSettings = null;
								}

								if ((maxDate !== false && start > maxDate) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
									classes.push('xdsoft_disabled');
								} else if (options.disabledDates.indexOf(start.dateFormat(options.formatDate)) !== -1) {
									classes.push('xdsoft_disabled');
								}

								if (customDateSettings && customDateSettings[1] !== "") {
									classes.push(customDateSettings[1]);
								}

								if (_xdsoft_datetime.currentTime.getMonth() !== m) {
									classes.push('xdsoft_other_month');
								}

								if ((options.defaultSelect || datetimepicker.data('changed')) && _xdsoft_datetime.currentTime.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
									classes.push('xdsoft_current');
								}

								if (today.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
									classes.push('xdsoft_today');
								}

								if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(start.dateFormat(options.formatDate)) === -1) {
									classes.push('xdsoft_weekend');
								}

								if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
									classes.push(options.beforeShowDay(start));
								}

								if (newRow) {
									table += '<tr>';
									newRow = false;
									if (options.weeks) {
										table += '<th>' + w + '</th>';
									}
								}

								table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '">' +
											'<div>' + d + '</div>' +
										'</td>';

								if (start.getDay() === options.dayOfWeekStartPrev) {
									table += '</tr>';
									newRow = true;
								}

								start.setDate(d + 1);
							}
							table += '</tbody></table>';

							calendar.html(table);

							mounth_picker.find('.xdsoft_label span').eq(0).text(options.i18n[options.lang].months[_xdsoft_datetime.currentTime.getMonth()]);
							mounth_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

							// generate timebox
							time = '';
							h = '';
							m = '';
							line_time = function line_time(h, m) {
								var now = _xdsoft_datetime.now();
								now.setHours(h);
								h = parseInt(now.getHours(), 10);
								now.setMinutes(m);
								m = parseInt(now.getMinutes(), 10);
								var optionDateTime = new Date(_xdsoft_datetime.currentTime)
								optionDateTime.setHours(h);
								optionDateTime.setMinutes(m);
								classes = [];
								if((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
									classes.push('xdsoft_disabled');
								}
								if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && parseInt(_xdsoft_datetime.currentTime.getHours(), 10) === parseInt(h, 10) && (options.step > 59 || Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step === parseInt(m, 10))) {
									if (options.defaultSelect || datetimepicker.data('changed')) {
										classes.push('xdsoft_current');
									} else if (options.initTime) {
										classes.push('xdsoft_init_time');
									}
								}
								if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
									classes.push('xdsoft_today');
								}
								time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + now.dateFormat(options.formatTime) + '</div>';
							};

							if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
								for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
									for (j = 0; j < 60; j += options.step) {
										h = (i < 10 ? '0' : '') + i;
										m = (j < 10 ? '0' : '') + j;
										line_time(h, m);
									}
								}
							} else {
								for (i = 0; i < options.allowTimes.length; i += 1) {
									h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
									m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
									line_time(h, m);
								}
							}

							timebox.html(time);

							opt = '';
							i = 0;

							for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
								opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
							}
							yearselect.children().eq(0)
													.html(opt);

							for (i = 0, opt = ''; i <= 11; i += 1) {
								opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[options.lang].months[i] + '</div>';
							}
							monthselect.children().eq(0).html(opt);
							$(datetimepicker)
								.trigger('generate.xdsoft');
						}, 10);
						event.stopPropagation();
					})
					.on('afterOpen.xdsoft', function () {
						if (options.timepicker) {
							var classType, pheight, height, top;
							if (timebox.find('.xdsoft_current').length) {
								classType = '.xdsoft_current';
							} else if (timebox.find('.xdsoft_init_time').length) {
								classType = '.xdsoft_init_time';
							}
							if (classType) {
								pheight = timeboxparent[0].clientHeight;
								height = timebox[0].offsetHeight;
								top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
								if ((height - pheight) < top) {
									top = height - pheight;
								}
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
							} else {
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
							}
						}
					});

				timerclick = 0;
				calendar
					.on('click.xdsoft', 'td', function (xdevent) {
						xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
						timerclick += 1;
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;

						if (currentTime === undefined || currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
							currentTime = _xdsoft_datetime.currentTime;
						}

						if ($this.hasClass('xdsoft_disabled')) {
							return false;
						}

						currentTime.setDate(1);
						currentTime.setFullYear($this.data('year'));
						currentTime.setMonth($this.data('month'));
						currentTime.setDate($this.data('date'));

						datetimepicker.trigger('select.xdsoft', [currentTime]);

						input.val(_xdsoft_datetime.str());
						if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === 0 && !options.timepicker))) && !options.inline) {
							datetimepicker.trigger('close.xdsoft');
						}

						if (options.onSelectDate &&	$.isFunction(options.onSelectDate)) {
							options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
						}

						datetimepicker.data('changed', true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
						setTimeout(function () {
							timerclick = 0;
						}, 200);
					});

				timebox
					.on('click.xdsoft', 'div', function (xdevent) {
						xdevent.stopPropagation();
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;

						if (currentTime === undefined || currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
							currentTime = _xdsoft_datetime.currentTime;
						}

						if ($this.hasClass('xdsoft_disabled')) {
							return false;
						}
						currentTime.setHours($this.data('hour'));
						currentTime.setMinutes($this.data('minute'));
						datetimepicker.trigger('select.xdsoft', [currentTime]);

						datetimepicker.data('input').val(_xdsoft_datetime.str());
						if (!options.inline) {
							datetimepicker.trigger('close.xdsoft');
						}

						if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
							options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
						}
						datetimepicker.data('changed', true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
					});


				datepicker
					.on('mousewheel.xdsoft', function (event) {
						if (!options.scrollMonth) {
							return true;
						}
						if (event.deltaY < 0) {
							_xdsoft_datetime.nextMonth();
						} else {
							_xdsoft_datetime.prevMonth();
						}
						return false;
					});

				input
					.on('mousewheel.xdsoft', function (event) {
						if (!options.scrollInput) {
							return true;
						}
						if (!options.datepicker && options.timepicker) {
							current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
							if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
								current_time_index += event.deltaY;
							}
							if (timebox.children().eq(current_time_index).length) {
								timebox.children().eq(current_time_index).trigger('mousedown');
							}
							return false;
						}
						if (options.datepicker && !options.timepicker) {
							datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
							if (input.val) {
								input.val(_xdsoft_datetime.str());
							}
							datetimepicker.trigger('changedatetime.xdsoft');
							return false;
						}
					});

				datetimepicker
					.on('changedatetime.xdsoft', function (event) {
						if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
							var $input = datetimepicker.data('input');
							options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
							delete options.value;
							$input.trigger('change');
						}
					})
					.on('generate.xdsoft', function () {
						if (options.onGenerate && $.isFunction(options.onGenerate)) {
							options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
						if (triggerAfterOpen) {
							datetimepicker.trigger('afterOpen.xdsoft');
							triggerAfterOpen = false;
						}
					})
					.on('click.xdsoft', function (xdevent) {
						xdevent.stopPropagation();
					});

				current_time_index = 0;

				setPos = function () {
					var offset = datetimepicker.data('input').offset(), top = offset.top + datetimepicker.data('input')[0].offsetHeight - 1, left = offset.left, position = "absolute";
					if (options.fixed) {
						top -= $(window).scrollTop();
						left -= $(window).scrollLeft();
						position = "fixed";
					} else {
						if (top + datetimepicker[0].offsetHeight > $(window).height() + $(window).scrollTop()) {
							top = offset.top - datetimepicker[0].offsetHeight + 1;
						}
						if (top < 0) {
							top = 0;
						}
						if (left + datetimepicker[0].offsetWidth > $(window).width()) {
							left = $(window).width() - datetimepicker[0].offsetWidth;
						}
					}
					datetimepicker.css({
						left: left,
						top: top,
						position: position
					});
				};
				datetimepicker
					.on('open.xdsoft', function (event) {
						var onShow = true;
						if (options.onShow && $.isFunction(options.onShow)) {
							onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
						}
						if (onShow !== false) {
							datetimepicker.show();
							setPos();
							$(window)
								.off('resize.xdsoft', setPos)
								.on('resize.xdsoft', setPos);

							if (options.closeOnWithoutClick) {
								$([document.body, window]).on('mousedown.xdsoft', function arguments_callee6() {
									datetimepicker.trigger('close.xdsoft');
									$([document.body, window]).off('mousedown.xdsoft', arguments_callee6);
								});
							}
						}
					})
					.on('close.xdsoft', function (event) {
						var onClose = true;
						mounth_picker
							.find('.xdsoft_month,.xdsoft_year')
								.find('.xdsoft_select')
									.hide();
						if (options.onClose && $.isFunction(options.onClose)) {
							onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
						}
						if (onClose !== false && !options.opened && !options.inline) {
							datetimepicker.hide();
						}
						event.stopPropagation();
					})
					.on('toggle.xdsoft', function (event) {
						if (datetimepicker.is(':visible')) {
							datetimepicker.trigger('close.xdsoft');
						} else {
							datetimepicker.trigger('open.xdsoft');
						}
					})
					.data('input', input);

				timer = 0;
				timer1 = 0;

				datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
				datetimepicker.setOptions(options);

				function getCurrentValue() {

					var ct = false, time;

					if (options.startDate) {
						ct = _xdsoft_datetime.strToDate(options.startDate);
					} else {
						ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
						if (ct) {
							ct = _xdsoft_datetime.strToDateTime(ct);
						} else if (options.defaultDate) {
							ct = _xdsoft_datetime.strToDate(options.defaultDate);
							if (options.defaultTime) {
								time = _xdsoft_datetime.strtotime(options.defaultTime);
								ct.setHours(time.getHours());
								ct.setMinutes(time.getMinutes());
							}
						}
					}

					if (ct && _xdsoft_datetime.isValidDate(ct)) {
						datetimepicker.data('changed', true);
					} else {
						ct = '';
					}

					return ct || 0;
				}

				_xdsoft_datetime.setCurrentTime(getCurrentValue());

				input
					.data('xdsoft_datetimepicker', datetimepicker)
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function (event) {
						if (input.is(':disabled') || input.is(':hidden') || !input.is(':visible') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
							return;
						}
						clearTimeout(timer);
						timer = setTimeout(function () {
							if (input.is(':disabled') || input.is(':hidden') || !input.is(':visible')) {
								return;
							}

							triggerAfterOpen = true;
							_xdsoft_datetime.setCurrentTime(getCurrentValue());

							datetimepicker.trigger('open.xdsoft');
						}, 100);
					})
					.on('keydown.xdsoft', function (event) {
						var val = this.value, elementSelector,
							key = event.which;
						if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
							elementSelector = $("input:visible,textarea:visible");
							datetimepicker.trigger('close.xdsoft');
							elementSelector.eq(elementSelector.index(this) + 1).focus();
							return false;
						}
						if ([TAB].indexOf(key) !== -1) {
							datetimepicker.trigger('close.xdsoft');
							return true;
						}
					});
			};
			destroyDateTimePicker = function (input) {
				var datetimepicker = input.data('xdsoft_datetimepicker');
				if (datetimepicker) {
					datetimepicker.data('xdsoft_datetime', null);
					datetimepicker.remove();
					input
						.data('xdsoft_datetimepicker', null)
						.off('.xdsoft');
					$(window).off('resize.xdsoft');
					$([window, document.body]).off('mousedown.xdsoft');
					if (input.unmousewheel) {
						input.unmousewheel();
					}
				}
			};
			$(document)
				.off('keydown.xdsoftctrl keyup.xdsoftctrl')
				.on('keydown.xdsoftctrl', function (e) {
					if (e.keyCode === CTRLKEY) {
						ctrlDown = true;
					}
				})
				.on('keyup.xdsoftctrl', function (e) {
					if (e.keyCode === CTRLKEY) {
						ctrlDown = false;
					}
				});
			return this.each(function () {
				var datetimepicker = $(this).data('xdsoft_datetimepicker');
				if (datetimepicker) {
					if ($.type(opt) === 'string') {
						switch (opt) {
						case 'show':
							$(this).select().focus();
							datetimepicker.trigger('open.xdsoft');
							break;
						case 'hide':
							datetimepicker.trigger('close.xdsoft');
							break;
						case 'toggle':
							datetimepicker.trigger('toggle.xdsoft');
							break;
						case 'destroy':
							destroyDateTimePicker($(this));
							break;
						case 'reset':
							this.value = this.defaultValue;
							if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(Date.parseDate(this.value, options.format))) {
								datetimepicker.data('changed', false);
							}
							datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
							break;
						}
					} else {
						datetimepicker
							.setOptions(opt);
					}
					return 0;
				}
				if ($.type(opt) !== 'string') {
					if (!options.lazyInit || options.open || options.inline) {
						createDateTimePicker($(this));
					} else {
						lazyInit($(this));
					}
				}
			});
		});
		$.fn.extend ( "datetimepicker.defaults" , default_options);
	}(jQuery));
	(function () {

	/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
	 * Licensed under the MIT License (LICENSE.txt).
	 *
	 * Version: 3.1.12
	 *
	 * Requires: jQuery 1.2.2+
	 */
	!function(a){true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

	// Parse and Format Library
	//http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
	/*
	 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
	 *
	 * This program is free software; you can redistribute it and/or modify it
	 * under the terms of the GNU Lesser General Public License as published by the
	 * Free Software Foundation, version 2.1.
	 *
	 * This program is distributed in the hope that it will be useful, but WITHOUT
	 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
	 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
	 * details.
	 */
	Date.parseFunctions={count:0};Date.parseRegexes=[];Date.formatFunctions={count:0};Date.prototype.dateFormat=function(b){if(b=="unixtime"){return parseInt(this.getTime()/1000);}if(Date.formatFunctions[b]==null){Date.createNewFormat(b);}var a=Date.formatFunctions[b];return this[a]();};Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;Date.formatFunctions[format]=funcName;var code="Date.prototype."+funcName+" = function() {return ";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;code+="'"+String.escape(ch)+"' + ";}else{code+=Date.getFormatCode(ch);}}}eval(code.substring(0,code.length-3)+";}");};Date.getFormatCode=function(a){switch(a){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"Date.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"Date.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"Date.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"Date.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(a)+"' + ";}};Date.parseDate=function(a,c){if(c=="unixtime"){return new Date(!isNaN(parseInt(a))?parseInt(a)*1000:0);}if(Date.parseFunctions[c]==null){Date.createParser(c);}var b=Date.parseFunctions[c];return Date[b](a);};Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++;var regexNum=Date.parseRegexes.length;var currentGroup=1;Date.parseFunctions[format]=funcName;var code="Date."+funcName+" = function(input) {\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = -1;\nvar d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {";var regex="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;regex+=String.escape(ch);}else{obj=Date.formatCodeToRegex(ch,currentGroup);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){code+=obj.c;}}}}code+="if (y > 0 && z > 0){\nvar doyDate = new Date(y,0);\ndoyDate.setDate(z);\nm = doyDate.getMonth();\nd = doyDate.getDate();\n}";code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}";Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$");eval(code);};Date.formatCodeToRegex=function(b,a){switch(b){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:1,c:"z = parseInt(results["+a+"], 10);\n",s:"(\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"].substring(0, 3)], 10);\n",s:"("+Date.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+a+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+a+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+a+"], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+a+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+a+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};default:return{g:0,c:null,s:String.escape(b)};}};Date.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3");};Date.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")+String.leftPad(Math.abs(this.getTimezoneOffset())%60,2,"0");};Date.prototype.getDayOfYear=function(){var a=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var b=0;b<this.getMonth();++b){a+=Date.daysInMonth[b];}return a+this.getDate();};Date.prototype.getWeekOfYear=function(){var b=this.getDayOfYear()+(4-this.getDay());var a=new Date(this.getFullYear(),0,1);var c=(7-a.getDay()+4);return String.leftPad(Math.ceil((b-c)/7)+1,2,"0");};Date.prototype.isLeapYear=function(){var a=this.getFullYear();return((a&3)==0&&(a%100||(a%400==0&&a)));};Date.prototype.getFirstDayOfMonth=function(){var a=(this.getDay()-(this.getDate()-1))%7;return(a<0)?(a+7):a;};Date.prototype.getLastDayOfMonth=function(){var a=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return(a<0)?(a+7):a;};Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;return Date.daysInMonth[this.getMonth()];};Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};String.escape=function(a){return a.replace(/('|\\)/g,"\\$1");};String.leftPad=function(d,b,c){var a=new String(d);if(c==null){c=" ";}while(a.length<b){a=c+a;}return a;};Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.y2kYear=50;Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};Date.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * Map
	 * @class
	 */
	function Map() {
	    this.map = {};
	    this.length = 0;
	}
	Map.prototype = {
	    constructor: Map,
	    /**
	     * has
	     * @param {String} key
	     * @returns {Boolean}
	     */
	    has: function (key) {
	        return (key in this.map);
	    },
	    /**
	     * get
	     * @param {String} key
	     * @returns {Any}
	     */
	    get: function (key) {
	        return this.map[key];
	    },
	    /**
	     * set
	     * @param {String} key
	     * @param {Any} value
	     */
	    set: function (key, value) {
	        !this.has(key) && this.length++;
	        return (this.map[key] = value);
	    },
	    /**
	     * count
	     * @returns {Number}
	     */
	    count: function () {
	        return this.length;
	    },
	    /**
	     * remove
	     * @param {String} key
	     */
	    remove: function (key) {
	        if (this.has(key)) {
	            this.map[key] = null;
	            delete this.map[key];
	            this.length--;
	        }
	    }
	};

	var cache = new Map(), set = cache.set, uid = 0;
	cache.set = function (node, value) {
	    if (!value) {
	        value = node;
	        set.call(cache, ++uid + '', value);
	        return uid;
	    } else {
	        typeof node === 'string' &&
	        (node = $(node)[0]);
	        $.data(node, 'event-data', value);
	        return this;
	    }
	};

	function _key(arr) {
	    if (!arr) return {};
	    arr = arr.split(' ');
	    var obj = {};
	    for (var i = 0, l = arr.length; i < l; i++) {
	        obj[arr[i]] = true;
	    }
	    return obj;
	}

	/**
	 * Delegator
	 * @class
	 * @param {Selector} container
	 */
	function Delegator(container) {
	    this.container = $(container);
	    this.listenerMap = new Map();
	}

	/**
	 * getKey
	 * @param {Any} value
	 * @returns {Number}
	 */
	Delegator.set = cache.set;
	/**
	 * cache
	 * @class
	 * @static
	 */
	Delegator.cache = cache;

	Delegator.prototype = {
	    constructor: Delegator,
	    _getListener: function (type) {
	        if (this.listenerMap.has(type)) {
	            return this.listenerMap.get(type);
	        }
	        function listener(e) {
	            var data = $.data(this),
	                routes = data['event-' + type + '-routes'],
	                eventData = data['event-data'], handle, dataKey;

	            // preprocessing
	            if (!routes && (routes = this.getAttribute('data-event-' + type))) {
	                (routes = routes.split(' ')) &&
	                (data['event-' + type + '-routes'] = routes);
	                !eventData &&
	                (dataKey = this.getAttribute('data-event-data')) &&
	                (eventData = cache.get(dataKey)) &&
	                (data['event-data'] = eventData) &&
	                (cache.remove(dataKey));
	                !data['event-stop-propagation'] &&
	                (data['event-stop-propagation'] = _key(this.getAttribute('data-event-stop-propagation')));
	            }

	            if (routes) {
	                for (var i = 0, l = routes.length; i < l; i++) {
	                    handle = listener.handleMap.get(routes[i]);

	                    if (handle) {
	                        handle.call(this, e, eventData);
	                    }
	                    data['event-stop-propagation'][type] &&
	                    e.stopPropagation();
	                }
	            }
	        }

	        listener.handleMap = new Map();
	        this.listenerMap.set(type, listener);
	        this.container.on(type, '[data-event-' + type + ']', listener);
	        return listener;
	    },
	    /**
	     * on
	     * @param {String} type
	     * @param {String} name
	     * @param {Function} handle
	     */
	    on: function (type, name, handle) {
	        var listener = this._getListener(type);
	        listener.handleMap.set(name, handle);
	        return this;
	    },
	    /**
	     * off
	     * @param {String} type
	     * @param {String} name
	     */
	    off: function (type, name) {
	        var listener = this._getListener(type),
	            handleMap = listener.handleMap;
	        handleMap.remove(name);
	        if (!handleMap.count()) {
	            this.container.off(type, '[data-event-' + type + ']', listener);
	            this.listenerMap.remove(type);
	        }
	    }
	};

	module.exports = Delegator;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var Delegator = __webpack_require__(19);
	var modal = __webpack_require__(117);

	    var container;

	    function hide() {
	        container.removeClass('in');
	        container.find('.modal-backdrop').removeClass('in');
	        setTimeout(function () {
	            container.remove();
	            container = undefined;
	        }, 300);
	    }

	    function Dialog (param) {
	        if (container) {
	            container.remove();
	            container = undefined;
	        }
	        container = $(modal({it :param}))
	            .appendTo(document.body)
	            .show();

	        var key,
	            action,
	            delegator,
	            on = param.on || {};

	        delegator = (new Delegator(container))
	            .on('click', 'close', hide);

	        for (key in on) {
	            action = key.split('/');
	            delegator.on(action[0], action[1], on[key]);
	        }

	        setTimeout(function () {
	            container.addClass('in');
	            container.find('.modal-backdrop').addClass('in');
	        }, 0);
	    }

	    Dialog.hide = hide;

	module.exports =  Dialog;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*
	 Highcharts JS v4.0.1 (2014-04-24)

	 (c) 2009-2014 Torstein Honsi

	 License: www.highcharts.com/license
	*/
	(function(){function q(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function w(){var a,b=arguments,c,d={},e=function(a,b){var c,d;typeof a!=="object"&&(a={});for(d in b)b.hasOwnProperty(d)&&(c=b[d],a[d]=c&&typeof c==="object"&&Object.prototype.toString.call(c)!=="[object Array]"&&d!=="renderTo"&&typeof c.nodeType!=="number"?e(a[d]||{},c):b[d]);return a};b[0]===!0&&(d=b[1],b=Array.prototype.slice.call(b,2));c=b.length;for(a=0;a<c;a++)d=e(d,b[a]);return d}function z(a,b){return parseInt(a,b||
	10)}function Fa(a){return typeof a==="string"}function ca(a){return typeof a==="object"}function La(a){return Object.prototype.toString.call(a)==="[object Array]"}function ha(a){return typeof a==="number"}function za(a){return U.log(a)/U.LN10}function ia(a){return U.pow(10,a)}function ja(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function r(a){return a!==t&&a!==null}function H(a,b,c){var d,e;if(Fa(b))r(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(r(b)&&
	ca(b))for(d in b)a.setAttribute(d,b[d]);return e}function qa(a){return La(a)?a:[a]}function m(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],typeof c!=="undefined"&&c!==null)return c}function G(a,b){if(Aa&&!aa&&b&&b.opacity!==t)b.filter="alpha(opacity="+b.opacity*100+")";q(a.style,b)}function Y(a,b,c,d,e){a=y.createElement(a);b&&q(a,b);e&&G(a,{padding:0,border:Q,margin:0});c&&G(a,c);d&&d.appendChild(a);return a}function ka(a,b){var c=function(){};c.prototype=new a;q(c.prototype,b);return c}
	function Ga(a,b,c,d){var e=E.lang,a=+a||0,f=b===-1?(a.toString().split(".")[1]||"").length:isNaN(b=M(b))?2:b,b=c===void 0?e.decimalPoint:c,d=d===void 0?e.thousandsSep:d,e=a<0?"-":"",c=String(z(a=M(a).toFixed(f))),g=c.length>3?c.length%3:0;return e+(g?c.substr(0,g)+d:"")+c.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+M(a-c).toFixed(f).slice(2):"")}function Ha(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function Ma(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);
	a.unshift(d);return c.apply(this,a)}}function Ia(a,b){for(var c="{",d=!1,e,f,g,h,i,j=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=e[g[h]];if(f.length)f=f.join(":"),g=/\.([0-9])/,h=E.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e!==null&&(e=Ga(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:""))):e=cb(f,e)}j.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}j.push(a);return j.join("")}function mb(a){return U.pow(10,T(U.log(a)/
	U.LN10))}function nb(a,b,c,d){var e,c=m(c,1);e=a/c;b||(b=[1,2,2.5,5,10],d&&d.allowDecimals===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(a=b[d],e<=(b[d]+(b[d+1]||b[d]))/2)break;a*=c;return a}function Bb(){this.symbol=this.color=0}function ob(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].ss_i=e;a.sort(function(a,c){d=b(a,c);return d===0?a.ss_i-c.ss_i:d});for(e=0;e<c;e++)delete a[e].ss_i}function Na(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function Ba(a){for(var b=
	a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function Oa(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Pa(a){db||(db=Y(Ja));a&&db.appendChild(a);db.innerHTML=""}function ra(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw c;else I.console&&console.log(c)}function da(a){return parseFloat(a.toPrecision(14))}function Qa(a,b){va=m(a,b.animation)}function Cb(){var a=E.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";Ra=(a&&E.global.timezoneOffset||
	0)*6E4;eb=a?Date.UTC:function(a,b,c,g,h,i){return(new Date(a,b,m(c,1),m(g,0),m(h,0),m(i,0))).getTime()};pb=b+"Minutes";qb=b+"Hours";rb=b+"Day";Xa=b+"Date";fb=b+"Month";gb=b+"FullYear";Db=c+"Minutes";Eb=c+"Hours";sb=c+"Date";Fb=c+"Month";Gb=c+"FullYear"}function P(){}function Sa(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function la(){this.init.apply(this,arguments)}function Ya(){this.init.apply(this,arguments)}function Hb(a,b,c,d,e){var f=a.chart.inverted;
	this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=e;this.alignOptions={align:b.align||(f?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(f?"middle":c?"bottom":"top"),y:m(b.y,f?4:c?14:-6),x:m(b.x,f?c?-6:6:0)};this.textAlign=b.textAlign||(f?c?"right":"left":"center")}var t,y=document,I=window,U=Math,u=U.round,T=U.floor,Ka=U.ceil,v=U.max,C=U.min,M=U.abs,Z=U.cos,ea=U.sin,ma=U.PI,Ca=ma*2/360,wa=navigator.userAgent,Ib=I.opera,Aa=/msie/i.test(wa)&&
	!Ib,hb=y.documentMode===8,ib=/AppleWebKit/.test(wa),Ta=/Firefox/.test(wa),Jb=/(Mobile|Android|Windows Phone)/.test(wa),xa="http://www.w3.org/2000/svg",aa=!!y.createElementNS&&!!y.createElementNS(xa,"svg").createSVGRect,Nb=Ta&&parseInt(wa.split("Firefox/")[1],10)<4,fa=!aa&&!Aa&&!!y.createElement("canvas").getContext,Za,$a,Kb={},tb=0,db,E,cb,va,ub,A,sa=function(){},V=[],ab=0,Ja="div",Q="none",Ob=/^[0-9]+$/,Pb="stroke-width",eb,Ra,pb,qb,rb,Xa,fb,gb,Db,Eb,sb,Fb,Gb,F={},R=I.Highcharts=I.Highcharts?ra(16,
	!0):{};cb=function(a,b,c){if(!r(b)||isNaN(b))return"Invalid date";var a=m(a,"%Y-%m-%d %H:%M:%S"),d=new Date(b-Ra),e,f=d[qb](),g=d[rb](),h=d[Xa](),i=d[fb](),j=d[gb](),k=E.lang,l=k.weekdays,d=q({a:l[g].substr(0,3),A:l[g],d:Ha(h),e:h,b:k.shortMonths[i],B:k.months[i],m:Ha(i+1),y:j.toString().substr(2,2),Y:j,H:Ha(f),I:Ha(f%12||12),l:f%12||12,M:Ha(d[pb]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:Ha(d.getSeconds()),L:Ha(u(b%1E3),3)},R.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]===
	"function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a};Bb.prototype={wrapColor:function(a){if(this.color>=a)this.color=0},wrapSymbol:function(a){if(this.symbol>=a)this.symbol=0}};A=function(){for(var a=0,b=arguments,c=b.length,d={};a<c;a++)d[b[a++]]=b[a];return d}("millisecond",1,"second",1E3,"minute",6E4,"hour",36E5,"day",864E5,"week",6048E5,"month",26784E5,"year",31556952E3);ub={init:function(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),
	h,i,j=function(a){for(g=a.length;g--;)a[g]==="M"&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&(j(b),j(c));a.isArea&&(h=b.splice(b.length-6,6),i=c.splice(c.length-6,6));if(d<=c.length/f&&b.length===c.length)for(;d--;)c=[].concat(c).splice(0,f).concat(c);a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-f,f),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),b=b.concat(d);h&&(b=b.concat(h),c=c.concat(i));return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(c===1)e=d;else if(f===
	b.length&&c<1)for(;f--;)d=parseFloat(a[f]),e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d;else e=b;return e}};(function(a){I.HighchartsAdapter=I.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,e,f=a.Tween,g=f&&f.propHooks;e=a.cssHooks.opacity;a.extend(a.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});a.each(["cur","_default","width","height","opacity"],function(a,b){var e=d,k;b==="cur"?e=c.prototype:b==="_default"&&f&&(e=g[b],b="set");(k=e[b])&&(e[b]=function(c){var d,c=
	a?c:this;if(c.prop!=="align")return d=c.elem,d.attr?d.attr(c.prop,b==="cur"?t:c.now):k.apply(this,arguments)})});Ma(e,"get",function(a,b,c){return b.attr?b.opacity||0:a.call(this,b,c)});e=function(a){var c=a.elem,d;if(!a.started)d=b.init(c,c.d,c.toD),a.start=d[0],a.end=d[1],a.started=!0;c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};f?g.d={set:e}:d.d=e;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],
	a[c],c,a)===!1)return c};a.fn.highcharts=function(){var a="Chart",b=arguments,c,d;if(this[0]){Fa(b[0])&&(a=b[0],b=Array.prototype.slice.call(b,1));c=b[0];if(c!==t)c.chart=c.chart||{},c.chart.renderTo=this[0],new R[a](c,b[1]),d=this;c===t&&(d=V[H(this[0],"data-highcharts-chart")])}return d}},getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)d[e]=c.call(a[e],a[e],e,a);return d},offset:function(b){return a(b).offset()},
	addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var e=y.removeEventListener?"removeEventListener":"detachEvent";y[e]&&b&&!b[e]&&(b[e]=function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,e){var f=a.Event(c),g="detached"+c,h;!Aa&&d&&(delete d.layerX,delete d.layerY,delete d.returnValue);q(f,d);b[c]&&(b[g]=b[c],b[c]=null);a.each(["preventDefault","stopPropagation"],function(a,b){var c=f[b];f[b]=function(){try{c.call(f)}catch(a){b==="preventDefault"&&(h=!0)}}});a(b).trigger(f);
	b[g]&&(b[c]=b[g],b[g]=null);e&&!f.isDefaultPrevented()&&!h&&e(f)},washMouseEvent:function(a){var c=a.originalEvent||a;if(c.pageX===t)c.pageX=a.pageX,c.pageY=a.pageY;return c},animate:function(b,c,d){var e=a(b);if(!b.style)b.style={};if(c.d)b.toD=c.d,c.d=1;e.stop();c.opacity!==t&&b.attr&&(c.opacity+="px");e.animate(c,d)},stop:function(b){a(b).stop()}}})(__webpack_provided_window_dot_jQuery);var S=I.HighchartsAdapter,N=S||{};S&&S.init.call(S,ub);var jb=N.adapterRun,Qb=N.getScript,Da=N.inArray,p=N.each,vb=N.grep,Rb=N.offset,Ua=
	N.map,K=N.addEvent,W=N.removeEvent,D=N.fireEvent,Sb=N.washMouseEvent,kb=N.animate,bb=N.stop,N={enabled:!0,x:0,y:15,style:{color:"#606060",cursor:"default",fontSize:"11px"}};E={colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
	weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,canvasToolsURL:"http://code.highcharts.com/4.0.1/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/4.0.1/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,
	10],backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"}},subtitle:{text:"",align:"center",style:{color:"#555555"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0},select:{fillColor:"#FFFFFF",lineColor:"#000000",
	lineWidth:2}}},point:{events:{}},dataLabels:w(N,{align:"center",enabled:!1,formatter:function(){return this.y===null?"":Ga(this.y,-1)},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,states:{hover:{marker:{},halo:{size:10,opacity:0.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#909090",borderRadius:0,navigation:{activeColor:"#274b6d",
	inactiveColor:"#CCC"},shadow:!1,itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"1em"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:aa,backgroundColor:"rgba(249, 249, 249, .85)",
	borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b><br/>',shadow:!0,snap:Jb?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",
	whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var ba=E.plotOptions,S=ba.line;Cb();var Tb=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,Ub=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,Vb=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,ya=function(a){var b=[],c,
	d;(function(a){a&&a.stops?d=Ua(a.stops,function(a){return ya(a[1])}):(c=Tb.exec(a))?b=[z(c[1]),z(c[2]),z(c[3]),parseFloat(c[4],10)]:(c=Ub.exec(a))?b=[z(c[1],16),z(c[2],16),z(c[3],16),1]:(c=Vb.exec(a))&&(b=[z(c[1]),z(c[2]),z(c[3]),1])})(a);return{get:function(c){var f;d?(f=w(a),f.stops=[].concat(f.stops),p(d,function(a,b){f.stops[b]=[f.stops[b][0],a.get(c)]})):f=b&&!isNaN(b[0])?c==="rgb"?"rgb("+b[0]+","+b[1]+","+b[2]+")":c==="a"?b[3]:"rgba("+b.join(",")+")":a;return f},brighten:function(a){if(d)p(d,
	function(b){b.brighten(a)});else if(ha(a)&&a!==0){var c;for(c=0;c<3;c++)b[c]+=z(a*255),b[c]<0&&(b[c]=0),b[c]>255&&(b[c]=255)}return this},rgba:b,setOpacity:function(a){b[3]=a;return this}}};P.prototype={init:function(a,b){this.element=b==="span"?Y(b):y.createElementNS(xa,b);this.renderer=a},opacity:1,animate:function(a,b,c){b=m(b,va,!0);bb(this);if(b){b=w(b,{});if(c)b.complete=c;kb(this,a,b)}else this.attr(a),c&&c()},colorGradient:function(a,b,c){var d=this.renderer,e,f,g,h,i,j,k,l,o,n,s=[];a.linearGradient?
	f="linearGradient":a.radialGradient&&(f="radialGradient");if(f){g=a[f];h=d.gradients;j=a.stops;o=c.radialReference;La(g)&&(a[f]=g={x1:g[0],y1:g[1],x2:g[2],y2:g[3],gradientUnits:"userSpaceOnUse"});f==="radialGradient"&&o&&!r(g.gradientUnits)&&(g=w(g,{cx:o[0]-o[2]/2+g.cx*o[2],cy:o[1]-o[2]/2+g.cy*o[2],r:g.r*o[2],gradientUnits:"userSpaceOnUse"}));for(n in g)n!=="id"&&s.push(n,g[n]);for(n in j)s.push(j[n]);s=s.join(",");h[s]?a=h[s].attr("id"):(g.id=a="highcharts-"+tb++,h[s]=i=d.createElement(f).attr(g).add(d.defs),
	i.stops=[],p(j,function(a){a[1].indexOf("rgba")===0?(e=ya(a[1]),k=e.get("rgb"),l=e.get("a")):(k=a[1],l=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":k,"stop-opacity":l}).add(i);i.stops.push(a)}));c.setAttribute(b,"url("+d.url+"#"+a+")")}},attr:function(a,b){var c,d,e=this.element,f,g=this,h;typeof a==="string"&&b!==t&&(c=a,a={},a[c]=b);if(typeof a==="string")g=(this[a+"Getter"]||this._defaultGetter).call(this,a,e);else{for(c in a){d=a[c];h=!1;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&
	(f||(this.symbolAttr(a),f=!0),h=!0);if(this.rotation&&(c==="x"||c==="y"))this.doTransform=!0;h||(this[c+"Setter"]||this._defaultSetter).call(this,d,c,e);this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c)&&this.updateShadows(c,d)}if(this.doTransform)this.updateTransform(),this.doTransform=!1}return g},updateShadows:function(a,b){for(var c=this.shadows,d=c.length;d--;)c[d].setAttribute(a,a==="height"?v(b-(c[d].cutHeight||0),0):a==="d"?this.d:b)},addClass:function(a){var b=this.element,
	c=H(b,"class")||"";c.indexOf(a)===-1&&H(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;p("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=m(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":Q)},crisp:function(a){var b,c={},d,e=a.strokeWidth||this.strokeWidth||this.attr&&this.attr("stroke-width")||0;d=u(e)%2/2;a.x=T(a.x||this.x||
	0)+d;a.y=T(a.y||this.y||0)+d;a.width=T((a.width||this.width||0)-2*d);a.height=T((a.height||this.height||0)-2*d);a.strokeWidth=e;for(b in a)this[b]!==a[b]&&(this[b]=c[b]=a[b]);return c},css:function(a){var b=this.styles,c={},d=this.element,e,f,g="";e=!b;if(a&&a.color)a.fill=a.color;if(b)for(f in a)a[f]!==b[f]&&(c[f]=a[f],e=!0);if(e){e=this.textWidth=a&&a.width&&d.nodeName.toLowerCase()==="text"&&z(a.width);b&&(a=q(b,c));this.styles=a;e&&(fa||!aa&&this.renderer.forExport)&&delete a.width;if(Aa&&!aa)G(this.element,
	a);else{b=function(a,b){return"-"+b.toLowerCase()};for(f in a)g+=f.replace(/([A-Z])/g,b)+":"+a[f]+";";H(d,"style",g)}e&&this.added&&this.renderer.buildText(this)}return this},on:function(a,b){var c=this,d=c.element;$a&&a==="click"?(d.ontouchstart=function(a){c.touchEventFired=Date.now();a.preventDefault();b.call(d,a)},d.onclick=function(a){(wa.indexOf("Android")===-1||Date.now()-(c.touchEventFired||0)>1100)&&b.call(d,a)}):d["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=
	a;return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation,g=this.element;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(g.getAttribute("x")||0)+" "+(g.getAttribute("y")||0)+")");
	(r(c)||r(d))&&a.push("scale("+m(c,1)+" "+m(d,1)+")");a.length&&g.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||Fa(c))this.alignTo=d=c||"renderer",ja(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=m(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||
	0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=u(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=u(g);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d,e=this.rotation;c=this.element;var f=this.styles,g=e*Ca;d=this.textStr;var h;if(d===""||Ob.test(d))h="num."+d.toString().length+
	(f?"|"+f.fontSize+"|"+f.fontFamily:"");h&&(a=b.cache[h]);if(!a){if(c.namespaceURI===xa||b.forExport){try{a=c.getBBox?q({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(i){}if(!a||a.width<0)a={width:0,height:0}}else a=this.htmlGetBBox();if(b.isSVG){c=a.width;d=a.height;if(Aa&&f&&f.fontSize==="11px"&&d.toPrecision(3)==="16.9")a.height=d=14;if(e)a.width=M(d*ea(g))+M(c*Z(g)),a.height=M(d*Z(g))+M(c*ea(g))}this.bBox=a;h&&(b.cache[h]=a)}return a},show:function(a){return a&&this.element.namespaceURI===
	xa?(this.element.removeAttribute("visibility"),this):this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.hide()}})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=this.element,f=this.zIndex,g,h;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);if(f)c.handleZ=!0,f=z(f);if(c.handleZ){a=d.childNodes;
	for(g=0;g<a.length;g++)if(b=a[g],c=H(b,"zIndex"),b!==e&&(z(c)>f||!r(f)&&r(c))){d.insertBefore(e,b);h=!0;break}}h||d.appendChild(e);this.added=!0;if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&a.parentGroup,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;bb(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=
	0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&p(c,function(b){a.safeRemoveChild(b)});d&&d.div.childNodes.length===0;)b=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,d=b;a.alignTo&&ja(a.renderer.alignedObjects,a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=m(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?"(-1,-1)":"("+m(a.offsetX,1)+", "+m(a.offsetY,1)+")";for(e=1;e<=i;e++){f=
	g.cloneNode(0);h=i*2+1-2*e;H(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":j*e,"stroke-width":h,transform:"translate"+k,fill:Q});if(c)H(f,"height",v(H(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=d}return this},xGetter:function(a){this.element.nodeName==="circle"&&(a={x:"cx",y:"cy"}[a]||a);return this._defaultGetter(a)},_defaultGetter:function(a){a=m(this[a],this.element?this.element.getAttribute(a):null,0);/^[0-9\.]+$/.test(a)&&
	(a=parseFloat(a));return a},dSetter:function(a,b,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(b,a);this[b]=a},dashstyleSetter:function(a){var b;if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=z(a[b])*this.element.getAttribute("stroke-width");
	a=a.join(",");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,b,c){this[b]=a;c.setAttribute(b,a)},"stroke-widthSetter":function(a,b,c){a===0&&(a=1.0E-5);this.strokeWidth=a;c.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=y.createElementNS(xa,"title"),this.element.appendChild(b));b.textContent=a},textSetter:function(a){if(a!==
	this.textStr)delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this)},fillSetter:function(a,b,c){typeof a==="string"?c.setAttribute(b,a):a&&this.colorGradient(a,b,c)},zIndexSetter:function(a,b,c){c.setAttribute(b,a);this[b]=a},_defaultSetter:function(a,b,c){c.setAttribute(b,a)}};P.prototype.yGetter=P.prototype.xGetter;P.prototype.translateXSetter=P.prototype.translateYSetter=P.prototype.rotationSetter=P.prototype.verticalAlignSetter=P.prototype.scaleXSetter=P.prototype.scaleYSetter=
	function(a,b){this[b]=a;this.doTransform=!0};P.prototype.strokeSetter=P.prototype.fillSetter;var ta=function(){this.init.apply(this,arguments)};ta.prototype={Element:P,init:function(a,b,c,d,e){var f=location,g,d=this.createElement("svg").attr({version:"1.1"}).css(this.getStyle(d));g=d.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&H(g,"xmlns",xa);this.isSVG=!0;this.box=g;this.boxWrapper=d;this.alignedObjects=[];this.url=(Ta||ib)&&y.getElementsByTagName("base").length?f.href.replace(/#.*?$/,
	"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 4.0.1"));this.defs=this.createElement("defs").add();this.forExport=e;this.gradients={};this.cache={};this.setSize(b,c,!1);var h;if(Ta&&a.getBoundingClientRect)this.subPixelFix=b=function(){G(a,{left:0,top:0});h=a.getBoundingClientRect();G(a,{left:Ka(h.left)-h.left+"px",top:Ka(h.top)-h.top+"px"})},b(),K(I,"resize",b)},getStyle:function(a){return this.style=
	q({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Oa(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&W(I,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},
	buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=m(a.textStr,"").toString(),f=e.indexOf("<")!==-1,g=b.childNodes,h,i,j=H(b,"x"),k=a.styles,l=a.textWidth,o=k&&k.lineHeight,n=g.length,s=function(a){return o?z(o):c.fontMetrics(/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:k&&k.fontSize||c.style.fontSize||12).h};n--;)b.removeChild(g[n]);!f&&e.indexOf(" ")===-1?b.appendChild(y.createTextNode(e)):(h=/<.*style="([^"]+)".*>/,i=/<.*href="(http[^"]+)".*>/,l&&!a.added&&this.box.appendChild(b),
	e=f?e.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[e],e[e.length-1]===""&&e.pop(),p(e,function(e,f){var g,n=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");g=e.split("|||");p(g,function(e){if(e!==""||g.length===1){var o={},m=y.createElementNS(xa,"tspan"),p;h.test(e)&&(p=e.match(h)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),
	H(m,"style",p));i.test(e)&&!d&&(H(m,"onclick",'location.href="'+e.match(i)[1]+'"'),G(m,{cursor:"pointer"}));e=(e.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(e!==" "){m.appendChild(y.createTextNode(e));if(n)o.dx=0;else if(f&&j!==null)o.x=j;H(m,o);!n&&f&&(!aa&&d&&G(m,{display:"block"}),H(m,"dy",s(m),ib&&m.offsetHeight));b.appendChild(m);n++;if(l)for(var e=e.replace(/([^\^])-/g,"$1- ").split(" "),o=e.length>1&&k.whiteSpace!=="nowrap",$,r,B=a._clipHeight,q=[],v=s(),t=
	1;o&&(e.length||q.length);)delete a.bBox,$=a.getBBox(),r=$.width,!aa&&c.forExport&&(r=c.measureSpanWidth(m.firstChild.data,a.styles)),$=r>l,!$||e.length===1?(e=q,q=[],e.length&&(t++,B&&t*v>B?(e=["..."],a.attr("title",a.textStr)):(m=y.createElementNS(xa,"tspan"),H(m,{dy:v,x:j}),p&&H(m,"style",p),b.appendChild(m),r>l&&(l=r)))):(m.removeChild(m.firstChild),q.unshift(e.pop())),e.length&&m.appendChild(y.createTextNode(e.join(" ").replace(/- /g,"-")))}}})}))},button:function(a,b,c,d,e,f,g,h,i){var j=this.label(a,
	b,c,i,null,null,null,null,"button"),k=0,l,o,n,s,m,p,a={x1:0,y1:0,x2:0,y2:1},e=w({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);n=e.style;delete e.style;f=w(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);s=f.style;delete f.style;g=w(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);m=g.style;delete g.style;h=w(e,{style:{color:"#CCC"}},h);p=h.style;delete h.style;
	K(j.element,Aa?"mouseover":"mouseenter",function(){k!==3&&j.attr(f).css(s)});K(j.element,Aa?"mouseout":"mouseleave",function(){k!==3&&(l=[e,f,g][k],o=[n,s,m][k],j.attr(l).css(o))});j.setState=function(a){(j.state=k=a)?a===2?j.attr(g).css(m):a===3&&j.attr(h).css(p):j.attr(e).css(n)};return j.on("click",function(){k!==3&&d.call(j)}).attr(e).css(q({cursor:"default"},n))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=u(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=u(a[2])+b%2/2);return a},path:function(a){var b=
	{fill:Q};La(a)?b.d=a:ca(a)&&q(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=ca(a)?a:{x:a,y:b,r:c};b=this.createElement("circle");b.xSetter=function(a){this.element.setAttribute("cx",a)};b.ySetter=function(a){this.element.setAttribute("cy",a)};return b.attr(a)},arc:function(a,b,c,d,e,f){if(ca(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,e,f){var e=ca(a)?a.r:
	e,g=this.createElement("rect"),a=ca(a)?a:a===t?{}:{x:a,y:b,width:v(c,0),height:v(d,0)};if(f!==t)a.strokeWidth=f,a=g.crisp(a);if(e)a.r=e;g.rSetter=function(a){H(this.element,{rx:a,ry:a})};return g.attr(a)},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[m(c,!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return r(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f=
	{preserveAspectRatio:Q};arguments.length>1&&q(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g,h=this.symbols[a],h=h&&h(u(b),u(c),d,e,f),i=/^url\((.*?)\)$/,j,k;if(h)g=this.path(h),q(g,{symbolName:a,x:b,y:c,width:d,height:e}),f&&q(g,f);else if(i.test(a))k=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),
	a.alignByTranslate||a.translate(u((d-b[0])/2),u((e-b[1])/2)))},j=a.match(i)[1],a=Kb[j],g=this.image(j).attr({x:b,y:c}),g.isImg=!0,a?k(g,a):(g.attr({width:0,height:0}),Y("img",{onload:function(){k(g,Kb[j]=[this.width,this.height])},src:j}));return g},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",
	a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=Z(f),j=ea(f),k=Z(g),g=ea(g),e=e.end-f<ma?0:1;return["M",a+c*i,b+c*j,"A",c,c,0,e,1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]},callout:function(a,b,c,d,e){var f=C(e&&e.r||0,c,d),g=f+6,h=e&&e.anchorX,i=e&&e.anchorY,
	e=u(e.strokeWidth||0)%2/2;a+=e;b+=e;e=["M",a+f,b,"L",a+c-f,b,"C",a+c,b,a+c,b,a+c,b+f,"L",a+c,b+d-f,"C",a+c,b+d,a+c,b+d,a+c-f,b+d,"L",a+f,b+d,"C",a,b+d,a,b+d,a,b+d-f,"L",a,b+f,"C",a,b,a,b,a+f,b];h&&h>c&&i>b+g&&i<b+d-g?e.splice(13,3,"L",a+c,i-6,a+c+6,i,a+c,i+6,a+c,b+d-f):h&&h<0&&i>b+g&&i<b+d-g?e.splice(33,3,"L",a,i+6,a-6,i,a,i-6,a,b+f):i&&i>d&&h>a+g&&h<a+c-g?e.splice(23,3,"L",h+6,b+d,h,b+d+6,h-6,b+d,a+f,b+d):i&&i<0&&h>a+g&&h<a+c-g&&e.splice(3,3,"L",h-6,b,h,b-6,h+6,b,c-f,b);return e}},clipRect:function(a,
	b,c,d){var e="highcharts-"+tb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},text:function(a,b,c,d){var e=fa||!aa&&this.forExport,f={};if(d&&!this.forExport)return this.html(a,b,c);f.x=Math.round(b||0);if(c)f.y=Math.round(c);if(a||a===0)f.text=a;a=this.createElement("text").attr(f);e&&a.css({position:"absolute"});if(!d)a.xSetter=function(a,b,c){var d=c.childNodes,e,f;for(f=1;f<d.length;f++)e=d[f],e.getAttribute("x")===c.getAttribute("x")&&
	e.setAttribute("x",a);c.setAttribute(b,a)};return a},fontMetrics:function(a){var a=a||this.style.fontSize,a=/px/.test(a)?z(a):/em/.test(a)?parseFloat(a)*12:12,a=a<24?a+4:u(a*1.2),b=u(a*0.8);return{h:a,b:b}},label:function(a,b,c,d,e,f,g,h,i){function j(){var a,b;a=s.element.style;J=(Va===void 0||wb===void 0||n.styles.textAlign)&&s.textStr&&s.getBBox();n.width=(Va||J.width||0)+2*x+v;n.height=(wb||J.height||0)+2*x;na=x+o.fontMetrics(a&&a.fontSize).b;if(z){if(!m)a=u(-L*x),b=h?-na:0,n.box=m=d?o.symbol(d,
	a,b,n.width,n.height,B):o.rect(a,b,n.width,n.height,0,B[Pb]),m.attr("fill",Q).add(n);m.isImg||m.attr(q({width:u(n.width),height:u(n.height)},B));B=null}}function k(){var a=n.styles,a=a&&a.textAlign,b=v+x*(1-L),c;c=h?0:na;if(r(Va)&&J&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(Va-J.width);if(b!==s.x||c!==s.y)s.attr("x",b),c!==t&&s.attr("y",c);s.x=b;s.y=c}function l(a,b){m?m.attr(a,b):B[a]=b}var o=this,n=o.g(i),s=o.text("",0,0,g).attr({zIndex:1}),m,J,L=0,x=3,v=0,Va,wb,xb,yb,y=0,B={},na,
	z;n.onAdd=function(){s.add(n);n.attr({text:a||"",x:b,y:c});m&&r(e)&&n.attr({anchorX:e,anchorY:f})};n.widthSetter=function(a){Va=a};n.heightSetter=function(a){wb=a};n.paddingSetter=function(a){r(a)&&a!==x&&(x=a,k())};n.paddingLeftSetter=function(a){r(a)&&a!==v&&(v=a,k())};n.alignSetter=function(a){L={left:0,center:0.5,right:1}[a]};n.textSetter=function(a){a!==t&&s.textSetter(a);j();k()};n["stroke-widthSetter"]=function(a,b){a&&(z=!0);y=a%2/2;l(b,a)};n.strokeSetter=n.fillSetter=n.rSetter=function(a,
	b){b==="fill"&&a&&(z=!0);l(b,a)};n.anchorXSetter=function(a,b){e=a;l(b,a+y-xb)};n.anchorYSetter=function(a,b){f=a;l(b,a-yb)};n.xSetter=function(a){n.x=a;L&&(a-=L*((Va||J.width)+x));xb=u(a);n.attr("translateX",xb)};n.ySetter=function(a){yb=n.y=u(a);n.attr("translateY",yb)};var A=n.css;return q(n,{css:function(a){if(a){var b={},a=w(a);p("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow".split(","),function(c){a[c]!==t&&(b[c]=a[c],delete a[c])});s.css(b)}return A.call(n,
	a)},getBBox:function(){return{width:J.width+2*x,height:J.height+2*x,x:J.x-x,y:J.y-x}},shadow:function(a){m&&m.shadow(a);return n},destroy:function(){W(n.element,"mouseenter");W(n.element,"mouseleave");s&&(s=s.destroy());m&&(m=m.destroy());P.prototype.destroy.call(n);n=o=j=k=l=null}})}};Za=ta;q(P.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=q(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=
	this.element,b=this.bBox;if(!b){if(a.nodeName==="text")a.style.position="absolute";b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}}return b},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=this.shadows;G(b,{marginLeft:c,marginTop:d});i&&p(i,function(a){G(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&
	p(b.childNodes,function(c){a.invertChild(c,b)});if(b.tagName==="SPAN"){var j=this.rotation,k,l=z(this.textWidth),o=[j,g,b.innerHTML,this.textWidth].join(",");if(o!==this.cTT){k=a.fontMetrics(b.style.fontSize).b;r(j)&&this.setSpanRotation(j,h,k);i=m(this.elemWidth,b.offsetWidth);if(i>l&&/[ \-]/.test(b.textContent||b.innerText))G(b,{width:l+"px",display:"block",whiteSpace:"normal"}),i=l;this.getSpanCorrection(i,k,h,j,g)}G(b,{left:e+(this.xCorr||0)+"px",top:f+(this.yCorr||0)+"px"});if(ib)k=b.offsetHeight;
	this.cTT=o}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,c){var d={},e=Aa?"-ms-transform":ib?"-webkit-transform":Ta?"MozTransform":Ib?"-o-transform":"";d[e]=d.transform="rotate("+a+"deg)";d[e+(Ta?"Origin":"-origin")]=d.transformOrigin=b*100+"% "+c+"px";G(this.element,d)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});q(ta.prototype,{html:function(a,b,c){var d=this.createElement("span"),e=d.element,f=d.renderer;d.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;
	e.innerHTML=this.textStr=a};d.xSetter=d.ySetter=d.alignSetter=d.rotationSetter=function(a,b){b==="align"&&(b="textAlign");d[b]=a;d.htmlUpdateTransform()};d.attr({text:a,x:u(b),y:u(c)}).css({position:"absolute",whiteSpace:"nowrap",fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});d.css=d.htmlCss;if(f.isSVG)d.add=function(a){var b,c=f.box.parentNode,j=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)j.push(a),a=a.parentGroup;p(j.reverse(),function(a){var d;b=a.div=a.div||Y(Ja,{className:H(a.element,
	"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;q(a,{translateXSetter:function(b,c){d.left=b+"px";a[c]=b;a.doTransform=!0},translateYSetter:function(b,c){d.top=b+"px";a[c]=b;a.doTransform=!0},visibilitySetter:function(a,b){d[b]=a}})})}}else b=c;b.appendChild(e);d.added=!0;d.alignOnAdd&&d.htmlUpdateTransform();return d};return d}});var X;if(!aa&&!fa){R.VMLElement=X={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",
	";"],e=b===Ja;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=Y(c);this.renderer=a},add:function(a){var b=this.renderer,c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();return this},updateTransform:P.prototype.htmlUpdateTransform,
	setSpanRotation:function(){var a=this.rotation,b=Z(a*Ca),c=ea(a*Ca);G(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",b,", M12=",-c,", M21=",c,", M22=",b,", sizingMethod='auto expand')"].join(""):Q})},getSpanCorrection:function(a,b,c,d,e){var f=d?Z(d*Ca):1,g=d?ea(d*Ca):0,h=m(this.elemHeight,this.element.offsetHeight),i;this.xCorr=f<0&&-a;this.yCorr=g<0&&-h;i=f*g<0;this.xCorr+=g*b*(i?1-c:c);this.yCorr-=f*b*(d?i?c:1-c:1);e&&e!=="left"&&(this.xCorr-=a*c*(f<0?-1:1),d&&(this.yCorr-=
	h*c*(g<0?-1:1)),G(this.element,{textAlign:e}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)if(ha(a[b]))c[b]=u(a[b]*10)-5;else if(a[b]==="Z")c[b]="x";else if(c[b]=a[b],a.isArc&&(a[b]==="wa"||a[b]==="at"))c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1);return c.join(" ")||"x"},clip:function(a){var b=this,c;a?(c=a.members,ja(c,b),c.push(b),b.destroyClip=function(){ja(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:hb?"inherit":"rect(auto)"});
	return b.css(a)},css:P.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&Pa(a)},destroy:function(){this.destroyClip&&this.destroyClip();return P.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=I.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=z(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,
	l,o,n,s;k&&typeof k.value!=="string"&&(k="x");o=k;if(a){n=m(a.width,3);s=(a.opacity||0.15)/n;for(e=1;e<=3;e++){l=n*2+1-2*e;c&&(o=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',o,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=Y(g.prepVML(j),null,{left:z(i.left)+m(a.offsetX,1),top:z(i.top)+m(a.offsetY,1)});if(c)h.cutOff=l+1;j=['<stroke color="',a.color||"black",'" opacity="',s*e,'"/>'];Y(g.prepVML(j),null,null,h);b?b.element.appendChild(h):
	f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this},updateShadows:sa,setAttr:function(a,b){hb?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){this.element.className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||Y(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var d=this.shadows,a=a||[];this.d=a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;)d[c].path=d[c].cutOff?
	this.cutOffPath(a,d[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var d=c.nodeName;if(d==="SPAN")c.style.color=a;else if(d!=="IMG")c.filled=a!==Q,this.setAttr("fillcolor",this.renderer.color(a,c,b,this))},opacitySetter:sa,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-u(ea(a*Ca)+1)+"px";c.top=u(Z(a*Ca))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;ha(a)&&(a+="px");
	this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){a==="inherit"&&(a="visible");this.shadows&&p(this.shadows,function(c){c.style[b]=a});c.nodeName==="DIV"&&(a=a==="hidden"?"-999em":0,hb||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;b==="x"?b="left":b==="y"&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}};X=ka(P,X);X.prototype.ySetter=
	X.prototype.widthSetter=X.prototype.heightSetter=X.prototype.xSetter;var ga={Element:X,isIE8:wa.indexOf("MSIE 8.0")>-1,init:function(a,b,c,d){var e;this.alignedObjects=[];d=this.createElement(Ja).css(q(this.getStyle(d),{position:"relative"}));e=d.element;a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.cache={};this.setSize(b,c,!1);if(!y.namespaces.hcv){y.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{y.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(f){y.styleSheets[0].cssText+=
	"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=ca(a);return q(e,{members:[],left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:c)-1,height:(f?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+u(a?e:d)+"px,"+u(a?
	f:b)+"px,"+u(a?b:f)+"px,"+u(a?d:e)+"px)"};!a&&hb&&c==="DIV"&&q(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){p(e.members,function(a){a.element&&a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,j=Q;a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var k,l,o=a.linearGradient||a.radialGradient,n,s,m,J,L,x="",a=a.stops,r,v=[],q=function(){h=['<fill colors="'+v.join(",")+'" opacity="',m,'" o:opacity2="',s,'" type="',i,'" ',x,'focus="100%" method="any" />'];
	Y(e.prepVML(h),null,null,b)};n=a[0];r=a[a.length-1];n[0]>0&&a.unshift([0,n[1]]);r[0]<1&&a.push([1,r[1]]);p(a,function(a,b){g.test(a[1])?(f=ya(a[1]),k=f.get("rgb"),l=f.get("a")):(k=a[1],l=1);v.push(a[0]*100+"% "+k);b?(m=l,J=k):(s=l,L=k)});if(c==="fill")if(i==="gradient")c=o.x1||o[0]||0,a=o.y1||o[1]||0,n=o.x2||o[2]||0,o=o.y2||o[3]||0,x='angle="'+(90-U.atan((o-a)/(n-c))*180/ma)+'"',q();else{var j=o.r,t=j*2,u=j*2,y=o.cx,B=o.cy,na=b.radialReference,w,j=function(){na&&(w=d.getBBox(),y+=(na[0]-w.x)/w.width-
	0.5,B+=(na[1]-w.y)/w.height-0.5,t*=na[2]/w.width,u*=na[2]/w.height);x='src="'+E.global.VMLRadialGradientURL+'" size="'+t+","+u+'" origin="0.5,0.5" position="'+y+","+B+'" color2="'+L+'" ';q()};d.added?j():d.onAdd=j;j=J}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=ya(a),h=["<",c,' opacity="',f.get("a"),'"/>'],Y(this.prepVML(h),null,null,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);if(j.length)j[0].opacity=1,j[0].type="solid";j=a}return j},prepVML:function(a){var b=this.isIE8,a=a.join("");b?
	(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:ta.prototype.html,path:function(a){var b={coordsize:"10 10"};La(a)?b.d=a:ca(a)&&q(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");if(ca(a))c=a.r,b=a.y,a=a.x;d.isCircle=
	!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Ja).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f},createElement:function(a){return a==="rect"?this.symbol(a):ta.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this,d=b.style,e=a.tagName==="IMG"&&a.style;G(a,{flip:"x",left:z(d.width)-(e?z(e.top):
	1),top:z(d.height)-(e?z(e.left):1),rotation:-90});p(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=Z(f),i=ea(f),j=Z(g),k=ea(g);if(g-f===0)return["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*j,b+h*k];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*j,b+c*k,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+
	c,b+d/2,"e"]},rect:function(a,b,c,d,e){return ta.prototype.symbols[!r(e)||!e.r?"square":"callout"].call(0,a,b,c,d,e)}}};R.VMLRenderer=X=function(){this.init.apply(this,arguments)};X.prototype=w(ta.prototype,ga);Za=X}ta.prototype.measureSpanWidth=function(a,b){var c=y.createElement("span"),d;d=y.createTextNode(a);c.appendChild(d);G(c,b);this.box.appendChild(c);d=c.offsetWidth;Pa(c);return d};var Lb;if(fa)R.CanVGRenderer=X=function(){xa="http://www.w3.org/1999/xhtml"},X.prototype.symbols={},Lb=function(){function a(){var a=
	b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){b.length===0&&Qb(d,a);b.push(c)}}}(),Za=X;Sa.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.horiz,e=a.categories,f=a.names,g=this.pos,h=b.labels,i=a.tickPositions,d=d&&e&&!h.step&&!h.staggerLines&&!h.rotation&&c.plotWidth/i.length||!d&&(c.margin[3]||c.chartWidth*0.33),j=g===i[0],k=g===i[i.length-1],l,f=e?m(e[g],f[g],g):g,e=this.label,o=i.info;a.isDatetimeAxis&&o&&(l=b.dateTimeLabelFormats[o.higherRanks[g]||
	o.unitName]);this.isFirst=j;this.isLast=k;b=a.labelFormatter.call({axis:a,chart:c,isFirst:j,isLast:k,dateTimeLabelFormat:l,value:a.isLog?da(ia(f)):f});g=d&&{width:v(1,u(d-2*(h.padding||10)))+"px"};g=q(g,h.style);if(r(e))e&&e.attr({text:b}).css(g);else{l={align:a.labelAlign};if(ha(h.rotation))l.rotation=h.rotation;if(d&&h.ellipsis)l._clipHeight=a.len/i.length;this.label=r(b)&&h.enabled?c.renderer.text(b,0,0,h.useHTML).attr(l).css(g).add(a.labelGroup):null}},getLabelSize:function(){var a=this.label,
	b=this.axis;return a?a.getBBox()[b.horiz?"height":"width"]:0},getLabelSides:function(){var a=this.label.getBBox(),b=this.axis,c=b.horiz,d=b.options.labels,a=c?a.width:a.height,b=c?d.x-a*{left:0,center:0.5,right:1}[b.labelAlign]:0;return[b,c?a+b:a]},handleOverflow:function(a,b){var c=!0,d=this.axis,e=this.isFirst,f=this.isLast,g=d.horiz?b.x:b.y,h=d.reversed,i=d.tickPositions,j=this.getLabelSides(),k=j[0],j=j[1],l,o,n,s=this.label.line||0;l=d.labelEdge;o=d.justifyLabels&&(e||f);l[s]===t||g+k>l[s]?l[s]=
	g+j:o||(c=!1);if(o){l=(o=d.justifyToPlot)?d.pos:0;o=o?l+d.len:d.chart.chartWidth;do a+=e?1:-1,n=d.ticks[i[a]];while(i[a]&&(!n||n.label.line!==s));d=n&&n.label.xy&&n.label.xy.x+n.getLabelSides()[e?0:1];e&&!h||f&&h?g+k<l&&(g=l-k,n&&g+j>d&&(c=!1)):g+j>o&&(g=o-j,n&&g+k<d&&(c=!1));b.x=g}return c},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-
	e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,l=i.staggerLines,o=i.chart.renderer.fontMetrics(e.style.fontSize).b,n=e.rotation,a=a+e.x-(f&&d?f*j*(k?-1:1):0),b=b+e.y-(f&&!d?f*j*(k?1:-1):0);n&&i.side===2&&(b-=o-o*Z(n*Ca));!r(e.y)&&!n&&(b+=o-c.getBBox().height/2);if(l)c.line=g/(h||1)%l,b+=c.line*(i.labelOffset/l);return{x:a,y:b}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",
	a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,i=this.label,j=this.pos,k=e.labels,l=this.gridLine,o=h?h+"Grid":"grid",n=h?h+"Tick":"tick",s=e[o+"LineWidth"],p=e[o+"LineColor"],J=e[o+"LineDashStyle"],L=e[n+"Length"],o=e[n+"Width"]||0,x=e[n+"Color"],r=e[n+"Position"],n=this.mark,v=k.step,q=!0,u=d.tickmarkOffset,w=this.getPosition(g,j,u,b),y=w.x,w=w.y,B=g&&y===d.pos+d.len||!g&&w===d.pos?-1:1;this.isActive=!0;if(s){j=d.getPlotLinePath(j+
	u,s*B,b,!0);if(l===t){l={stroke:p,"stroke-width":s};if(J)l.dashstyle=J;if(!h)l.zIndex=1;if(b)l.opacity=0;this.gridLine=l=s?f.path(j).attr(l).add(d.gridGroup):null}if(!b&&l&&j)l[this.isNew?"attr":"animate"]({d:j,opacity:c})}if(o&&L)r==="inside"&&(L=-L),d.opposite&&(L=-L),h=this.getMarkPath(y,w,L,o*B,g,f),n?n.animate({d:h,opacity:c}):this.mark=f.path(h).attr({stroke:x,"stroke-width":o,opacity:c}).add(d.axisGroup);if(i&&!isNaN(y))i.xy=w=this.getLabelPosition(y,w,i,g,k,u,a,v),this.isFirst&&!this.isLast&&
	!m(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!m(e.showLastLabel,1)?q=!1:!d.isRadial&&!k.step&&!k.rotation&&!b&&c!==0&&(q=this.handleOverflow(a,w)),v&&a%v&&(q=!1),q&&!isNaN(w.y)?(w.opacity=c,i[this.isNew?"attr":"animate"](w),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Oa(this,this.axis)}};R.PlotLineOrBand=function(a,b){this.axis=a;if(b)this.options=b,this.id=b.id};R.PlotLineOrBand.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=(b.pointRange||0)/2,e=a.options,f=e.label,
	g=a.label,h=e.width,i=e.to,j=e.from,k=r(j)&&r(i),l=e.value,o=e.dashStyle,n=a.svgElem,s=[],p,J=e.color,L=e.zIndex,x=e.events,q={},t=b.chart.renderer;b.isLog&&(j=za(j),i=za(i),l=za(l));if(h){if(s=b.getPlotLinePath(l,h),q={stroke:J,"stroke-width":h},o)q.dashstyle=o}else if(k){j=v(j,b.min-d);i=C(i,b.max+d);s=b.getPlotBandPath(j,i,e);if(J)q.fill=J;if(e.borderWidth)q.stroke=e.borderColor,q["stroke-width"]=e.borderWidth}else return;if(r(L))q.zIndex=L;if(n)if(s)n.animate({d:s},null,n.onGetPath);else{if(n.hide(),
	n.onGetPath=function(){n.show()},g)a.label=g=g.destroy()}else if(s&&s.length&&(a.svgElem=n=t.path(s).attr(q).add(),x))for(p in d=function(b){n.on(b,function(c){x[b].apply(a,[c])})},x)d(p);if(f&&r(f.text)&&s&&s.length&&b.width>0&&b.height>0){f=w({align:c&&k&&"center",x:c?!k&&4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},f);if(!g){q={align:f.textAlign||f.align,rotation:f.rotation};if(r(L))q.zIndex=L;a.label=g=t.text(f.text,0,0,f.useHTML).attr(q).css(f.style).add()}b=[s[1],
	s[4],m(s[6],s[1])];s=[s[2],s[5],m(s[7],s[2])];c=Na(b);k=Na(s);g.align(f,!1,{x:c,y:k,width:Ba(b)-c,height:Ba(s)-k});g.show()}else g&&g.hide();return a},destroy:function(){ja(this.axis.plotLinesAndBands,this);delete this.axis;Oa(this)}};la.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#C0C0C0",labels:N,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,
	maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#707070"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,
	tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return Ga(this.total,-1)},style:N.style}},defaultLeftAxisOptions:{labels:{x:-15,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:20},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-15},title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.coll=(this.isXAxis=c)?"xAxis":"yAxis";this.opposite=
	b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.names=[];this.isLog=e==="logarithmic";this.isDatetimeAxis=e==="datetime";this.isLinked=r(d.linkedTo);this.tickmarkOffset=this.categories&&d.tickmarkPlacement===
	"between"?0.5:0;this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.min=this.max=null;this.crosshair=m(d.crosshair,qa(a.options.tooltip.crosshairs)[c?0:1],!1);var f,d=this.options.events;Da(this,a.axes)===-1&&(c&&!this.isColorAxis?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));
	this.series=this.series||[];if(a.inverted&&c&&this.reversed===t)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)K(this,f,d[f]);if(this.isLog)this.val2lin=za,this.lin2val=ia},setOptions:function(a){this.options=w(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],w(E[this.coll],a))},defaultLabelFormatter:function(){var a=
	this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=E.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Ia(h,this);else if(c)g=b;else if(d)g=cb(d,b);else if(f&&a>=1E3)for(;f--&&g===t;)c=Math.pow(1E3,f+1),a>=c&&e[f]!==null&&(g=Ga(b/c,-1)+e[f]);g===t&&(g=M(b)>=1E4?Ga(b,0):Ga(b,-1,t,""));return g},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;a.buildStacks&&a.buildStacks();p(a.series,function(c){if(c.visible||
	!b.options.chart.ignoreHiddenSeries){var d;d=c.options.threshold;var e;a.hasVisibleSeries=!0;a.isLog&&d<=0&&(d=null);if(a.isXAxis){if(d=c.xData,d.length)a.dataMin=C(m(a.dataMin,d[0]),Na(d)),a.dataMax=v(m(a.dataMax,d[0]),Ba(d))}else{c.getExtremes();e=c.dataMax;c=c.dataMin;if(r(c)&&r(e))a.dataMin=C(m(a.dataMin,c),c),a.dataMax=v(m(a.dataMax,e),e);if(r(d))if(a.dataMin>=d)a.dataMin=d,a.ignoreMinPadding=!0;else if(a.dataMax<d)a.dataMax=d,a.ignoreMaxPadding=!0}}})},translate:function(a,b,c,d,e,f){var g=
	1,h=0,i=d?this.oldTransA:this.transA,d=d?this.oldMin:this.min,j=this.minPixelPadding,e=(this.options.ordinal||this.isLog&&e)&&this.lin2val;if(!i)i=this.transA;if(c)g*=-1,h=this.len;this.reversed&&(g*=-1,h-=g*(this.sector||this.len));b?(a=a*g+h,a-=j,a=a/i+d,e&&(a=this.lin2val(a))):(e&&(a=this.val2lin(a)),f==="between"&&(f=0.5),a=g*(a-d)*i+h+g*j+(ha(f)?i*f*this.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-
	(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d,e){var f=this.chart,g=this.left,h=this.top,i,j,k=c&&f.oldChartHeight||f.chartHeight,l=c&&f.oldChartWidth||f.chartWidth,o;i=this.transB;e=m(e,this.translate(a,null,null,c));a=c=u(e+i);i=j=u(k-e-i);if(isNaN(e))o=!0;else if(this.horiz){if(i=h,j=k-this.bottom,a<g||a>g+this.width)o=!0}else if(a=g,c=l-this.right,i<h||i>h+this.height)o=!0;return o&&!d?null:f.renderer.crispLine(["M",a,i,"L",c,j],b||1)},getLinearTickPositions:function(a,
	b,c){var d,e=da(T(b/a)*a),f=da(Ka(c/a)*a),g=[];if(b===c&&ha(b))return[b];for(b=e;b<=f;){g.push(b);b=da(b+a);if(b===d)break;d=b}return g},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e;if(this.isLog){e=b.length;for(a=1;a<e;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),this.min,this.max,a.startOfWeek)),d[0]<this.min&&
	d.shift();else for(b=this.min+(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,g,h,i,j;if(this.isXAxis&&this.minRange===t&&!this.isLog)r(a.min)||r(a.max)?this.minRange=null:(p(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===t||h<f)f=h}),this.minRange=C(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){var k=this.minRange;d=
	(k-c+b)/2;d=[b-d,m(a.min,b-d)];if(e)d[2]=this.dataMin;b=Ba(d);c=[b+k,m(a.max,b+k)];if(e)c[2]=this.dataMax;c=Na(c);c-b<k&&(d[0]=c-k,d[1]=m(a.min,c-k),b=Ba(d))}this.min=b;this.max=c},setAxisTranslation:function(a){var b=this,c=b.max-b.min,d=b.axisPointRange||0,e,f=0,g=0,h=b.linkedParent,i=!!b.categories,j=b.transA;if(b.isXAxis||i||d)h?(f=h.minPointOffset,g=h.pointRangePadding):p(b.series,function(a){var h=i?1:b.isXAxis?a.pointRange:b.axisPointRange||0,j=a.options.pointPlacement,n=a.closestPointRange;
	h>c&&(h=0);d=v(d,h);f=v(f,Fa(j)?0:h/2);g=v(g,j==="on"?0:h);!a.noSharedTooltip&&r(n)&&(e=r(e)?C(e,n):n)}),h=b.ordinalSlope&&e?b.ordinalSlope/e:1,b.minPointOffset=f*=h,b.pointRangePadding=g*=h,b.pointRange=C(d,c),b.closestPointRange=e;if(a)b.oldTransA=j;b.translationSlope=b.transA=j=b.len/(c+g||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=j*f},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=b.options.tickPositioner,j=d.maxPadding,
	k=d.minPadding,l=d.tickInterval,o=d.minTickInterval,n=d.tickPixelInterval,s,$=b.categories;h?(b.linkedParent=c[b.coll][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=m(c.min,c.dataMin),b.max=m(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&ra(11,1)):(b.min=m(b.userMin,d.min,b.dataMin),b.max=m(b.userMax,d.max,b.dataMax));if(e)!a&&C(b.min,m(b.dataMin,b.min))<=0&&ra(10,1),b.min=da(za(b.min)),b.max=da(za(b.max));if(b.range&&r(b.max))b.userMin=b.min=v(b.min,b.max-b.range),b.userMax=b.max,b.range=
	null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!$&&!b.axisPointRange&&!b.usePercentage&&!h&&r(b.min)&&r(b.max)&&(c=b.max-b.min)){if(!r(d.min)&&!r(b.userMin)&&k&&(b.dataMin<0||!b.ignoreMinPadding))b.min-=c*k;if(!r(d.max)&&!r(b.userMax)&&j&&(b.dataMax>0||!b.ignoreMaxPadding))b.max+=c*j}if(ha(d.floor))b.min=v(b.min,d.floor);if(ha(d.ceiling))b.max=C(b.max,d.ceiling);b.min===b.max||b.min===void 0||b.max===void 0?b.tickInterval=1:h&&!l&&n===b.linkedParent.options.tickPixelInterval?b.tickInterval=
	b.linkedParent.tickInterval:(b.tickInterval=m(l,$?1:(b.max-b.min)*n/v(b.len,n)),!r(l)&&b.len<n&&!this.isRadial&&!this.isLog&&!$&&d.startOnTick&&d.endOnTick&&(s=!0,b.tickInterval/=4));g&&!a&&p(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(b.pointRange)b.tickInterval=v(b.pointRange,b.tickInterval);if(!l&&b.tickInterval<
	o)b.tickInterval=o;if(!f&&!e&&!l)b.tickInterval=nb(b.tickInterval,null,mb(b.tickInterval),d);b.minorTickInterval=d.minorTickInterval==="auto"&&b.tickInterval?b.tickInterval/5:d.minorTickInterval;b.tickPositions=a=d.tickPositions?[].concat(d.tickPositions):i&&i.apply(b,[b.min,b.max]);if(!a)!b.ordinalPositions&&(b.max-b.min)/b.tickInterval>v(2*b.len,200)&&ra(19,!0),a=f?b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval,d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,
	!0):e?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),s&&a.splice(1,a.length-2),b.tickPositions=a;if(!h)e=a[0],f=a[a.length-1],h=b.minPointOffset||0,d.startOnTick?b.min=e:b.min-h>e&&a.shift(),d.endOnTick?b.max=f:b.max+h<f&&a.pop(),a.length===1&&(d=M(b.max)>1E13?1:0.001,b.min-=d,b.max+=d)},setMaxTicks:function(){var a=this.chart,b=a.maxTicks||{},c=this.tickPositions,d=this._maxTicksKey=[this.coll,this.pos,this.len].join("-");if(!this.isLinked&&
	!this.isDatetimeAxis&&c&&c.length>(b[d]||0)&&this.options.alignTicks!==!1)b[d]=c.length;a.maxTicks=b},adjustTickAmount:function(){var a=this._maxTicksKey,b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&this.options.alignTicks!==!1&&this.min!==t){var d=this.tickAmount,e=b.length;this.tickAmount=a=c[a];if(e<a){for(;b.length<a;)b.push(da(b[b.length-1]+this.tickInterval));this.transA*=(e-1)/(a-1);this.max=b[b.length-1]}if(r(d)&&a!==d)this.isDirty=
	!0}},setScale:function(){var a=this.stacks,b,c,d,e;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();e=this.len!==this.oldAxisLength;p(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(e||d||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax){if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].total=null,a[b][c].cum=0;this.forceRedraw=!1;this.getSeriesExtremes();this.setTickPositions();this.oldUserMin=
	this.userMin;this.oldUserMax=this.userMax;if(!this.isDirty)this.isDirty=e||this.min!==this.oldMin||this.max!==this.oldMax}else if(!this.isXAxis){if(this.oldStacks)a=this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}this.setMaxTicks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=m(c,!0),e=q(e,{min:a,max:b});D(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.eventArgs=e;f.isDirtyExtremes=!0;c&&g.redraw(d)})},zoom:function(a,b){var c=this.dataMin,d=this.dataMax,
	e=this.options;this.allowZoomOutside||(r(c)&&a<=C(c,m(e.min,c))&&(a=t),r(d)&&b>=v(d,m(e.max,d))&&(b=t));this.displayBtn=a!==t||b!==t;this.setExtremes(a,b,!1,t,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=this.horiz,e=m(b.width,a.plotWidth-c+(b.offsetRight||0)),f=m(b.height,a.plotHeight),g=m(b.top,a.plotTop),b=m(b.left,a.plotLeft+c),c=/%$/;c.test(f)&&(f=parseInt(f,10)/100*a.plotHeight);c.test(g)&&(g=parseInt(g,10)/100*a.plotHeight+a.plotTop);
	this.left=b;this.top=g;this.width=e;this.height=f;this.bottom=a.chartHeight-f-g;this.right=a.chartWidth-e-b;this.len=v(d?e:f,0);this.pos=d?b:g},getExtremes:function(){var a=this.isLog;return{min:a?da(ia(this.min)):this.min,max:a?da(ia(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?ia(this.min):this.min,b=b?ia(this.max):this.max;c>a||a===null?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=
	(m(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,j,k=0,l,o=0,n=d.title,s=d.labels,$=0,J=b.axisOffset,L=b.clipOffset,x=[-1,1,1,-1][h],q,u=1,w=m(s.maxStaggerLines,5),y,z,A,B,na=h===2?c.fontMetrics(s.style.fontSize).b:0;a.hasData=j=a.hasVisibleSeries||r(a.min)&&r(a.max)&&!!e;a.showAxis=b=j||m(d.showEmpty,!0);a.staggerLines=
	a.horiz&&s.staggerLines;if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:s.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels").add();if(j||a.isLinked){a.labelAlign=m(s.align||a.autoLabelAlign(s.rotation));p(e,function(b){f[b]?f[b].addLabel():f[b]=new Sa(a,b)});if(a.horiz&&!a.staggerLines&&w&&!s.rotation){for(q=a.reversed?[].concat(e).reverse():e;u<w;){j=
	[];y=!1;for(s=0;s<q.length;s++)z=q[s],A=(A=f[z].label&&f[z].label.getBBox())?A.width:0,B=s%u,A&&(z=a.translate(z),j[B]!==t&&z<j[B]&&(y=!0),j[B]=z+A);if(y)u++;else break}if(u>1)a.staggerLines=u}p(e,function(b){if(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign)$=v(f[b].getLabelSize(),$)});if(a.staggerLines)$*=a.staggerLines,a.labelOffset=$}else for(q in f)f[q].destroy(),delete f[q];if(n&&n.text&&n.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(n.text,0,0,n.useHTML).attr({zIndex:7,rotation:n.rotation||
	0,align:n.textAlign||{low:"left",middle:"center",high:"right"}[n.align]}).addClass("highcharts-"+this.coll.toLowerCase()+"-title").css(n.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(b)k=a.axisTitle.getBBox()[g?"height":"width"],o=m(n.margin,g?5:10),l=n.offset;a.axisTitle[b?"show":"hide"]()}a.offset=x*m(d.offset,J[h]);a.axisTitleMargin=m(l,$+o+($&&x*d.labels[g?"y":"x"]-na));J[h]=v(J[h],a.axisTitleMargin+k+x*a.offset);L[i]=v(L[i],T(d.lineWidth/2)*2)},getLinePath:function(a){var b=this.chart,c=this.opposite,
	d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d,d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=z(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*
	this.axisTitleMargin+(this.side===2?i:0);return{x:a?d:b+(g?this.width:0)+h+(e.x||0),y:a?b-(g?this.height:0)+h:d+(e.y||0)}},render:function(){var a=this,b=a.horiz,c=a.reversed,d=a.chart,e=d.renderer,f=a.options,g=a.isLog,h=a.isLinked,i=a.tickPositions,j,k=a.axisTitle,l=a.ticks,o=a.minorTicks,n=a.alternateBands,s=f.stackLabels,m=f.alternateGridColor,J=a.tickmarkOffset,L=f.lineWidth,x=d.hasRendered&&r(a.oldMin)&&!isNaN(a.oldMin),q=a.hasData,v=a.showAxis,u,w=f.labels.overflow,y=a.justifyLabels=b&&w!==
	!1,z;a.labelEdge.length=0;a.justifyToPlot=w==="justify";p([l,o,n],function(a){for(var b in a)a[b].isActive=!1});if(q||h)if(a.minorTickInterval&&!a.categories&&p(a.getMinorTickPositions(),function(b){o[b]||(o[b]=new Sa(a,b,"minor"));x&&o[b].isNew&&o[b].render(null,!0);o[b].render(null,!1,1)}),i.length&&(j=i.slice(),(b&&c||!b&&!c)&&j.reverse(),y&&(j=j.slice(1).concat([j[0]])),p(j,function(b,c){y&&(c=c===j.length-1?0:c+1);if(!h||b>=a.min&&b<=a.max)l[b]||(l[b]=new Sa(a,b)),x&&l[b].isNew&&l[b].render(c,
	!0,0.1),l[b].render(c,!1,1)}),J&&a.min===0&&(l[-1]||(l[-1]=new Sa(a,-1,null,!0)),l[-1].render(-1))),m&&p(i,function(b,c){if(c%2===0&&b<a.max)n[b]||(n[b]=new R.PlotLineOrBand(a)),u=b+J,z=i[c+1]!==t?i[c+1]+J:a.max,n[b].options={from:g?ia(u):u,to:g?ia(z):z,color:m},n[b].render(),n[b].isActive=!0}),!a._addedPlotLB)p((f.plotLines||[]).concat(f.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0;p([l,o,n],function(a){var b,c,e=[],f=va?va.duration||500:0,g=function(){for(c=e.length;c--;)a[e[c]]&&
	!a[e[c]].isActive&&(a[e[c]].destroy(),delete a[e[c]])};for(b in a)if(!a[b].isActive)a[b].render(b,!1,0),a[b].isActive=!1,e.push(b);a===n||!d.hasRendered||!f?g():f&&setTimeout(g,f)});if(L)b=a.getLinePath(L),a.axisLine?a.axisLine.animate({d:b}):a.axisLine=e.path(b).attr({stroke:f.lineColor,"stroke-width":L,zIndex:7}).add(a.axisGroup),a.axisLine[v?"show":"hide"]();if(k&&v)k[k.isNew?"attr":"animate"](a.getTitlePosition()),k.isNew=!1;s&&s.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){var a=
	this.chart.pointer;a&&a.reset(!0);this.render();p(this.plotLinesAndBands,function(a){a.render()});p(this.series,function(a){a.isDirty=!0})},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||W(b);for(d in c)Oa(c[d]),c[d]=null;p([b.ticks,b.minorTicks,b.alternateBands],function(a){Oa(a)});for(a=e.length;a--;)e[a].destroy();p("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),function(a){b[a]&&(b[a]=b[a].destroy())});this.cross&&this.cross.destroy()},
	drawCrosshair:function(a,b){if(this.crosshair)if((r(b)||!m(this.crosshair.snap,!0))===!1)this.hideCrosshair();else{var c,d=this.crosshair,e=d.animation;m(d.snap,!0)?r(b)&&(c=this.chart.inverted!=this.horiz?b.plotX:this.len-b.plotY):c=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos;c=this.isRadial?this.getPlotLinePath(this.isXAxis?b.x:m(b.stackY,b.y)):this.getPlotLinePath(null,null,null,null,c);if(c===null)this.hideCrosshair();else if(this.cross)this.cross.attr({visibility:"visible"})[e?"animate":
	"attr"]({d:c},e);else{e={"stroke-width":d.width||1,stroke:d.color||"#C0C0C0",zIndex:d.zIndex||2};if(d.dashStyle)e.dashstyle=d.dashStyle;this.cross=this.chart.renderer.path(c).attr(e).add()}}},hideCrosshair:function(){this.cross&&this.cross.hide()}};q(la.prototype,{getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},addPlotBand:function(a){this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){this.addPlotBandOrLine(a,
	"plotLines")},addPlotBandOrLine:function(a,b){var c=(new R.PlotLineOrBand(this,a)).render(),d=this.userOptions;c&&(b&&(d[b]=d[b]||[],d[b].push(a)),this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();p([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&ja(b,b[e])})}});la.prototype.getTimeTicks=function(a,b,
	c,d){var e=[],f={},g=E.global.useUTC,h,i=new Date(b-Ra),j=a.unitRange,k=a.count;if(r(b)){j>=A.second&&(i.setMilliseconds(0),i.setSeconds(j>=A.minute?0:k*T(i.getSeconds()/k)));if(j>=A.minute)i[Db](j>=A.hour?0:k*T(i[pb]()/k));if(j>=A.hour)i[Eb](j>=A.day?0:k*T(i[qb]()/k));if(j>=A.day)i[sb](j>=A.month?1:k*T(i[Xa]()/k));j>=A.month&&(i[Fb](j>=A.year?0:k*T(i[fb]()/k)),h=i[gb]());j>=A.year&&(h-=h%k,i[Gb](h));if(j===A.week)i[sb](i[Xa]()-i[rb]()+m(d,1));b=1;Ra&&(i=new Date(i.getTime()+Ra));h=i[gb]();for(var d=
	i.getTime(),l=i[fb](),o=i[Xa](),n=g?Ra:(864E5+i.getTimezoneOffset()*6E4)%864E5;d<c;)e.push(d),j===A.year?d=eb(h+b*k,0):j===A.month?d=eb(h,l+b*k):!g&&(j===A.day||j===A.week)?d=eb(h,l,o+b*k*(j===A.day?1:7)):d+=j*k,b++;e.push(d);p(vb(e,function(a){return j<=A.hour&&a%A.day===n}),function(a){f[a]="day"})}e.info=q(a,{higherRanks:f,totalRange:j*k});return e};la.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",
	[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],d=c[c.length-1],e=A[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=A[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+A[c[g+1][0]])/2)break;e===A.year&&a<5*e&&(f=[1,2,5]);c=nb(a/e,f,d[0]==="year"?v(mb(a/e),1):1);return{unitRange:e,count:c,unitName:d[0]}};la.prototype.getLogTickPositions=function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=u(a),g=this.getLinearTickPositions(a,
	b,c);else if(a>=0.08)for(var f=T(b),h,i,j,k,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)j=za(ia(f)*e[h]),j>b&&(!d||k<=c)&&g.push(k),k>c&&(l=!0),k=j}else if(b=ia(b),c=ia(c),a=e[d?"minorTickInterval":"tickInterval"],a=m(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=nb(a,null,mb(a)),g=Ua(this.getLinearTickPositions(a,b,c),za),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=
	a;return g};var Mb=R.Tooltip=function(){this.init.apply(this,arguments)};Mb.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=z(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).add().attr({y:-9999});fa||this.label.shadow(b.shadow);this.shared=b.shared},
	destroy:function(){if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden,h=e.followPointer||e.len>1;q(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:h?t:g?(2*f.anchorX+c)/3:c,anchorY:h?t:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g&&(M(a-f.x)>1||M(b-f.y)>1))clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d)},32)},hide:function(){var a=
	this,b;clearTimeout(this.hideTimer);if(!this.isHidden)b=this.chart.hoverPoints,this.hideTimer=setTimeout(function(){a.label.fadeOut();a.isHidden=!0},m(this.options.hideDelay,500)),b&&p(b,function(a){a.setState()}),this.chart.hoverPoints=null},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=0,h=0,i,a=qa(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===t&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(p(a,function(a){i=a.series.yAxis;g+=a.plotX;h+=(a.plotLow?
	(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&i?i.top-f:0)}),g/=a.length,h/=a.length,c=[e?d.plotWidth-h:g,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-g:h]);return Ua(c,u)},getPosition:function(a,b,c){var d=this.chart,e=this.distance,f={},g,h=["y",d.chartHeight,b,c.plotY+d.plotTop],i=["x",d.chartWidth,a,c.plotX+d.plotLeft],j=c.ttBelow||d.inverted&&!c.negative||!d.inverted&&c.negative,k=function(a,b,c,d){var g=c<d-e,b=d+e+c<b,c=d-e-c;d+=e;if(j&&b)f[a]=d;else if(!j&&g)f[a]=c;else if(g)f[a]=c;else if(b)f[a]=
	d;else return!1},l=function(a,b,c,d){if(d<e||d>b-e)return!1;else f[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2},o=function(a){var b=h;h=i;i=b;g=a},n=function(){k.apply(0,h)!==!1?l.apply(0,i)===!1&&!g&&(o(!0),n()):g?f.x=f.y=0:(o(!0),n())};(d.inverted||this.len>1)&&o();n();return f},defaultFormatter:function(a){var b=this.points||qa(this),c=b[0].series,d;d=[a.tooltipHeaderFormatter(b[0])];p(b,function(a){c=a.series;d.push(c.tooltipFormatter&&c.tooltipFormatter(a)||a.point.tooltipFormatter(c.tooltipOptions.pointFormat))});
	d.push(a.options.footerFormat||"");return d.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h={},i,j=[];i=e.formatter||this.defaultFormatter;var h=c.hoverPoints,k,l=this.shared;clearTimeout(this.hideTimer);this.followPointer=qa(a)[0].series.tooltipOptions.followPointer;g=this.getAnchor(a,b);f=g[0];g=g[1];l&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,h&&p(h,function(a){a.setState()}),p(a,function(a){a.setState("hover");j.push(a.getLabelConfig())}),h={x:a[0].category,
	y:a[0].y},h.points=j,this.len=j.length,a=a[0]):h=a.getLabelConfig();i=i.call(h,this);h=a.series;this.distance=m(h.tooltipOptions.distance,16);i===!1?this.hide():(this.isHidden&&(bb(d),d.attr("opacity",1).show()),d.attr({text:i}),k=e.borderColor||a.color||h.color||"#606060",d.attr({stroke:k}),this.updatePosition({plotX:f,plotY:g,negative:a.negative,ttBelow:a.ttBelow}),this.isHidden=!1);D(c,"tooltipRefresh",{text:i,x:f+c.plotLeft,y:g+c.plotTop,borderColor:k})},updatePosition:function(a){var b=this.chart,
	c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(u(c.x),u(c.y),a.plotX+b.plotLeft,a.plotY+b.plotTop)},tooltipHeaderFormatter:function(a){var b=a.series,c=b.tooltipOptions,d=c.dateTimeLabelFormats,e=c.xDateFormat,f=b.xAxis,g=f&&f.options.type==="datetime"&&ha(a.key),c=c.headerFormat,f=f&&f.closestPointRange,h;if(g&&!e){if(f)for(h in A){if(A[h]>=f||A[h]<=A.day&&a.key%A[h]>0){e=d[h];break}}else e=d.day;e=e||d.year}g&&e&&(c=c.replace("{point.key}","{point.key:"+
	e+"}"));return Ia(c,{point:a,series:b})}};var oa;$a=y.documentElement.ontouchstart!==t;var Wa=R.Pointer=function(a,b){this.init(a,b)};Wa.prototype={init:function(a,b){var c=b.chart,d=c.events,e=fa?"":c.zoomType,c=a.inverted,f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=f&&!c||e&&c;this.zoomVert=e&&!c||f&&c;this.hasZoom=f||e;this.runChartClick=d&&!!d.click;this.pinchDown=[];this.lastValidTouch={};if(R.Tooltip&&b.tooltip.enabled)a.tooltip=new Mb(a,b.tooltip),
	this.followTouchMove=b.tooltip.followTouchMove;this.setDOMEvents()},normalize:function(a,b){var c,d,a=a||window.event,a=Sb(a);if(!a.target)a.target=a.srcElement;d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;if(!b)this.chartPosition=b=Rb(this.chart.container);d.pageX===t?(c=v(a.x,a.clientX-b.left),d=a.y):(c=d.pageX-b.left,d=d.pageY-b.top);return q(a,{chartX:u(c),chartY:u(d)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};p(this.chart.axes,function(c){b[c.isXAxis?"xAxis":
	"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e,f,g=b.hoverPoint,h=b.hoverSeries,i,j,k=b.chartWidth,l=this.getIndex(a);if(d&&this.options.tooltip.shared&&(!h||!h.noSharedTooltip)){f=[];i=c.length;for(j=0;j<i;j++)if(c[j].visible&&c[j].options.enableMouseTracking!==!1&&!c[j].noSharedTooltip&&
	c[j].singularTooltips!==!0&&c[j].tooltipPoints.length&&(e=c[j].tooltipPoints[l])&&e.series)e._dist=M(l-e.clientX),k=C(k,e._dist),f.push(e);for(i=f.length;i--;)f[i]._dist>k&&f.splice(i,1);if(f.length&&f[0].clientX!==this.hoverX)d.refresh(f,a),this.hoverX=f[0].clientX}c=h&&h.tooltipOptions.followPointer;if(h&&h.tracker&&!c){if((e=h.tooltipPoints[l])&&e!==g)e.onMouseOver(a)}else d&&c&&!d.isHidden&&(h=d.getAnchor([{}],a),d.updatePosition({plotX:h[0],plotY:h[1]}));if(d&&!this._onDocumentMouseMove)this._onDocumentMouseMove=
	function(a){if(V[oa])V[oa].pointer.onDocumentMouseMove(a)},K(y,"mousemove",this._onDocumentMouseMove);p(b.axes,function(b){b.drawCrosshair(a,m(e,g))})},reset:function(a){var b=this.chart,c=b.hoverSeries,d=b.hoverPoint,e=b.tooltip,f=e&&e.shared?b.hoverPoints:d;(a=a&&e&&f)&&qa(f)[0].plotX===t&&(a=!1);if(a)e.refresh(f),d&&d.setState(d.state,!0);else{if(d)d.onMouseOut();if(c)c.onMouseOut();e&&e.hide();if(this._onDocumentMouseMove)W(y,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null;
	p(b.axes,function(a){a.hideCrosshair()});this.hoverX=null}},scaleGroups:function(a,b){var c=this.chart,d;p(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},
	drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,g=this.zoomVert,h=b.plotLeft,i=b.plotTop,j=b.plotWidth,k=b.plotHeight,l,o=this.mouseDownX,n=this.mouseDownY;d<h?d=h:d>h+j&&(d=h+j);e<i?e=i:e>i+k&&(e=i+k);this.hasDragged=Math.sqrt(Math.pow(o-d,2)+Math.pow(n-e,2));if(this.hasDragged>10){l=b.isInsidePlot(o-h,n-i);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!this.selectionMarker)this.selectionMarker=b.renderer.rect(h,i,f?1:j,g?1:k,0).attr({fill:c.selectionMarkerFill||
	"rgba(69,114,167,0.25)",zIndex:7}).add();this.selectionMarker&&f&&(d-=o,this.selectionMarker.attr({width:M(d),x:(d>0?0:d)+o}));this.selectionMarker&&g&&(d=e-n,this.selectionMarker.attr({height:M(d),y:(d>0?0:d)+n}));l&&!this.selectionMarker&&c.panning&&b.pan(a,c.panning)}},drop:function(a){var b=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={xAxis:[],yAxis:[],originalEvent:a.originalEvent||a},a=this.selectionMarker,e=a.attr?a.attr("x"):a.x,f=a.attr?a.attr("y"):a.y,g=a.attr?a.attr("width"):
	a.width,h=a.attr?a.attr("height"):a.height,i;if(this.hasDragged||c)p(b.axes,function(a){if(a.zoomEnabled){var b=a.horiz,c=a.toValue(b?e:f),b=a.toValue(b?e+g:f+h);!isNaN(c)&&!isNaN(b)&&(d[a.coll].push({axis:a,min:C(c,b),max:v(c,b)}),i=!0)}}),i&&D(b,"selection",d,function(a){b.zoom(q(a,c?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}if(b)G(b.container,{cursor:b._cursor}),b.cancelClick=this.hasDragged>10,b.mouseIsDown=this.hasDragged=this.hasPinched=
	!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){V[oa]&&V[oa].pointer.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,d=b.hoverSeries,a=this.normalize(a,c);c&&d&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)&&this.reset()},onContainerMouseLeave:function(){var a=V[oa];if(a)a.pointer.reset(),a.pointer.chartPosition=
	null},onContainerMouseMove:function(a){var b=this.chart;oa=b.index;a=this.normalize(a);b.mouseIsDown==="mousedown"&&this.drag(a);(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=H(a,"class"))if(c.indexOf(b)!==-1)return!0;else if(c.indexOf("highcharts-container")!==-1)return!1;a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries,c=(a=a.relatedTarget||
	a.toElement)&&a.point&&a.point.series;if(b&&!b.options.stickyTracking&&!this.inClass(a,"highcharts-tooltip")&&c!==b)b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,a=this.normalize(a);a.cancelBubble=!0;b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(D(c.series,"click",q(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(q(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&D(b,"click",a)))},setDOMEvents:function(){var a=
	this,b=a.chart.container;b.onmousedown=function(b){a.onContainerMouseDown(b)};b.onmousemove=function(b){a.onContainerMouseMove(b)};b.onclick=function(b){a.onContainerClick(b)};K(b,"mouseleave",a.onContainerMouseLeave);ab===1&&K(y,"mouseup",a.onDocumentMouseUp);if($a)b.ontouchstart=function(b){a.onContainerTouchStart(b)},b.ontouchmove=function(b){a.onContainerTouchMove(b)},ab===1&&K(y,"touchend",a.onDocumentTouchEnd)},destroy:function(){var a;W(this.chart.container,"mouseleave",this.onContainerMouseLeave);
	ab||(W(y,"mouseup",this.onDocumentMouseUp),W(y,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(a in this)this[a]=null}};q(R.Pointer.prototype,{pinchTranslate:function(a,b,c,d,e,f){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,b,c,d,e,f);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,b,c,d,e,f)},pinchTranslateDirection:function(a,b,c,d,e,f,g,h){var i=this.chart,j=a?"x":"y",k=a?"X":"Y",l="chart"+k,o=a?"width":"height",n=i["plot"+(a?
	"Left":"Top")],s,m,p=h||1,q=i.inverted,x=i.bounds[a?"h":"v"],r=b.length===1,v=b[0][l],u=c[0][l],t=!r&&b[1][l],w=!r&&c[1][l],y,c=function(){!r&&M(v-t)>20&&(p=h||M(u-w)/M(v-t));m=(n-u)/p+v;s=i["plot"+(a?"Width":"Height")]/p};c();b=m;b<x.min?(b=x.min,y=!0):b+s>x.max&&(b=x.max-s,y=!0);y?(u-=0.8*(u-g[j][0]),r||(w-=0.8*(w-g[j][1])),c()):g[j]=[u,w];q||(f[j]=m-n,f[o]=s);f=q?1/p:p;e[o]=s;e[j]=b;d[q?a?"scaleY":"scaleX":"scale"+k]=p;d["translate"+k]=f*n+(u-f*v)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,
	e=b.followTouchMove,f=a.touches,g=f.length,h=b.lastValidTouch,i=b.hasZoom,j=b.selectionMarker,k={},l=g===1&&(b.inClass(a.target,"highcharts-tracker")&&c.runTrackerClick||c.runChartClick),o={};(i||e)&&!l&&a.preventDefault();Ua(f,function(a){return b.normalize(a)});if(a.type==="touchstart")p(f,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),h.x=[d[0].chartX,d[1]&&d[1].chartX],h.y=[d[0].chartY,d[1]&&d[1].chartY],p(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,
	e=a.toPixels(a.dataMin),f=a.toPixels(a.dataMax),g=C(e,f),e=v(e,f);b.min=C(a.pos,g-d);b.max=v(a.pos+a.len,e+d)}});else if(d.length){if(!j)b.selectionMarker=j=q({destroy:sa},c.plotBox);b.pinchTranslate(d,f,k,j,o,h);b.hasPinched=i;b.scaleGroups(k,o);!i&&e&&g===1&&this.runPointActions(b.normalize(a))}},onContainerTouchStart:function(a){var b=this.chart;oa=b.index;a.touches.length===1?(a=this.normalize(a),b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)?(this.runPointActions(a),this.pinch(a)):this.reset()):
	a.touches.length===2&&this.pinch(a)},onContainerTouchMove:function(a){(a.touches.length===1||a.touches.length===2)&&this.pinch(a)},onDocumentTouchEnd:function(a){V[oa]&&V[oa].pointer.drop(a)}});if(I.PointerEvent||I.MSPointerEvent){var ua={},zb=!!I.PointerEvent,Wb=function(){var a,b=[];b.item=function(a){return this[a]};for(a in ua)ua.hasOwnProperty(a)&&b.push({pageX:ua[a].pageX,pageY:ua[a].pageY,target:ua[a].target});return b},Ab=function(a,b,c,d){a=a.originalEvent||a;if((a.pointerType==="touch"||
	a.pointerType===a.MSPOINTER_TYPE_TOUCH)&&V[oa])d(a),d=V[oa].pointer,d[b]({type:c,target:a.currentTarget,preventDefault:sa,touches:Wb()})};q(Wa.prototype,{onContainerPointerDown:function(a){Ab(a,"onContainerTouchStart","touchstart",function(a){ua[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){Ab(a,"onContainerTouchMove","touchmove",function(a){ua[a.pointerId]={pageX:a.pageX,pageY:a.pageY};if(!ua[a.pointerId].target)ua[a.pointerId].target=a.currentTarget})},
	onDocumentPointerUp:function(a){Ab(a,"onContainerTouchEnd","touchend",function(a){delete ua[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,zb?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,zb?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(y,zb?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});Ma(Wa.prototype,"init",function(a,b,c){a.call(this,b,c);(this.hasZoom||this.followTouchMove)&&G(b.container,{"-ms-touch-action":Q,"touch-action":Q})});
	Ma(Wa.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(K)});Ma(Wa.prototype,"destroy",function(a){this.batchMSEvents(W);a.call(this)})}var lb=R.Legend=function(a,b){this.init(a,b)};lb.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=m(b.padding,8),f=b.itemMarginTop||0;this.options=b;if(b.enabled)c.baseline=z(d.fontSize)+3+f,c.itemStyle=d,c.itemHiddenStyle=w(d,b.itemHiddenStyle),c.itemMarginTop=f,c.padding=e,c.initialItemX=e,c.initialItemY=
	e-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.lastLineHeight=0,c.symbolWidth=m(b.symbolWidth,16),c.pages=[],c.render(),K(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:g,h=b?a.legendColor||a.color||"#CCC":g,g=a.options&&a.options.marker,i={fill:h},j;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(j in i.stroke=h,g=a.convertAttribs(g),
	g)d=g[j],d!==t&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;p(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Pa(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},
	positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight;if(b)c=b.translateY,p(this.allItems,function(e){var f=e.checkbox,g;f&&(g=c+f.y+(a||0)+3,G(f,{left:b.translateX+e.checkboxOffset+f.x-20+"px",top:g+"px",display:g>c-6&&g<c+d-6?"":Q}))})},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);
	a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=c},renderItem:function(a){var b=this.chart,c=b.renderer,d=this.options,e=d.layout==="horizontal",f=this.symbolWidth,g=d.symbolPadding,h=this.itemStyle,i=this.itemHiddenStyle,j=this.padding,k=e?m(d.itemDistance,20):0,l=!d.rtl,o=d.width,n=d.itemMarginBottom||0,s=this.itemMarginTop,p=this.initialItemX,q=a.legendItem,r=a.series&&a.series.drawLegendSymbol?a.series:a,x=r.options,x=this.createCheckboxForItem&&
	x&&x.showCheckbox,t=d.useHTML;if(!q)a.legendGroup=c.g("legend-item").attr({zIndex:1}).add(this.scrollGroup),r.drawLegendSymbol(this,a),a.legendItem=q=c.text(d.labelFormat?Ia(d.labelFormat,a):d.labelFormatter.call(a),l?f+g:-g,this.baseline,t).css(w(a.visible?h:i)).attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup),this.setItemEvents&&this.setItemEvents(a,q,t,h,i),this.colorizeItem(a,a.visible),x&&this.createCheckboxForItem(a);c=q.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||
	f+g+c.width+k+(x?20:0);this.itemHeight=g=u(a.legendItemHeight||c.height);if(e&&this.itemX-p+f>(o||b.chartWidth-2*j-p-d.x))this.itemX=p,this.itemY+=s+this.lastLineHeight+n,this.lastLineHeight=0;this.maxItemWidth=v(this.maxItemWidth,f);this.lastItemY=s+this.itemY+n;this.lastLineHeight=v(g,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=f:(this.itemY+=s+g+n,this.lastLineHeight=g);this.offsetWidth=o||v((e?this.itemX-p-k:f)+j,this.offsetWidth)},getAllItems:function(){var a=
	[];p(this.chart.series,function(b){var c=b.options;if(m(c.showInLegend,!r(c.linkedTo)?t:!1,!0))a=a.concat(b.legendItems||(c.legendType==="point"?b.data:b))});return a},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,o=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);
	a.renderTitle();e=a.getAllItems();ob(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;p(e,function(b){a.renderItem(b)});g=j.width||a.offsetWidth;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);if(l||o){g+=k;h+=k;if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp({width:g,height:h})),i.isNew=!1}else a.box=i=c.rect(0,0,g,h,j.borderRadius,l||0).attr({stroke:j.borderColor,
	"stroke-width":l||0,fill:o||Q}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;p(e,function(b){a.positionItem(b)});f&&d.align(q({width:g,height:h},j),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,h,i=this.clipRect,j=e.navigation,k=m(j.animation,!0),l=j.arrowSize||12,o=this.nav,n=this.pages,
	s,q=this.allItems;e.layout==="horizontal"&&(f/=2);g&&(f=C(f,g));n.length=0;if(a>f&&!e.useHTML){this.clipHeight=h=f-20-this.titleHeight-this.padding;this.currentPage=m(this.currentPage,1);this.fullHeight=a;p(q,function(a,b){var c=a._legendItemPos[1],d=u(a.legendItem.getBBox().height),e=n.length;if(!e||c-n[e-1]>h&&(s||c)!==n[e-1])n.push(s||c),e++;b===q.length-1&&c+d-n[e-1]>h&&n.push(c);c!==s&&(s=c)});if(!i)i=b.clipRect=d.clipRect(0,this.padding,9999,0),b.contentGroup.clip(i);i.attr({height:h});if(!o)this.nav=
	o=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,l,l).on("click",function(){b.scroll(-1,k)}).add(o),this.pager=d.text("",15,10).css(j.style).add(o),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,k)}).add(o);b.scroll(0);a=f}else if(o)i.attr({height:c.chartHeight}),o.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pages,d=c.length,e=this.currentPage+a,f=this.clipHeight,g=this.options.navigation,
	h=g.activeColor,g=g.inactiveColor,i=this.pager,j=this.padding;e>d&&(e=d);if(e>0)b!==t&&Qa(b,this.chart),this.nav.attr({translateX:j,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:e===1?g:h}).css({cursor:e===1?"default":"pointer"}),i.attr({text:e+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,fill:e===d?g:h}).css({cursor:e===d?"default":"pointer"}),c=-c[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=e,this.positionCheckboxes(c)}};
	N=R.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.options.symbolHeight||12;b.legendSymbol=this.chart.renderer.rect(0,a.baseline-5-c/2,a.symbolWidth,c,a.options.symbolRadius||0).attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,d;d=a.symbolWidth;var e=this.chart.renderer,f=this.legendGroup,a=a.baseline-u(e.fontMetrics(a.options.itemStyle.fontSize).b*0.3),g;if(b.lineWidth){g={"stroke-width":b.lineWidth};if(b.dashStyle)g.dashstyle=b.dashStyle;this.legendLine=
	e.path(["M",0,a,"L",d,a]).attr(g).add(f)}if(c&&c.enabled!==!1)b=c.radius,this.legendSymbol=d=e.symbol(this.symbol,d/2-b,a-b,2*b,2*b).add(f),d.isMarker=!0}};(/Trident\/7\.0/.test(wa)||Ta)&&Ma(lb.prototype,"positionItem",function(a,b){var c=this,d=function(){b._legendItemPos&&a.call(c,b)};d();setTimeout(d)});Ya.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=w(E,a);c.series=a.series=d;this.userOptions=a;d=c.chart;this.margin=this.splashArray("margin",d);this.spacing=this.splashArray("spacing",
	d);var e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=V.length;V.push(f);ab++;d.reflow!==!1&&K(f,"load",function(){f.initReflow()});if(e)for(g in e)K(f,g,e[g]);f.xAxis=[];f.yAxis=[];f.animation=fa?!1:m(d.animation,!0);f.pointCount=0;f.counters=new Bb;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=F[a.type||b.type||b.defaultSeriesType])||ra(17,!0);b=new b;b.init(this,
	a);return b},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},adjustTickAmounts:function(){this.options.chart.alignTicks!==!1&&p(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.isDirtyBox,j=c.length,k=j,l=this.renderer,o=l.isHidden(),n=[];Qa(a,this);o&&this.cloneRenderTo();for(this.layOutTitles();k--;)if(a=c[k],a.options.stacking&&
	(g=!0,a.isDirty)){h=!0;break}if(h)for(k=j;k--;)if(a=c[k],a.options.stacking)a.isDirty=!0;p(c,function(a){a.isDirty&&a.options.legendType==="point"&&(f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(this.hasCartesianSeries){if(!this.isResizing)this.maxTicks=null,p(b,function(a){a.setScale()});this.adjustTickAmounts();this.getMargins();p(b,function(a){a.isDirty&&(i=!0)});p(b,function(a){if(a.isDirtyExtremes)a.isDirtyExtremes=!1,n.push(function(){D(a,"afterSetExtremes",
	q(a.eventArgs,a.getExtremes()));delete a.eventArgs});(i||g)&&a.redraw()})}i&&this.drawChartBox();p(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset(!0);l.draw();D(this,"redraw");o&&this.cloneRenderTo(!0);p(n,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===
	a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=qa(b.xAxis||{}),b=b.yAxis=qa(b.yAxis||{});p(c,function(a,b){a.index=b;a.isX=!0});p(b,function(a,b){a.index=b});c=c.concat(b);p(c,function(b){new la(a,b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];p(this.series,function(b){a=a.concat(vb(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return vb(this.series,function(a){return a.selected})},getStacks:function(){var a=
	this;p(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});p(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+m(b.options.stack,"")})},setTitle:function(a,b,c){var g;var d=this,e=d.options,f;f=e.title=w(e.title,a);g=e.subtitle=w(e.subtitle,b),e=g;p([["title",a,f],["subtitle",b,e]],function(a){var b=a[0],c=d[b],e=a[1],a=a[2];c&&e&&(d[b]=c=c.destroy());a&&a.text&&!c&&(d[b]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,
	"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c=this.title,d=this.subtitle,e=this.options,f=e.title,e=e.subtitle,g=this.spacingBox.width-44;if(c&&(c.css({width:(f.width||g)+"px"}).align(q({y:15},f),!1,"spacingBox"),!f.floating&&!f.verticalAlign))b=c.getBBox().height;d&&(d.css({width:(e.width||g)+"px"}).align(q({y:b+f.margin},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign&&(b=Ka(b+d.getBBox().height)));c=this.titleOffset!==
	b;this.titleOffset=b;if(!this.isDirtyBox&&c)this.isDirtyBox=c,this.hasRendered&&m(a,!0)&&this.isDirtyBox&&this.redraw()},getChartSize:function(){var a=this.options.chart,b=a.width,a=a.height,c=this.renderToClone||this.renderTo;if(!r(b))this.containerWidth=jb(c,"width");if(!r(a))this.containerHeight=jb(c,"height");this.chartWidth=v(0,b||this.containerWidth||600);this.chartHeight=v(0,m(a,this.containerHeight>19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;
	a?b&&(this.renderTo.appendChild(c),Pa(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),G(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),y.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,c,d,e;this.renderTo=a=b.renderTo;e="highcharts-"+tb++;if(Fa(a))this.renderTo=a=y.getElementById(a);
	a||ra(13,!0);c=z(H(a,"data-highcharts-chart"));!isNaN(c)&&V[c]&&V[c].hasRendered&&V[c].destroy();H(a,"data-highcharts-chart",this.index);a.innerHTML="";!b.skipClone&&!a.offsetWidth&&this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;this.container=a=Y(Ja,{className:"highcharts-container"+(b.className?" "+b.className:""),id:e},q({position:"relative",overflow:"hidden",width:c+"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},
	b.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=b.forExport?new ta(a,c,d,b.style,!0):new Za(a,c,d,b.style);fa&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.spacing,b,c=this.legend,d=this.margin,e=this.options.legend,f=m(e.margin,20),g=e.x,h=e.y,i=e.align,j=e.verticalAlign,k=this.titleOffset;this.resetMargins();b=this.axisOffset;if(k&&!r(d[0]))this.plotTop=v(this.plotTop,k+this.options.title.margin+a[0]);if(c.display&&!e.floating)if(i==="right"){if(!r(d[1]))this.marginRight=
	v(this.marginRight,c.legendWidth-g+f+a[1])}else if(i==="left"){if(!r(d[3]))this.plotLeft=v(this.plotLeft,c.legendWidth+g+f+a[3])}else if(j==="top"){if(!r(d[0]))this.plotTop=v(this.plotTop,c.legendHeight+h+f+a[0])}else if(j==="bottom"&&!r(d[2]))this.marginBottom=v(this.marginBottom,c.legendHeight-h+f+a[2]);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&p(this.axes,function(a){a.getOffset()});r(d[3])||
	(this.plotLeft+=b[3]);r(d[0])||(this.plotTop+=b[0]);r(d[2])||(this.marginBottom+=b[2]);r(d[1])||(this.marginRight+=b[1]);this.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,d=b.renderTo,e=c.width||jb(d,"width"),f=c.height||jb(d,"height"),c=a?a.target:I,d=function(){if(b.container)b.setSize(e,f,!1),b.hasUserSize=null};if(!b.hasUserSize&&e&&f&&(c===I||c===y)){if(e!==b.containerWidth||f!==b.containerHeight)clearTimeout(b.reflowTimeout),a?b.reflowTimeout=setTimeout(d,100):d();b.containerWidth=
	e;b.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};K(I,"resize",b);K(a,"destroy",function(){W(I,"resize",b)})},setSize:function(a,b,c){var d=this,e,f,g;d.isResizing+=1;g=function(){d&&D(d,"endResize",null,function(){d.isResizing-=1})};Qa(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;if(r(a))d.chartWidth=e=v(0,u(a)),d.hasUserSize=!!e;if(r(b))d.chartHeight=f=v(0,u(b));(va?kb:G)(d.container,{width:e+"px",height:f+"px"},va);d.setChartSize(!0);d.renderer.setSize(e,
	f,c);d.maxTicks=null;p(d.axes,function(a){a.isDirty=!0;a.setScale()});p(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(c);d.oldChartHeight=null;D(d,"resize");va===!1?g():setTimeout(g,va&&va.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,g=this.spacing,h=this.clipOffset,i,j,k,l;this.plotLeft=i=u(this.plotLeft);this.plotTop=j=u(this.plotTop);this.plotWidth=
	k=v(0,u(d-i-this.marginRight));this.plotHeight=l=v(0,u(e-j-this.marginBottom));this.plotSizeX=b?l:k;this.plotSizeY=b?k:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:d-g[3]-g[1],height:e-g[0]-g[2]};this.plotBox=c.plotBox={x:i,y:j,width:k,height:l};d=2*T(this.plotBorderWidth/2);b=Ka(v(d,h[3])/2);c=Ka(v(d,h[0])/2);this.clipBox={x:b,y:c,width:T(this.plotSizeX-v(d,h[1])/2-b),height:T(this.plotSizeY-v(d,h[2])/2-c)};a||p(this.axes,function(a){a.setAxisSize();
	a.setAxisTranslation()})},resetMargins:function(){var a=this.spacing,b=this.margin;this.plotTop=m(b[0],a[0]);this.marginRight=m(b[1],a[1]);this.marginBottom=m(b[2],a[2]);this.plotLeft=m(b[3],a[3]);this.axisOffset=[0,0,0,0];this.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,
	o=a.plotBorderWidth||0,n,s=this.plotLeft,m=this.plotTop,p=this.plotWidth,q=this.plotHeight,r=this.plotBox,v=this.clipRect,u=this.clipBox;n=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp({width:c-n,height:d-n}));else{e={fill:j||Q};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(n/2,n/2,c-n,d-n,a.borderRadius,i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)}if(k)f?f.animate(r):this.plotBackground=b.rect(s,m,p,q,0).attr({fill:k}).add().shadow(a.plotShadow);
	if(l)h?h.animate(r):this.plotBGImage=b.image(l,s,m,p,q).add();v?v.animate({width:u.width,height:u.height}):this.clipRect=b.clipRect(u);if(o)g?g.animate(g.crisp({x:s,y:m,width:p,height:q})):this.plotBorder=b.rect(s,m,p,q,0,-o).attr({stroke:a.plotBorderColor,"stroke-width":o,fill:Q,zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;p(["inverted","angular","polar"],function(g){c=F[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];
	for(e=d&&d.length;!f&&e--;)(c=F[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},linkSeries:function(){var a=this,b=a.series;p(b,function(a){a.linkedSeries.length=0});p(b,function(b){var d=b.options.linkedTo;if(Fa(d)&&(d=d===":previous"?a.series[b.index-1]:a.get(d)))d.linkedSeries.push(b),b.linkedParent=d})},renderSeries:function(){p(this.series,function(a){a.translate();a.setTooltipPoints&&a.setTooltipPoints();a.render()})},render:function(){var a=this,b=a.axes,c=a.renderer,d=a.options,e=d.labels,f=
	d.credits,g;a.setTitle();a.legend=new lb(a,d.legend);a.getStacks();p(b,function(a){a.setScale()});a.getMargins();a.maxTicks=null;p(b,function(a){a.setTickPositions(!0);a.setMaxTicks()});a.adjustTickAmounts();a.getMargins();a.drawChartBox();a.hasCartesianSeries&&p(b,function(a){a.render()});if(!a.seriesGroup)a.seriesGroup=c.g("series-group").attr({zIndex:3}).add();a.renderSeries();e.items&&p(e.items,function(b){var d=q(e.style,b.style),f=z(d.left)+a.plotLeft,g=z(d.top)+a.plotTop+12;delete d.left;delete d.top;
	c.text(b.html,f,g).attr({zIndex:2}).css(d).add()});if(f.enabled&&!a.credits)g=f.href,a.credits=c.text(f.text,0,0).on("click",function(){if(g)location.href=g}).attr({align:f.position.align,zIndex:8}).css(f.style).add().align(f.position);a.hasRendered=!0},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;D(a,"destroy");V[a.index]=t;ab--;a.renderTo.removeAttribute("data-highcharts-chart");W(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();
	p("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",W(d),f&&Pa(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!aa&&I==I.top&&y.readyState!=="complete"||fa&&!I.canvg?(fa?Lb.push(function(){a.firstRender()},a.options.global.canvasToolsURL):y.attachEvent("onreadystatechange",
	function(){y.detachEvent("onreadystatechange",a.firstRender);y.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;if(a.isReadyToRender()){a.getContainer();D(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();p(b.series||[],function(b){a.initSeries(b)});a.linkSeries();D(a,"beforeRender");if(R.Pointer)a.pointer=new Wa(a,b);a.render();a.renderer.draw();c&&c.apply(a,[a]);p(a.callbacks,function(b){b.apply(a,[a])});a.cloneRenderTo(!0);
	D(a,"load")}},splashArray:function(a,b){var c=b[a],c=ca(c)?c:[c,c,c,c];return[m(b[a+"Top"],c[0]),m(b[a+"Right"],c[1]),m(b[a+"Bottom"],c[2]),m(b[a+"Left"],c[3])]}};Ya.prototype.callbacks=[];X=R.CenteredSeriesMixin={getCenter:function(){var a=this.options,b=this.chart,c=2*(a.slicedOffset||0),d,e=b.plotWidth-2*c,f=b.plotHeight-2*c,b=a.center,a=[m(b[0],"50%"),m(b[1],"50%"),a.size||"100%",a.innerSize||0],g=C(e,f),h;return Ua(a,function(a,b){h=/%$/.test(a);d=b<2||b===2&&h;return(h?[e,f,g,g][b]*z(a)/100:
	a)+(d?c:0)})}};var Ea=function(){};Ea.prototype={init:function(a,b,c){this.series=a;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.pointValKey,a=Ea.prototype.optionsToObject.call(this,a);q(this,a);this.options=this.options?q(this.options,a):a;if(d)this.y=this[d];if(this.x===
	t&&c)this.x=b===t?c.autoIncrement():b;return this},optionsToObject:function(a){var b={},c=this.series,d=c.pointArrayMap||["y"],e=d.length,f=0,g=0;if(typeof a==="number"||a===null)b[d[0]]=a;else if(La(a)){if(a.length>e){c=typeof a[0];if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];f++}for(;g<e;)b[d[g++]]=a[f++]}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;
	if(b&&(this.setState(),ja(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)W(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a="graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,key:this.name||this.category,series:this.series,
	point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=m(c.valueDecimals,""),e=c.valuePrefix||"",f=c.valueSuffix||"";p(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return Ia(a,{point:this,series:this.series})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&
	this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});D(this,a,b,c)}};var O=function(){};O.prototype={isCartesian:!0,type:"line",pointClass:Ea,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],init:function(a,b){var c=this,d,e,f=a.series,g=function(a,b){return m(a.options.index,a._i)-m(b.options.index,
	b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();q(c,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(fa)b.animation=!1;e=b.events;for(d in e)K(c,d,e[d]);if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();p(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);if(c.isCartesian)a.hasCartesianSeries=!0;f.push(c);c._i=f.length-1;ob(f,g);this.yAxis&&
	ob(this.yAxis.series,g);p(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;p(a.axisTypes||[],function(e){p(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==t&&b[e]===d.id||b[e]===t&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0});!a[e]&&a.optionalAxis!==e&&ra(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments;p(c.parallelArrays,typeof b==="number"?function(d){var f=d==="y"&&c.toYData?c.toYData(a):a[d];
	c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=m(b,a.pointStart,0);this.pointInterval=m(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],c,d=this.points,e=d.length;if(e)if(this.options.connectNulls){for(c=e;c--;)d[c].y===null&&d.splice(c,1);d.length&&(b=[d])}else p(d,function(c,g){c.y===null?(g>a+1&&b.push(d.slice(a+
	1,g)),a=g):g===e-1&&b.push(d.slice(a+1,g+1))});this.segments=b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},e=c[this.type];this.userOptions=a;c=w(e,c.series,a);this.tooltipOptions=w(E.tooltip,E.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);e.marker===null&&delete c.marker;return c},getColor:function(){var a=this.options,b=this.userOptions,c=this.chart.options.colors,d=this.chart.counters,
	e;e=a.color||ba[this.type].color;if(!e&&!a.colorByPoint)r(b._colorIndex)?a=b._colorIndex:(b._colorIndex=d.color,a=d.color++),e=c[a];this.color=e;d.wrapColor(c.length)},getSymbol:function(){var a=this.userOptions,b=this.options.marker,c=this.chart,d=c.options.symbols,c=c.counters;this.symbol=b.symbol;if(!this.symbol)r(a._symbolIndex)?a=a._symbolIndex:(a._symbolIndex=c.symbol,a=c.symbol++),this.symbol=d[a];if(/^url/.test(this.symbol))b.radius=0;c.wrapSymbol(d.length)},drawLegendSymbol:N.drawLineMarker,
	setData:function(a,b,c,d){var e=this,f=e.points,g=f&&f.length||0,h,i=e.options,j=e.chart,k=null,l=e.xAxis,o=l&&!!l.categories,n=e.tooltipPoints,s=i.turboThreshold,q=this.xData,r=this.yData,v=(h=e.pointArrayMap)&&h.length,a=a||[];h=a.length;b=m(b,!0);if(d!==!1&&h&&g===h&&!e.cropped&&!e.hasGroupedData)p(a,function(a,b){f[b].update(a,!1)});else{e.xIncrement=null;e.pointRange=o?1:i.pointRange;e.colorCounter=0;p(this.parallelArrays,function(a){e[a+"Data"].length=0});if(s&&h>s){for(c=0;k===null&&c<h;)k=
	a[c],c++;if(ha(k)){o=m(i.pointStart,0);i=m(i.pointInterval,1);for(c=0;c<h;c++)q[c]=o,r[c]=a[c],o+=i;e.xIncrement=o}else if(La(k))if(v)for(c=0;c<h;c++)i=a[c],q[c]=i[0],r[c]=i.slice(1,v+1);else for(c=0;c<h;c++)i=a[c],q[c]=i[0],r[c]=i[1];else ra(12)}else for(c=0;c<h;c++)if(a[c]!==t&&(i={series:e},e.pointClass.prototype.applyOptions.apply(i,[a[c]]),e.updateParallelArrays(i,c),o&&i.name))l.names[i.x]=i.name;Fa(r[0])&&ra(14,!0);e.data=[];e.options.data=a;for(c=g;c--;)f[c]&&f[c].destroy&&f[c].destroy();
	if(n)n.length=0;if(l)l.minRange=l.userMinRange;e.isDirty=e.isDirtyData=j.isDirtyBox=!0;c=!1}b&&j.redraw(c)},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i=this.options,j=i.cropThreshold,k=0,l=this.isCartesian,o,n;if(l&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(l&&this.sorted&&(!j||d>j||this.forceCrop))if(o=h.min,n=h.max,b[d-1]<o||b[0]>n)b=[],c=[];else if(b[0]<o||b[d-1]>n)e=this.cropData(this.xData,this.yData,o,n),b=e.xData,c=e.yData,
	e=e.start,f=!0,k=b.length;for(d=b.length-1;d>=0;d--)a=b[d]-b[d-1],!f&&b[d]>o&&b[d]<n&&k++,a>0&&(g===t||a<g)?g=a:a<0&&this.requireSorting&&ra(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;this.activePointCount=k;if(i.pointRange===null)this.pointRange=g||1;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,f=0,g=e,h=m(this.cropShoulder,1),i;for(i=0;i<e;i++)if(a[i]>=c){f=v(0,i-h);break}for(;i<e;i++)if(a[i]>d){g=i+h;break}return{xData:a.slice(f,g),yData:b.slice(f,
	g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],o;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(o=0;o<g;o++)i=h+o,j?l[o]=(new f).init(this,[d[o]].concat(qa(e[o]))):(b[i]?k=b[i]:a[i]!==t&&(b[i]=k=(new f).init(this,a[i],d[o])),l[o]=k);if(b&&(g!==(c=b.length)||j))for(o=0;o<c;o++)if(o===h&&!j&&(o+=g),b[o])b[o].destroyElements(),b[o].plotX=
	t;this.data=b;this.points=l},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,e=[],f=0;d=this.xAxis.getExtremes();var g=d.min,h=d.max,i,j,k,l,a=a||this.stackedYData||this.processedYData;d=a.length;for(l=0;l<d;l++)if(j=c[l],k=a[l],i=k!==null&&k!==t&&(!b.isLog||k.length||k>0),j=this.getExtremesFromAll||this.cropped||(c[l+1]||j)>=g&&(c[l-1]||j)<=h,i&&j)if(i=k.length)for(;i--;)k[i]!==null&&(e[f++]=k[i]);else e[f++]=k;this.dataMin=m(void 0,Na(e));this.dataMax=m(void 0,Ba(e))},translate:function(){this.processedXData||
	this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,j=i==="between"||ha(i),k=a.threshold,a=0;a<g;a++){var l=f[a],o=l.x,n=l.y,s=l.low,p=b&&e.stacks[(this.negStacks&&n<k?"-":"")+this.stackKey];if(e.isLog&&n<=0)l.y=n=null;l.plotX=c.translate(o,0,0,0,1,i,this.type==="flags");if(b&&this.visible&&p&&p[o])p=p[o],n=p.points[this.index+","+a],s=n[0],n=n[1],s===0&&(s=m(k,e.min)),
	e.isLog&&s<=0&&(s=null),l.total=l.stackTotal=p.total,l.percentage=p.total&&l.y/p.total*100,l.stackY=n,p.setOffset(this.pointXOffset||0,this.barW||0);l.yBottom=r(s)?e.translate(s,0,1,0,1):null;h&&(n=this.modifyValue(n,l));l.plotY=typeof n==="number"&&n!==Infinity?e.translate(n,0,1,0,1):t;l.clientX=j?c.translate(o,0,0,0,1):l.plotX;l.negative=l.y<(k||0);l.category=d&&d[l.x]!==t?d[l.x]:l.x}this.getSegments()},animate:function(a){var b=this.chart,c=b.renderer,d;d=this.options.animation;var e=this.clipBox||
	b.clipBox,f=b.inverted,g;if(d&&!ca(d))d=ba[this.type].animation;g=["_sharedClip",d.duration,d.easing,e.height].join(",");a?(a=b[g],d=b[g+"m"],a||(b[g]=a=c.clipRect(q(e,{width:0})),b[g+"m"]=d=c.clipRect(-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),this.group.clip(a),this.markerGroup.clip(d),this.sharedClipKey=g):((a=b[g])&&a.animate({width:b.plotSizeX},d),b[g+"m"]&&b[g+"m"].animate({width:b.plotSizeX+99},d),this.animate=null)},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,
	c=this.group,d=this.clipBox;if(c&&this.options.clip!==!1){if(!b||!d)c.clip(d?a.renderer.clipRect(d):a.clipRect);this.markerGroup.clip()}D(this,"afterAnimate");setTimeout(function(){b&&a[b]&&(d||(a[b]=a[b].destroy()),a[b+"m"]&&(a[b+"m"]=a[b+"m"].destroy()))},100)},drawPoints:function(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,j,k;d=this.options.marker;var l=this.pointAttr[""],o,n=this.markerGroup,s=m(d.enabled,this.activePointCount<0.5*this.xAxis.len/d.radius);if(d.enabled!==!1||this._hasPointMarkers)for(f=
	b.length;f--;)if(g=b[f],d=T(g.plotX),e=g.plotY,k=g.graphic,i=g.marker||{},a=s&&i.enabled===t||i.enabled,o=c.isInsidePlot(u(d),e,c.inverted),a&&e!==t&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""]||l,h=a.r,i=m(i.symbol,this.symbol),j=i.indexOf("url")===0,k)k[o?"show":"hide"](!0).animate(q({x:d-h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(o&&(h>0||j))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h).attr(a).add(n)}else if(k)g.graphic=k.destroy()},convertAttribs:function(a,
	b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=m(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=ba[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color;f={stroke:g,fill:g};var h=a.points||[],i,j=[],k,l=a.pointAttrToOptions;k=a.hasPointSpecificOptions;var o=b.negativeColor,n=c.lineColor,s=c.fillColor;i=b.turboThreshold;var m;b.marker?(e.radius=e.radius||c.radius+2,e.lineWidth=e.lineWidth||c.lineWidth+1):e.color=
	e.color||ya(e.color||g).brighten(e.brightness).get();j[""]=a.convertAttribs(c,f);p(["hover","select"],function(b){j[b]=a.convertAttribs(d[b],j[""])});a.pointAttr=j;g=h.length;if(!i||g<i||k)for(;g--;){i=h[g];if((c=i.options&&i.options.marker||i.options)&&c.enabled===!1)c.radius=0;if(i.negative&&o)i.color=i.fillColor=o;k=b.colorByPoint||i.color;if(i.options)for(m in l)r(c[l[m]])&&(k=!0);if(k){c=c||{};k=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker)f.color=f.color||!i.options.color&&e.color||
	ya(i.color).brighten(f.brightness||e.brightness).get();f={color:i.color};if(!s)f.fillColor=i.color;if(!n)f.lineColor=i.color;k[""]=a.convertAttribs(q(f,c),j[""]);k.hover=a.convertAttribs(d.hover,j.hover,k[""]);k.select=a.convertAttribs(d.select,j.select,k[""])}else k=j;i.pointAttr=k}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(wa),d,e,f=a.data||[],g,h,i;D(a,"destroy");W(a);p(a.axisTypes||[],function(b){if(i=a[b])ja(i.series,a),i.isDirty=i.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);
	for(e=f.length;e--;)(g=f[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);p("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","),function(b){a[b]&&(d=c&&b==="group"?"hide":"destroy",a[b][d]())});if(b.hoverSeries===a)b.hoverSeries=null;ja(b.series,a);for(h in a)delete a[h]},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;p(a,function(e,f){var g=e.plotX,h=e.plotY,i;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,
	e,f)):(c.push(f?"L":"M"),d&&f&&(i=a[f-1],d==="right"?c.push(i.plotX,h):d==="center"?c.push((i.plotX+g)/2,i.plotY,(i.plotX+g)/2,h):c.push(g,i.plotY)),c.push(e.plotX,e.plotY))});return c},getGraphPath:function(){var a=this,b=[],c,d=[];p(a.segments,function(e){c=a.getSegmentPath(e);e.length>1?b=b.concat(c):d.push(e[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color]],d=b.lineWidth,e=b.dashStyle,f=b.linecap!=="square",g=this.getGraphPath(),
	h=b.negativeColor;h&&c.push(["graphNeg",h]);p(c,function(c,h){var k=c[0],l=a[k];if(l)bb(l),l.animate({d:g});else if(d&&g.length)l={stroke:c[1],"stroke-width":d,fill:Q,zIndex:1},e?l.dashstyle=e:f&&(l["stroke-linecap"]=l["stroke-linejoin"]="round"),a[k]=a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h&&b.shadow)})},clipNeg:function(){var a=this.options,b=this.chart,c=b.renderer,d=a.negativeColor||a.negativeFillColor,e,f=this.graph,g=this.area,h=this.posClip,i=this.negClip;e=b.chartWidth;var j=
	b.chartHeight,k=v(e,j),l=this.yAxis;if(d&&(f||g)){d=u(l.toPixels(a.threshold||0,!0));d<0&&(k-=d);a={x:0,y:0,width:k,height:d};k={x:0,y:d,width:k,height:k};if(b.inverted)a.height=k.y=b.plotWidth-d,c.isVML&&(a={x:b.plotWidth-d-b.plotLeft,y:0,width:e,height:j},k={x:d+b.plotLeft-e,y:0,width:b.plotLeft+d,height:e});l.reversed?(b=k,e=a):(b=a,e=k);h?(h.animate(b),i.animate(e)):(this.posClip=h=c.clipRect(b),this.negClip=i=c.clipRect(e),f&&this.graphNeg&&(f.clip(h),this.graphNeg.clip(i)),g&&(g.clip(h),this.areaNeg.clip(i)))}},
	invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};p(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)K(c,"resize",a),K(b,"destroy",function(){W(c,"resize",a)}),a(),b.invertGroups=a},plotGroup:function(a,b,c,d,e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(e));f[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;
	if(a.inverted)b=c,c=this.xAxis;return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=(c=d.animation)&&!!a.animate&&b.renderer.isSVG&&m(c.duration,500)||0,f=a.visible?"visible":"hidden",g=d.zIndex,h=a.hasRendered,i=b.seriesGroup;c=a.plotGroup("group","series",f,g,i);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,i);e&&a.animate(!0);a.getAttribs();c.inverted=a.isCartesian?b.inverted:!1;a.drawGraph&&(a.drawGraph(),
	a.clipNeg());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&a.options.enableMouseTracking!==!1&&a.drawTracker();b.inverted&&a.invertGroups();d.clip!==!1&&!a.sharedClipKey&&!h&&c.clip(b.clipRect);e&&a.animate();if(!h)e?a.animationTimeout=setTimeout(function(){a.afterAnimate()},e):a.afterAnimate();a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,
	height:a.plotHeight}),c.animate({translateX:m(d&&d.left,a.plotLeft),translateY:m(e&&e.top,a.plotTop)}));this.translate();this.setTooltipPoints&&this.setTooltipPoints(!0);this.render();b&&D(this,"updatedData")}};Hb.prototype={destroy:function(){Oa(this,this.axis)},render:function(a){var b=this.options,c=b.format,c=c?Ia(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,null,null,b.useHTML).css(b.style).attr({align:this.textAlign,
	rotation:b.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=this.isNegative,g=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=M(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e[this.options.crop===!1||d.isInsidePlot(f.x,f.y)?"show":"hide"](!0)}};la.prototype.buildStacks=function(){var a=
	this.series,b=m(this.options.reversedStacks,!0),c=a.length;if(!this.isXAxis){for(this.usePercentage=!1;c--;)a[b?c:a.length-c-1].setStackedPoints();if(this.usePercentage)for(c=0;c<a.length;c++)a[c].setPercentStacks()}};la.prototype.renderStackTotals=function(){var a=this.chart,b=a.renderer,c=this.stacks,d,e,f=this.stackTotalGroup;if(!f)this.stackTotalGroup=f=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();f.translate(a.plotLeft,a.plotTop);for(d in c)for(e in a=c[d],a)a[e].render(f)};
	O.prototype.setStackedPoints=function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=this.processedXData,b=this.processedYData,c=[],d=b.length,e=this.options,f=e.threshold,g=e.stack,e=e.stacking,h=this.stackKey,i="-"+h,j=this.negStacks,k=this.yAxis,l=k.stacks,o=k.oldStacks,n,m,p,q,r,u;for(q=0;q<d;q++){r=a[q];u=b[q];p=this.index+","+q;m=(n=j&&u<f)?i:h;l[m]||(l[m]={});if(!l[m][r])o[m]&&o[m][r]?(l[m][r]=o[m][r],l[m][r].total=null):l[m][r]=new Hb(k,
	k.options.stackLabels,n,r,g);m=l[m][r];m.points[p]=[m.cum||0];e==="percent"?(n=n?h:i,j&&l[n]&&l[n][r]?(n=l[n][r],m.total=n.total=v(n.total,m.total)+M(u)||0):m.total=da(m.total+(M(u)||0))):m.total=da(m.total+(u||0));m.cum=(m.cum||0)+(u||0);m.points[p].push(m.cum);c[q]=m.cum}if(e==="percent")k.usePercentage=!0;this.stackedYData=c;k.oldStacks={}}};O.prototype.setPercentStacks=function(){var a=this,b=a.stackKey,c=a.yAxis.stacks,d=a.processedXData;p([b,"-"+b],function(b){var e;for(var f=d.length,g,h;f--;)if(g=
	d[f],e=(h=c[b]&&c[b][g])&&h.points[a.index+","+f],g=e)h=h.total?100/h.total:0,g[0]=da(g[0]*h),g[1]=da(g[1]*h),a.stackedYData[f]=g[1]})};q(Ya.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=m(b,!0),D(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;new la(this,w(a,{index:this[e].length,isX:b}));f[e]=qa(f[e]||{});f[e].push(a);m(c,!0)&&this.redraw(d)},showLoading:function(a){var b=
	this.options,c=this.loadingDiv,d=b.loading;if(!c)this.loadingDiv=c=Y(Ja,{className:"highcharts-loading"},q(d.style,{zIndex:10,display:Q}),this.container),this.loadingSpan=Y("span",null,d.labelStyle,c);this.loadingSpan.innerHTML=a||b.lang.loading;if(!this.loadingShown)G(c,{opacity:0,display:"",left:this.plotLeft+"px",top:this.plotTop+"px",width:this.plotWidth+"px",height:this.plotHeight+"px"}),kb(c,{opacity:d.style.opacity},{duration:d.showDuration||0}),this.loadingShown=!0},hideLoading:function(){var a=
	this.options,b=this.loadingDiv;b&&kb(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){G(b,{display:Q})}});this.loadingShown=!1}});q(Ea.prototype,{update:function(a,b,c){var d=this,e=d.series,f=d.graphic,g,h=e.data,i=e.chart,j=e.options,b=m(b,!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);if(ca(a)){e.getAttribs();if(f)a&&a.marker&&a.marker.symbol?d.graphic=f.destroy():f.attr(d.pointAttr[d.state||""]);if(a&&a.dataLabels&&d.dataLabel)d.dataLabel=d.dataLabel.destroy()}g=
	Da(d,h);e.updateParallelArrays(d,g);j.data[g]=d.options;e.isDirty=e.isDirtyData=!0;if(!e.fixedBox&&e.hasCartesianSeries)i.isDirtyBox=!0;j.legendType==="point"&&i.legend.destroyItem(d);b&&i.redraw(c)})},remove:function(a,b){var c=this,d=c.series,e=d.points,f=d.chart,g,h=d.data;Qa(b,f);a=m(a,!0);c.firePointEvent("remove",null,function(){g=Da(c,h);h.length===e.length&&e.splice(g,1);h.splice(g,1);d.options.data.splice(g,1);d.updateParallelArrays(c,"splice",g,1);c.destroy();d.isDirty=!0;d.isDirtyData=
	!0;a&&f.redraw()})}});q(O.prototype,{addPoint:function(a,b,c,d){var e=this.options,f=this.data,g=this.graph,h=this.area,i=this.chart,j=this.xAxis&&this.xAxis.names,k=g&&g.shift||0,l=e.data,o,n=this.xData;Qa(d,i);c&&p([g,h,this.graphNeg,this.areaNeg],function(a){if(a)a.shift=k+1});if(h)h.isArea=!0;b=m(b,!0);d={series:this};this.pointClass.prototype.applyOptions.apply(d,[a]);g=d.x;h=n.length;if(this.requireSorting&&g<n[h-1])for(o=!0;h&&n[h-1]>g;)h--;this.updateParallelArrays(d,"splice",h,0,0);this.updateParallelArrays(d,
	h);if(j)j[g]=d.name;l.splice(h,0,a);o&&(this.data.splice(h,0,null),this.processData());e.legendType==="point"&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(d,"shift"),l.shift()));this.isDirtyData=this.isDirty=!0;b&&(this.getAttribs(),i.redraw())},remove:function(a,b){var c=this,d=c.chart,a=m(a,!0);if(!c.isRemoving)c.isRemoving=!0,D(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();a&&d.redraw(b)});c.isRemoving=
	!1},update:function(a,b){var c=this.chart,d=this.type,e=F[d].prototype,f,a=w(this.userOptions,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);for(f in e)e.hasOwnProperty(f)&&(this[f]=t);q(this,F[a.type||d].prototype);this.init(c,a);m(b,!0)&&c.redraw(!1)}});q(la.prototype,{update:function(a,b){var c=this.chart,a=c.options[this.coll][this.options.index]=w(this.userOptions,a);this.destroy(!0);this._addedPlotLB=t;this.init(c,q(a,{events:t}));c.isDirtyBox=
	!0;m(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);ja(b.axes,this);ja(b[c],this);b.options[c].splice(this.options.index,1);p(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;m(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}});ga=ka(O);F.line=ga;ba.area=w(S,{threshold:0});var pa=ka(O,{type:"area",getSegments:function(){var a=
	[],b=[],c=[],d=this.xAxis,e=this.yAxis,f=e.stacks[this.stackKey],g={},h,i,j=this.points,k=this.options.connectNulls,l,o,n;if(this.options.stacking&&!this.cropped){for(o=0;o<j.length;o++)g[j[o].x]=j[o];for(n in f)f[n].total!==null&&c.push(+n);c.sort(function(a,b){return a-b});p(c,function(a){if(!k||g[a]&&g[a].y!==null)g[a]?b.push(g[a]):(h=d.translate(a),l=f[a].percent?f[a].total?f[a].cum*100/f[a].total:0:f[a].cum,i=e.toPixels(l,!0),b.push({y:null,plotX:h,clientX:h,plotY:i,yBottom:i,onMouseOver:sa}))});
	b.length&&a.push(b)}else O.prototype.getSegments.call(this),a=this.segments;this.segments=a},getSegmentPath:function(a){var b=O.prototype.getSegmentPath.call(this,a),c=[].concat(b),d,e=this.options;d=b.length;var f=this.yAxis.getThreshold(e.threshold),g;d===3&&c.push("L",b[1],b[2]);if(e.stacking&&!this.closedStacks)for(d=a.length-1;d>=0;d--)g=m(a[d].yBottom,f),d<a.length-1&&e.step&&c.push(a[d+1].plotX,g),c.push(a[d].plotX,g);else this.closeSegment(c,a,f);this.areaPath=this.areaPath.concat(c);return b},
	closeSegment:function(a,b,c){a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=[];O.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=c.negativeColor,e=c.negativeFillColor,f=[["area",this.color,c.fillColor]];(d||e)&&f.push(["areaNeg",d,e]);p(f,function(d){var e=d[0],f=a[e];f?f.animate({d:b}):a[e]=a.chart.renderer.path(b).attr({fill:m(d[2],ya(d[1]).setOpacity(m(c.fillOpacity,0.75)).get()),zIndex:0}).add(a.group)})},drawLegendSymbol:N.drawRectangle});
	F.area=pa;ba.spline=w(S);ga=ka(O,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],g=a[c+1],h,i,j,k;if(f&&g){a=f.plotY;j=g.plotX;var g=g.plotY,l;h=(1.5*d+f.plotX)/2.5;i=(1.5*e+a)/2.5;j=(1.5*d+j)/2.5;k=(1.5*e+g)/2.5;l=(k-i)*(j-d)/(j-h)+e-k;i+=l;k+=l;i>a&&i>e?(i=v(a,e),k=2*e-i):i<a&&i<e&&(i=C(a,e),k=2*e-i);k>g&&k>e?(k=v(g,e),i=2*e-k):k<g&&k<e&&(k=C(g,e),i=2*e-k);b.rightContX=j;b.rightContY=k}c?(b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,h||d,i||e,d,e],f.rightContX=
	f.rightContY=null):b=["M",d,e];return b}});F.spline=ga;ba.areaspline=w(ba.area);pa=pa.prototype;ga=ka(ga,{type:"areaspline",closedStacks:!0,getSegmentPath:pa.getSegmentPath,closeSegment:pa.closeSegment,drawGraph:pa.drawGraph,drawLegendSymbol:N.drawRectangle});F.areaspline=ga;ba.column=w(S,{borderColor:"#FFFFFF",borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1,halo:!1},select:{color:"#C0C0C0",borderColor:"#000000",
	shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:!1,tooltip:{distance:6},threshold:0});ga=ka(O,{type:"column",pointAttrToOptions:{stroke:"borderColor",fill:"color",r:"borderRadius"},cropShoulder:0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){O.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&p(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=
	c.reversed,f,g={},h,i=0;b.grouping===!1?i=1:p(a.chart.series,function(b){var c=b.options,e=b.yAxis;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?(f=b.stackKey,g[f]===t&&(g[f]=i++),h=g[f]):c.grouping!==!1&&(h=i++),b.columnIndex=h});var c=C(M(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||c.tickInterval||1),c.len),j=c*b.groupPadding,k=(c-2*j)/i,l=b.pointWidth,b=r(l)?(k-l)/2:k*b.pointPadding,l=m(l,k-2*b);return a.columnMetrics={width:l,offset:b+(j+((e?i-(a.columnIndex||
	0):a.columnIndex)||0)*k-c/2)*(e?-1:1)}},translate:function(){var a=this,b=a.chart,c=a.options,d=a.borderWidth=m(c.borderWidth,a.activePointCount>0.5*a.xAxis.len?0:1),e=a.yAxis,f=a.translatedThreshold=e.getThreshold(c.threshold),g=m(c.minPointLength,5),c=a.getColumnMetrics(),h=c.width,i=a.barW=Ka(v(h,1+2*d)),j=a.pointXOffset=c.offset,k=-(d%2?0.5:0),l=d%2?0.5:1;b.renderer.isVML&&b.inverted&&(l+=1);O.prototype.translate.apply(a);p(a.points,function(c){var d=m(c.yBottom,f),p=C(v(-999-d,c.plotY),e.len+
	999+d),q=c.plotX+j,r=i,t=C(p,d),x;x=v(p,d)-t;M(x)<g&&g&&(x=g,t=u(M(t-f)>g?d-g:f-(e.translate(c.y,0,1,0,1)<=f?g:0)));c.barX=q;c.pointWidth=h;c.tooltipPos=b.inverted?[e.len-p,a.xAxis.len-q-r/2]:[q+r/2,p];d=M(q)<0.5;r=u(q+r)+k;q=u(q)+k;r-=q;p=M(t)<0.5;x=u(t+x)+l;t=u(t)+l;x-=t;d&&(q+=1,r-=1);p&&(t-=1,x+=1);c.shapeType="rect";c.shapeArgs={x:q,y:t,width:r,height:x}})},getSymbol:sa,drawLegendSymbol:N.drawRectangle,drawGraph:sa,drawPoints:function(){var a=this,b=this.chart,c=a.options,d=b.renderer,e=c.animationLimit||
	250,f,g,h;p(a.points,function(i){var j=i.plotY,k=i.graphic;if(j!==t&&!isNaN(j)&&i.y!==null)f=i.shapeArgs,h=r(a.borderWidth)?{"stroke-width":a.borderWidth}:{},g=i.pointAttr[i.selected?"select":""]||a.pointAttr[""],k?(bb(k),k.attr(h)[b.pointCount<e?"animate":"attr"](w(f))):i.graphic=d[i.shapeType](f).attr(g).attr(h).add(a.group).shadow(c.shadow,null,c.stacking&&!c.borderRadius);else if(k)i.graphic=k.destroy()})},animate:function(a){var b=this.yAxis,c=this.options,d=this.chart.inverted,e={};if(aa)a?
	(e.scaleY=0.001,a=C(b.pos+b.len,v(b.pos,b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&p(b.series,function(b){if(b.type===a.type)b.isDirty=!0});O.prototype.remove.apply(a,arguments)}});F.column=ga;ba.bar=w(ba.column);pa=ka(ga,{type:"bar",inverted:!0});F.bar=pa;ba.scatter=w(S,{lineWidth:0,tooltip:{headerFormat:'<span style="color:{series.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
	pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"},stickyTracking:!1});pa=ka(O,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["markerGroup"],takeOrdinalPosition:!1,singularTooltips:!0,drawGraph:function(){this.options.lineWidth&&O.prototype.drawGraph.call(this)}});F.scatter=pa;ba.pie=w(S,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.name}},ignoreHiddenPoint:!0,
	legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});S={type:"pie",isCartesian:!1,pointClass:ka(Ea,{init:function(){Ea.prototype.init.apply(this,arguments);var a=this,b;if(a.y<0)a.y=null;q(a,{visible:a.visible!==!1,name:m(a.name,"Slice")});b=function(b){a.slice(b.type==="select")};K(a,"select",b);K(a,"unselect",b);return a},setVisible:function(a){var b=this,c=b.series,d=c.chart;b.visible=b.options.visible=
	a=a===t?!b.visible:a;c.options.data[Da(b,c.data)]=b.options;p(["graphic","dataLabel","connector","shadowGroup"],function(c){if(b[c])b[c][a?"show":"hide"](!0)});b.legendItem&&d.legend.colorizeItem(b,a);if(!c.isDirty&&c.options.ignoreHiddenPoint)c.isDirty=!0,d.redraw()},slice:function(a,b,c){var d=this.series;Qa(c,d.chart);m(b,!0);this.sliced=this.options.sliced=a=r(a)?a:!this.sliced;d.options.data[Da(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);
	this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var b=this.shapeArgs,c=this.series.chart;return this.series.chart.renderer.symbols.arc(c.plotLeft+b.x,c.plotTop+b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}}),requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},singularTooltips:!0,getColor:sa,animate:function(a){var b=this,c=b.points,d=
	b.startAngleRad;if(!a)p(c,function(a){var c=a.graphic,a=a.shapeArgs;c&&(c.attr({r:b.center[3]/2,start:d,end:d}),c.animate({r:a.r,start:a.start,end:a.end},b.options.animation))}),b.animate=null},setData:function(a,b,c,d){O.prototype.setData.call(this,a,!1,c,d);this.processData();this.generatePoints();m(b,!0)&&this.chart.redraw(c)},generatePoints:function(){var a,b=0,c,d,e,f=this.options.ignoreHiddenPoint;O.prototype.generatePoints.call(this);c=this.points;d=c.length;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?
	0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=b>0?e.y/b*100:0,e.total=b},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=c.startAngle||0,j=this.startAngleRad=ma/180*(i-90),i=(this.endAngleRad=ma/180*(m(c.endAngle,i+360)-90))-j,k=this.points,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,o,n=k.length,p;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=U.asin(C((b-a[1])/(a[2]/2+l),1));return a[0]+(c?-1:1)*Z(h)*(a[2]/
	2+l)};for(o=0;o<n;o++){p=k[o];f=j+b*i;if(!c||p.visible)b+=p.percentage/100;g=j+b*i;p.shapeType="arc";p.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:u(f*1E3)/1E3,end:u(g*1E3)/1E3};h=(g+f)/2;h>1.5*ma?h-=2*ma:h<-ma/2&&(h+=2*ma);p.slicedTranslation={translateX:u(Z(h)*d),translateY:u(ea(h)*d)};f=Z(h)*a[2]/2;g=ea(h)*a[2]/2;p.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];p.half=h<-ma/2||h>ma/2?1:0;p.angle=h;e=C(e,l/2);p.labelPos=[a[0]+f+Z(h)*l,a[1]+g+ea(h)*l,a[0]+f+Z(h)*e,a[1]+g+ea(h)*e,a[0]+f,a[1]+g,l<0?
	"center":p.half?"right":"left",h]}},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);p(a.points,function(h){d=h.graphic;g=h.shapeArgs;f=h.shadowGroup;if(e&&!f)f=h.shadowGroup=b.g("shadow").add(a.shadowGroup);c=h.sliced?h.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);d?d.animate(q(g,c)):h.graphic=d=b[h.shapeType](g).setRadialReference(a.center).attr(h.pointAttr[h.selected?"select":
	""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(e,f);h.visible!==void 0&&h.setVisible(h.visible)})},sortByAngle:function(a,b){a.sort(function(a,d){return a.angle!==void 0&&(d.angle-a.angle)*b})},drawLegendSymbol:N.drawRectangle,getCenter:X.getCenter,getSymbol:sa};S=ka(O,S);F.pie=S;O.prototype.drawDataLabels=function(){var a=this,b=a.options,c=b.cursor,d=b.dataLabels,e=a.points,f,g,h,i;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),i=a.plotGroup("dataLabelsGroup",
	"data-labels","hidden",d.zIndex||6),!a.hasRendered&&m(d.defer,!0)&&(i.attr({opacity:0}),K(a,"afterAnimate",function(){a.dataLabelsGroup.show()[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),g=d,p(e,function(b){var e,l=b.dataLabel,o,n,p=b.connector,u=!0;f=b.options&&b.options.dataLabels;e=m(f&&f.enabled,g.enabled);if(l&&!e)b.dataLabel=l.destroy();else if(e){d=w(g,f);e=d.rotation;o=b.getLabelConfig();h=d.format?Ia(d.format,o):d.formatter.call(o,d);d.style.color=m(d.color,d.style.color,
	a.color,"black");if(l)if(r(h))l.attr({text:h}),u=!1;else{if(b.dataLabel=l=l.destroy(),p)b.connector=p.destroy()}else if(r(h)){l={fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:e,padding:d.padding,zIndex:1};for(n in l)l[n]===t&&delete l[n];l=b.dataLabel=a.chart.renderer[e?"text":"label"](h,0,-999,null,null,null,d.useHTML).attr(l).css(q(d.style,c&&{cursor:c})).add(i).shadow(d.shadow)}l&&a.alignDataLabel(b,l,d,null,u)}})};O.prototype.alignDataLabel=
	function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=m(a.plotX,-999),i=m(a.plotY,-999),j=b.getBBox();if(a=this.visible&&(a.series.forceDL||f.isInsidePlot(h,u(i),g)||d&&f.isInsidePlot(h,g?d.x+1:d.y+d.height-1,g)))d=q({x:g?f.plotWidth-i:h,y:u(g?f.plotHeight-h:i),width:0,height:0},d),q(c,{width:j.width,height:j.height}),c.rotation?(g={align:c.align,x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](g)):(b.align(c,null,d),g=b.alignAttr,m(c.overflow,"justify")==="justify"?this.justifyDataLabel(b,
	c,g,j,d,e):m(c.crop,!0)&&(a=f.isInsidePlot(g.x,g.y)&&f.isInsidePlot(g.x+j.width,g.y+j.height)));if(!a)b.attr({y:-999}),b.placed=!1};O.prototype.justifyDataLabel=function(a,b,c,d,e,f){var g=this.chart,h=b.align,i=b.verticalAlign,j,k;j=c.x;if(j<0)h==="right"?b.align="left":b.x=-j,k=!0;j=c.x+d.width;if(j>g.plotWidth)h==="left"?b.align="right":b.x=g.plotWidth-j,k=!0;j=c.y;if(j<0)i==="bottom"?b.verticalAlign="top":b.y=-j,k=!0;j=c.y+d.height;if(j>g.plotHeight)i==="top"?b.verticalAlign="bottom":b.y=g.plotHeight-
	j,k=!0;if(k)a.placed=!f,a.align(b,null,e)};if(F.pie)F.pie.prototype.drawDataLabels=function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=m(e.connectorPadding,10),g=m(e.connectorWidth,1),h=d.plotWidth,d=d.plotHeight,i,j,k=m(e.softConnector,!0),l=e.distance,o=a.center,n=o[2]/2,q=o[1],r=l>0,t,w,x,y,z=[[],[]],A,C,G,D,B,F=[0,0,0,0],N=function(a,b){return b.y-a.y};if(a.visible&&(e.enabled||a._hasPointLabels)){O.prototype.drawDataLabels.apply(a);p(b,function(a){a.dataLabel&&a.visible&&z[a.half].push(a)});
	for(D=0;!y&&b[D];)y=b[D]&&b[D].dataLabel&&(b[D].dataLabel.getBBox().height||21),D++;for(D=2;D--;){var b=[],K=[],H=z[D],I=H.length,E;a.sortByAngle(H,D-0.5);if(l>0){for(B=q-n-l;B<=q+n+l;B+=y)b.push(B);w=b.length;if(I>w){c=[].concat(H);c.sort(N);for(B=I;B--;)c[B].rank=B;for(B=I;B--;)H[B].rank>=w&&H.splice(B,1);I=H.length}for(B=0;B<I;B++){c=H[B];x=c.labelPos;c=9999;var Q,P;for(P=0;P<w;P++)Q=M(b[P]-x[1]),Q<c&&(c=Q,E=P);if(E<B&&b[B]!==null)E=B;else for(w<I-B+E&&b[B]!==null&&(E=w-I+B);b[E]===null;)E++;K.push({i:E,
	y:b[E]});b[E]=null}K.sort(N)}for(B=0;B<I;B++){c=H[B];x=c.labelPos;t=c.dataLabel;G=c.visible===!1?"hidden":"visible";c=x[1];if(l>0){if(w=K.pop(),E=w.i,C=w.y,c>C&&b[E+1]!==null||c<C&&b[E-1]!==null)C=c}else C=c;A=e.justify?o[0]+(D?-1:1)*(n+l):a.getX(E===0||E===b.length-1?c:C,D);t._attr={visibility:G,align:x[6]};t._pos={x:A+e.x+({left:f,right:-f}[x[6]]||0),y:C+e.y-10};t.connX=A;t.connY=C;if(this.options.size===null)w=t.width,A-w<f?F[3]=v(u(w-A+f),F[3]):A+w>h-f&&(F[1]=v(u(A+w-h+f),F[1])),C-y/2<0?F[0]=
	v(u(-C+y/2),F[0]):C+y/2>d&&(F[2]=v(u(C+y/2-d),F[2]))}}if(Ba(F)===0||this.verifyDataLabelOverflow(F))this.placeDataLabels(),r&&g&&p(this.points,function(b){i=b.connector;x=b.labelPos;if((t=b.dataLabel)&&t._pos)G=t._attr.visibility,A=t.connX,C=t.connY,j=k?["M",A+(x[6]==="left"?5:-5),C,"C",A,C,2*x[2]-x[4],2*x[3]-x[5],x[2],x[3],"L",x[4],x[5]]:["M",A+(x[6]==="left"?5:-5),C,"L",x[2],x[3],"L",x[4],x[5]],i?(i.animate({d:j}),i.attr("visibility",G)):b.connector=i=a.chart.renderer.path(j).attr({"stroke-width":g,
	stroke:e.connectorColor||b.color||"#606060",visibility:G}).add(a.dataLabelsGroup);else if(i)b.connector=i.destroy()})}},F.pie.prototype.placeDataLabels=function(){p(this.points,function(a){var a=a.dataLabel,b;if(a)(b=a._pos)?(a.attr(a._attr),a[a.moved?"animate":"attr"](b),a.moved=!0):a&&a.attr({y:-999})})},F.pie.prototype.alignDataLabel=sa,F.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,e=c=c.minSize||80,f;d[0]!==null?e=v(b[2]-v(a[1],a[3]),c):(e=v(b[2]-
	a[1]-a[3],c),b[0]+=(a[3]-a[1])/2);d[1]!==null?e=v(C(e,b[2]-v(a[0],a[2])),c):(e=v(C(e,b[2]-a[0]-a[2]),c),b[1]+=(a[0]-a[2])/2);e<b[2]?(b[2]=e,this.translate(b),p(this.points,function(a){if(a.dataLabel)a.dataLabel._pos=null}),this.drawDataLabels&&this.drawDataLabels()):f=!0;return f};if(F.column)F.column.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=a.dlBox||a.shapeArgs,i=a.below||a.plotY>m(this.translatedThreshold,f.plotSizeY),j=m(c.inside,!!this.options.stacking);if(h&&
	(d=w(h),g&&(d={x:f.plotWidth-d.y-d.height,y:f.plotHeight-d.x-d.width,width:d.height,height:d.width}),!j))g?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0);c.align=m(c.align,!g||j?"center":i?"right":"left");c.verticalAlign=m(c.verticalAlign,g||j?"middle":i?"top":"bottom");O.prototype.alignDataLabel.call(this,a,b,c,d,e)};S=R.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(c){var d=c.target,e;if(b.hoverSeries!==a)a.onMouseOver();
	for(;d&&!e;)e=d.point,d=d.parentNode;if(e!==t&&e!==b.hoverPoint)e.onMouseOver(c)};p(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});if(!a._hasTracking)p(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),$a))a[b].on("touchstart",f)}),a._hasTracking=!0},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:
	a.graphPath),e=d.length,f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,j=a.tracker,k=b.cursor,l=k&&{cursor:k},k=a.singlePoints,m,n=function(){if(f.hoverSeries!==a)a.onMouseOver()},q="rgba(192,192,192,"+(aa?1.0E-4:0.002)+")";if(e&&!c)for(m=e+1;m--;)d[m]==="M"&&d.splice(m+1,0,d[m+1]-i,d[m+2],"L"),(m&&d[m]==="M"||m===e)&&d.splice(m,0,"L",d[m-2]+i,d[m-1]);for(m=0;m<k.length;m++)e=k[m],d.push("M",e.plotX-i,e.plotY,"L",e.plotX+i,e.plotY);j?j.attr({d:d}):(a.tracker=h.path(d).attr({"stroke-linejoin":"round",
	visibility:a.visible?"visible":"hidden",stroke:q,fill:c?q:Q,"stroke-width":b.lineWidth+(c?0:2*i),zIndex:2}).add(a.group),p([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",n).on("mouseout",function(a){g.onTrackerMouseOut(a)}).css(l);if($a)a.on("touchstart",n)}))}};if(F.column)ga.prototype.drawTracker=S.drawTrackerPoint;if(F.pie)F.pie.prototype.drawTracker=S.drawTrackerPoint;if(F.scatter)pa.prototype.drawTracker=S.drawTrackerPoint;q(lb.prototype,{setItemEvents:function(a,
	b,c,d,e){var f=this;(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");b.css(f.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d:e);a.setState()}).on("click",function(b){var c=function(){a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):D(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=Y("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);
	K(a.checkbox,"click",function(b){D(a,"checkboxClick",{checked:b.target.checked},function(){a.select()})})}});E.legend.itemStyle.cursor="pointer";q(Ya.prototype,{showResetZoom:function(){var a=this,b=E.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo==="chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=
	this;D(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?p(this.axes,function(a){b=a.zoom()}):p(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&ca(e))this.resetZoomButton=e.destroy();b&&this.redraw(m(this.options.chart.animation,a&&a.animation,this.pointCount<
	100))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&p(d,function(a){a.setState()});p(b==="xy"?[1,0]:[1],function(b){var d=a[b?"chartX":"chartY"],h=c[b?"xAxis":"yAxis"][0],i=c[b?"mouseDownX":"mouseDownY"],j=(h.pointRange||0)/2,k=h.getExtremes(),l=h.toValue(i-d,!0)+j,i=h.toValue(i+c[b?"plotWidth":"plotHeight"]-d,!0)-j;h.series.length&&l>C(k.dataMin,k.min)&&i<v(k.dataMax,k.max)&&(h.setExtremes(l,i,!1,!1,{trigger:"pan"}),e=!0);c[b?"mouseDownX":"mouseDownY"]=d});e&&c.redraw(!1);G(c.container,{cursor:"move"})}});
	q(Ea.prototype,{select:function(a,b){var c=this,d=c.series,e=d.chart,a=m(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[Da(c,d.data)]=c.options;c.setState(a&&"select");b||p(e.getSelectedPoints(),function(a){if(a.selected&&a!==c)a.selected=a.options.selected=!1,d.options.data[Da(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(a){var b=this.series,c=b.chart,d=c.tooltip,e=c.hoverPoint;
	if(e&&e!==this)e.onMouseOut();this.firePointEvent("mouseOver");d&&(!d.shared||b.noSharedTooltip)&&d.refresh(this,a);this.setState("hover");c.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;if(!b||Da(this,b)===-1)this.firePointEvent("mouseOut"),this.setState(),a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var a=w(this.series.options.point,this.options).events,b;this.events=a;for(b in a)K(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,
	b){var c=this.plotX,d=this.plotY,e=this.series,f=e.options.states,g=ba[e.type].marker&&e.options.marker,h=g&&!g.enabled,i=g&&g.states[a],j=i&&i.enabled===!1,k=e.stateMarkerGraphic,l=this.marker||{},m=e.chart,n=e.halo,p,a=a||"";p=this.pointAttr[a]||e.pointAttr[a];if(!(a===this.state&&!b||this.selected&&a!=="select"||f[a]&&f[a].enabled===!1||a&&(j||h&&i.enabled===!1)||a&&l.states&&l.states[a]&&l.states[a].enabled===!1)){if(this.graphic)g=g&&this.graphic.symbolName&&p.r,this.graphic.attr(w(p,g?{x:c-
	g,y:d-g,width:2*g,height:2*g}:{})),k&&k.hide();else{if(a&&i)if(g=i.radius,l=l.symbol||e.symbol,k&&k.currentSymbol!==l&&(k=k.destroy()),k)k[b?"animate":"attr"]({x:c-g,y:d-g});else if(l)e.stateMarkerGraphic=k=m.renderer.symbol(l,c-g,d-g,2*g,2*g).attr(p).add(e.markerGroup),k.currentSymbol=l;if(k)k[a&&m.isInsidePlot(c,d,m.inverted)?"show":"hide"]()}if((c=f[a]&&f[a].halo)&&c.size){if(!n)e.halo=n=m.renderer.path().add(e.seriesGroup);n.attr(q({fill:ya(this.color||e.color).setOpacity(c.opacity).get()},c.attributes))[b?
	"animate":"attr"]({d:this.haloPath(c.size)})}else n&&n.attr({d:[]});this.state=a}},haloPath:function(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted;return c.renderer.symbols.circle(d.translateX+(e?b.yAxis.len-this.plotY:this.plotX)-a,d.translateY+(e?b.xAxis.len-this.plotX:this.plotY)-a,a*2,a*2)}});q(O.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&D(this,"mouseOver");this.setState("hover");a.hoverSeries=
	this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;if(d)d.onMouseOut();this&&a.events.mouseOut&&D(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&c.hide();this.setState();b.hoverSeries=null},setState:function(a){var b=this.options,c=this.graph,d=this.graphNeg,e=b.states,b=b.lineWidth,a=a||"";if(this.state!==a)this.state=a,e[a]&&e[a].enabled===!1||(a&&(b=e[a].lineWidth||b+1),c&&!c.dashstyle&&(a={"stroke-width":b},c.attr(a),d&&d.attr(a)))},
	setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===t?!h:a)?"show":"hide";p(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&p(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});p(c.linkedSeries,function(b){b.setVisible(a,!1)});if(g)d.isDirtyBox=!0;
	b!==!1&&d.redraw();D(c,f)},setTooltipPoints:function(a){var b=[],c,d,e=this.xAxis,f=e&&e.getExtremes(),g=e?e.tooltipLen||e.len:this.chart.plotSizeX,h,i,j=[];if(!(this.options.enableMouseTracking===!1||this.singularTooltips)){if(a)this.tooltipPoints=null;p(this.segments||this.points,function(a){b=b.concat(a)});e&&e.reversed&&(b=b.reverse());this.orderTooltipPoints&&this.orderTooltipPoints(b);a=b.length;for(i=0;i<a;i++)if(e=b[i],c=e.x,c>=f.min&&c<=f.max){h=b[i+1];c=d===t?0:d+1;for(d=b[i+1]?C(v(0,T((e.clientX+
	(h?h.wrappedClientX||h.clientX:g))/2)),g):g;c>=0&&c<=d;)j[c++]=e}this.tooltipPoints=j}},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===t?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;D(this,a?"select":"unselect")},drawTracker:S.drawTrackerGraph});q(R,{Axis:la,Chart:Ya,Color:ya,Point:Ea,Tick:Sa,Renderer:Za,Series:O,SVGElement:P,SVGRenderer:ta,arrayMin:Na,arrayMax:Ba,charts:V,dateFormat:cb,format:Ia,pathAnim:ub,getOptions:function(){return E},
	hasBidiBug:Nb,isTouchDevice:Jb,numberFormat:Ga,seriesTypes:F,setOptions:function(a){E=w(!0,E,a);Cb();return E},addEvent:K,removeEvent:W,createElement:Y,discardElement:Pa,css:G,each:p,extend:q,map:Ua,merge:w,pick:m,splat:qa,extendClass:ka,pInt:z,wrap:Ma,svg:aa,canvas:fa,vml:!aa&&!fa,product:"Highcharts",version:"4.0.1"})})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Sand-Signika theme for Highcharts JS
	 * @author Torstein Honsi
	 */



	// Add the background image to the container
	Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
		proceed.call(this);
		this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
	});


	Highcharts.theme = {
		colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
			"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		chart: {
			backgroundColor: null,
			style: {
				fontFamily: "Signika, serif"
			}
		},
		title: {
			style: {
				color: 'black',
				fontSize: '16px',
				fontWeight: 'bold'
			}
		},
		subtitle: {
			style: {
				color: 'black'
			}
		},
		tooltip: {
			borderWidth: 0
		},
		legend: {
			itemStyle: {
				fontWeight: 'bold',
				fontSize: '13px'
			}
		},
		xAxis: {
			labels: {
				style: {
					color: '#6e6e70'
				}
			}
		},
		yAxis: {
			labels: {
				style: {
					color: '#6e6e70'
				}
			}
		},
		plotOptions: {
			series: {
				shadow: true
			},
			candlestick: {
				lineColor: '#404048'
			}
		},

		// Highstock specific
		navigator: {
			xAxis: {
				gridLineColor: '#D0D0D8'
			}
		},
		rangeSelector: {
			buttonTheme: {
				fill: 'white',
				stroke: '#C0C0C8',
				'stroke-width': 1,
				states: {
					select: {
						fill: '#D0D0D8'
					}
				}
			}
		},
		scrollbar: {
			trackBorderColor: '#C0C0C8'
		},

		// General
		background2: '#E0E0E8'
		
	};

	// Apply the theme
	Highcharts.setOptions(Highcharts.theme);


/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="' +
	((__t = (it.id || '' )) == null ? '' : __t) +
	'">\r\n  <div class="modal-backdrop fade"></div>\r\n  <div class="modal-dialog">\r\n    <div class="modal-content">\r\n\r\n      <div class="modal-header">\r\n        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" data-event-click="close">×</span><span class="sr-only">Close</span></button>\r\n        <h4 class="modal-title">' +
	((__t = (it.header)) == null ? '' : __t) +
	'</h4>\r\n      </div>\r\n      <div class="modal-body">\r\n        ' +
	((__t = (it.body)) == null ? '' : __t) +
	'\r\n      </div>\r\n      <div class="modal-footer">\r\n        <button type="button" class="btn btn-default" data-event-click="close">Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>';

	}
	return __p
	}

/***/ }

});