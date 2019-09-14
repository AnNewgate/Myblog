var mysql = require('mysql');

// var connection = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: 'root12345',
//             port: '3306',
//             database: 'myblog'
// });

var pool  = mysql.createPool({
    connectionLimit : 50,
    host     : 'localhost',
    user     : 'root',
    password : 'root12345',
    database : 'myblog',
});

// exports.mysqlconnect = connection;
exports.mysqlconnect = pool;