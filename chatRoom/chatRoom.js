const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const records = require('./records.js');
const port = process.env.PORT || 3000;
var url = require('url');
app.set('view engine', 'ejs');

 
// 加入線上人數計數
let onlineCount = 0;
var chatroomID = 0;
var ID = 0;

app.get('/' ,function(req,res){
    //res.send('this is my homepage');
    
    res.render('teach');
});

app.get('/selectchat', function (req, res) {
    
    var q = url.parse(req.url, true);
    var qdata = q.query;
    chatroomID = qdata.chatroom
    records.setData(chatroomID)
    res.render('index',{chatroom : qdata.chatroom});
});
 

// 當有新connection 所發生嘅野
io.on('connection', (socket) => {
    // 有連線發生時增加人數
    onlineCount++;
    // 發送人數給網頁
    io.emit("online", onlineCount);


    // 發送紀錄最大值
    //socket.emit("maxRecord", records.getMax());
    
    // 發送紀錄
    // 當有new connection la, send 返 完整嘅 chat record 比 new client 
    
    records.getData((msgs) => {
        
        socket.emit("chatRecord", msgs);
    });
 
    socket.on("greet", () => {
        socket.emit("greet", onlineCount);
    });
 
    socket.on("send", (msg) => {
        records.setData(chatroomID)
        ID = msg.roomID
        // 因此我們直接 return ，終止函式執行。
        // to rev the mag
        // console.log(mag) // it will show the msg in the terminal
        if (Object.keys(msg).length < 2) return; // if rev's msg < 2 ==> error happened
        records.insertData(msg);
        
    });
 
    socket.on('disconnect', () => {
        // 有人離線了，扣人
        if (onlineCount > 0){
            onlineCount = onlineCount - 1;
        }else{
            onlineCount = 0 ;
        }
        io.emit("online", onlineCount); 
    });
});
 
records.on("new_message", (msg) => {
    // for sending new msg to client 
    // no new connection here
    records.setData(chatroomID)
    console.log("Yes You got the msg\n");
    console.log(ID + "Test " + msg.roomID)
    
    io.emit("msg", msg)
    
    
});
 
server.listen(port, () => {
    console.log("Server Started. http://localhost:" + port);
});

