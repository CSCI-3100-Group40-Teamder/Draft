var mysql = require('mysql')

const connection = mysql.createConnection({
    host:"database-testing.ccgcttjz3ptu.ap-southeast-1.rds.amazonaws.com",
    port:'3306',
    user:"admin",
    password:"csci3100",
    database: "user"
})


const sender_id = "Jacky"
const content = "Hi"

const room_id = 1

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const chat_time  = time


const insert_chat_sql = `INSERT INTO  chat (room_id, sender_id, content, chat_time) VALUES (?,?,?,?)`

connection.query(insert_chat_sql, [room_id, sender_id, content, chat_time], (error, results, fields) => {
    if (error) throw error;
    console.log("1 record inserted");
    
})
/*
module.exports = {
    createTable: createTable,
    connection: connection
}*/
