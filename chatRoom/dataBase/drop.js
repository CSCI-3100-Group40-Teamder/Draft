const mysql = require('mysql')

const connection = mysql.createConnection({
    host:"database-testing.ccgcttjz3ptu.ap-southeast-1.rds.amazonaws.com",
    port:'3306',
    user:"admin",
    password:"csci3100",
    database: "user"
})

connection.connect()

// const select_all_sql = `SELECT * FROM user WHERE email = "w@w"`
// connection.query(select_all_sql, (error, results, fields) => {
//     if (error) throw error
//     console.log(results)
// })

connection.query(`DROP TABLE chat`, (error, results, fields) => {
    if (error) throw error
    console.log(results[0])
})

console.log('Dropped table')
connection.end()