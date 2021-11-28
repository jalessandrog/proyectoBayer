const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-inventario-bayer.alwaysdata.net', 
    user: '250640', 
    database: 'inventario-bayer_21',
    password: 'Ges76!*t!9O!n?S'
});


module.exports = pool.promise();