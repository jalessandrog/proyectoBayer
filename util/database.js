const mysql = require('mysql2');

 const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'proy_bayer',
    password: ''
});

module.exports = pool.promise();