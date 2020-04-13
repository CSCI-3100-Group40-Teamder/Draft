var fs = require('fs');
var express = require("express");
var http = require("http");
var app = express(); // function 
var url = require('url');


app.set('view engine', 'ejs');

app.get('/' ,function(req,res){
    //res.send('this is my homepage');
    
    res.render('teach');
});



app.get('/selectchat', function (req, res) {
    
    var q = url.parse(req.url, true);
	var qdata = q.query;
   
    res.render('chat',{chatroom : qdata.chatroom});
  });





http.createServer(app).listen(3000);
