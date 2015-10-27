var mysql = require('mysql');

//var pool = mysql.createPool({
//    connectionLimit : 10,
//    host            : '10.198.30.62:4250',
//    user            : 'badjs',
//    password        : 'pass4badjs'
//});
//
//
//pool.getConnection(function(err, connection){
//    console.log(arguments);
//});

var connection = mysql.createConnection('mysql://badjs:pass4badjs@10.198.30.62:4250/badjs');

connection.connect(function(err){
    console.log(err)
});
//
var x = {"18":129043,"19":636,"20":11,"21":14498,"22":32924,"24":10082,"25":264,"27":19,"30":596,"32":2827,"33":194138,"34":7075,"36":7826,"38":6100,"40":7660,"41":15663,"42":9113,"44":9727,"46":46637,"47":21009,"51":290014}
for(var i in x){
    connection.query('update b_statistics set total = '+ x[i] +' where projectId = '+ i +' && startDate="2015-09-24 00:00:00";', function(err, rows){
        console.log(err, rows);
    });
}



