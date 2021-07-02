
const mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "insurance",
    multipleStatements : true
});

connection.connect((err) => {
    if(!err)
        console.log("Connected");
    else
        console.log("Connection failed reason: ",err);
        // throw err;
});

module.exports = connection;