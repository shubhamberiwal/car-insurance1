
const mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "s240800",
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