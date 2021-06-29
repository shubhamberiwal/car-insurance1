

const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./connection");
const ejs = require("ejs");

const routes = require("./router");

var app = express();

//set views file
// app.set('views',path.join(__dirname,'views'));
//set view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(routes);

app.listen(3000, () => {
    console.log("Car Insurance Database Server has started running at port",3000);
});