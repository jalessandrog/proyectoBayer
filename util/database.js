const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'proy_bayer',
    password: ''
});

// const pool = mysql.createPool({
//     host: 'dcrhg4kh56j13bnu.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     user: 'bx0o7p84pmpk49y4',
//     database: 'mdywsypxlzmdqv5r',
//     password: 'z0ctgptepw474dn0'
// });

module.exports = pool.promise();