const bcrypt = require('bcrypt')
var mysql = require('mysql')

const connection = mysql.createConnection({
    host:"database-testing.ccgcttjz3ptu.ap-southeast-1.rds.amazonaws.com",
    port:'3306',
    user:"admin",
    password:"csci3100",
    database: "user"
})

/*
bcrypt.hash('abcdefg', 10, (e, res) => {
    const insert_user_sql = `INSERT INTO  user_account (user_id, email, password) VALUES (?,?,?)`
    
    // Insert the registration into user table
    connection.query(insert_user_sql, [null, 'r@r', res], (error, results, fields) => {
})})

connection.query(`SELECT * FROM user_account where email = "r@r"`, (e, res) => {
    console.log(res[0])
    bcrypt.compare('abcdefg', res[0].password, (e, res) => {
        console.log(res)
    })
})
*/

const id = '1'
connection.query(`SELECT * FROM user_account where user_id = "${id}"`,  (e, res) => {
    if (e) return done(e)  
    console.log(res)
})