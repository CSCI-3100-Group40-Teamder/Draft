const {EventEmitter} = require("events");


//#TODO 

let instance;
//let data = [];
//let MAX = 50;

var chatroomID =0
const mysql_method = require('./dataBase/createTable')


const connection = mysql_method.connection



class Records extends EventEmitter {
    constructor () {
        super();
    }

    setData(input){
        chatroomID = input
    }
 
    insertData (msg) {

        console.log(msg.sender_id);
        console.log(msg.content);
        

        // need to save to the database
        // using hei's example as a ref

        const sender_id = msg.sender_id
        const content = msg.content
        const check = 0
        const room_id = msg.roomID
        //chatroomID = msg.roomID
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const chat_time  = time

        const insert_chat_sql = `INSERT INTO  chat (room_id, sender_id, content, chat_time) VALUES (?,?,?,?)`

        connection.query(insert_chat_sql, [room_id, sender_id, content, chat_time], (error, results, fields) => {
            if (error) return done(error) 
            
            console.log('chat has already inerted to the dataBase')
           
            this.emit("new_message", msg)
            
        })
        
        
    }


    getData(callback) {
        // need to do some select opreation here
        
        const select_chat_sql = 'SELECT * FROM chat WHERE room_id = ?' 
        //const select_chat_sql = 'SELECT * FROM chat' 

        connection.query(select_chat_sql, [chatroomID],(error, results, fields) => {
            if (error) throw error
            //console.log(results)
            callback(results)
        })
        
    }
 
    /*setMax (max) {
        MAX = max;
    }
 
    getMax () {
        return MAX;
    }*/
}
 
module.exports = (function () {
    if (!instance) {
        instance = new Records();
    }
 
    return instance;
})();