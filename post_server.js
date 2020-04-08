var fs = require('fs');
var express = require("express");
var http = require("http");
var url = require('url');
var app = express();
var mysql = require('mysql');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "csci3100",
  database: "teamder"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var  getInformationFromDB = function(callback) {

con.query("SELECT * FROM user_account", function (err, result, fields) {
    var output;
    if (err) return callback(err);;
   // console.log(result[0].user_id);
   // console.log(output);
    callback(null,result);
  });
};

app.get("/", function(req, res, next) {
    //Open a file on the server and return its content:
    //console.log(output);
    var b=0;
    con.query("SELECT * FROM user_account", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    //res.render('post', {id: result[0].user_id, password: result[0].password});
    res.render('post', {result: result}); 
  });
});

app.get("/create_id", function(req, res, next) {
	console.log("Trying to create a new user...");
	var q = url.parse(req.url, true);
	var qdata = q.query;
	console.log(qdata.new_id);
	console.log(qdata.new_password);
	var sql = "INSERT INTO user_account (user_id, password) VALUES ('"+qdata.new_id+"', '"+qdata.new_password+"')";
	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
    console.log(sql);
    res.redirect('/');
	return res.end();
});

app.get("/delete_id/:item.user_id", function(req, res, next) {
	console.log("Trying to delete a new user...");
	var q = url.parse(req.url, true);
	var qdata = q.query;
	console.log(qdata.delete_id);
	var sql = "DELETE FROM user_account WHERE user_id = '"+qdata.delete_id+"'";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("records deleted:");
        });
    res.redirect('/');
	return res.end();
});

/*app.get("/", function(req, res, next) {
    //Open a file on the server and return its content:
    //console.log(output);
    var b=0;
    getInformationFromDB(function (err, result) {
  if (err) console.log("Database error!");
  else console.log('a'+result[0].user_id);
  if(result=='1155079553')
        b=1;
    //res.render('main', {person: result});
    res.render('post', {id: result[0].user_id, password: result[0].password});
    });
});*/

/*app.get("/", function(req, res, next) {
    //Open a file on the server and return its content:
  fs.readFile('main.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); //for send back information
  });
});
app.get("/input.html", function(req, res, next) {
    //Open a file on the server and return its content:
  fs.readFile('input.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/register.html", function(req, res, next) {
    fs.readFile('register.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/t1.html", function(req, res, next) {
    fs.readFile('t1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/t2.html", function(req, res, next) {
    fs.readFile('t2.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/main.html", function(req, res, next) {
    fs.readFile('main.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/all.html", function(req, res, next) {
    fs.readFile('all.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/football.html", function(req, res, next) {
    fs.readFile('football.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/basketball.html", function(req, res, next) {
    fs.readFile('basketball.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});
app.get("/user_information.html", function(req, res, next) {
    fs.readFile('user_information.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});*/

http.createServer(app).listen(8080);
console.log('Server On and Port number: 8080');