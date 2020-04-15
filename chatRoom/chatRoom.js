const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const records = require('./records.js');
const port = process.env.PORT || 3000;
var url = require('url');
app.set('view engine', 'ejs');

let numOfOnline = 0;
var chatroomID = 0;
var ID = 0;


app.get('/' ,function(req,res){
    res.render('teach');
});

app.get('/selectchat', function (req, res) {
    
    var q = url.parse(req.url, true);
    var qdata = q.query;
    chatroomID = qdata.chatroom
    records.setData(chatroomID)
    res.render('chatroom',{chatroom : qdata.chatroom}); // chatroom 應該係 ＝＝ post id 
    //res.render('chatroom',{chatroom : qdata.chatroom}); 
});
 

//----------------------------------------------------------------------when there is a new connection--------------------------------------------------------------
io.on('connection', (socket) => {
    
    numOfOnline++;
    // 發送人數給網頁
    io.emit("online", numOfOnline);

    // 當有new connection la, send 返 完整嘅 chat record 比 new client 
    
    records.getData((msgs) => {
        
        socket.emit("chatRecord", msgs);
    });
 
    socket.on("greet", () => {
        socket.emit("greet", numOfOnline);
    });
 
    socket.on("send", (msg) => {
        records.setData(chatroomID)
        ID = msg.roomID
        records.insertData(msg);
        
    });
 
    socket.on('disconnect', () => {
        // when someone disconnect the server
        if (numOfOnline > 0){
            numOfOnline = numOfOnline - 1;
        }else{
            numOfOnline = 0 ;
        }
        io.emit("online", numOfOnline); 
    });
});


//-------------------------------------------------when there are new message, then send to different clients-----------------------------------------------------
records.on("new_message", (msg) => {
    // for sending new msg to client 
    // no new connection here
    records.setData(chatroomID)
    //console.log("Yes You got the msg\n");
    //console.log(ID + "Test " + msg.roomID)
    // msg.roomID == which room does the msg belongs to
    io.emit("msg", msg)
    
});
 

//----------------------------------------------------for starting the server---------------------------------------------------------------------------------

server.listen(port, () => {
    console.log("Server Start");
});

