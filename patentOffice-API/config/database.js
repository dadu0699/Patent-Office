const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

require('dotenv').config()

const params = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    multipleStatements: true,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, 'server-ca.pem')),
        key: fs.readFileSync(path.join(__dirname, 'client-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'client-cert.pem')),
        rejectUnauthorized: false
    }
};

/* 
    const mysqlConnection = mysql.createConnection(params);

    mysqlConnection.connect(err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Database ${params.database} is connected`);
    });
*/

module.exports = mysql.createPool(params);