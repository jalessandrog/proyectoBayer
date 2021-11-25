const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-inventariobayer.alwaysdata.net', //ip de la instancia
    user: '250337', 
    database: 'inventariobayer_2021',
    password: 'Ges76!*t!9O!n?S'
});

module.exports = pool.promise();