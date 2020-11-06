var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'',
    database:'bd_tcc'
});

var server = app.listen(1384, function() {
    var host = server.address().address
    var host = server.address().port
    console.log('start');
});

con.connect(function(error){
    if(error) console.log(error);
    else console.log("connected");
});

app.get('/eventos', function(req, res){
    con.query('select * from eventos', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    })
})