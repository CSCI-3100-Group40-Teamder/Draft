const mysql = require('mysql')

const connection = mysql.createConnection({
    host:"database-testing.ccgcttjz3ptu.ap-southeast-1.rds.amazonaws.com",
    port:'3306',
    user:"admin",
    password:"csci3100",
    database: "user"
})

connection.connect()

const select_all_sql = 'SHOW TABLES'

connection.query(select_all_sql, (error, results, fields) => {
    if (error) throw error
    console.log(results)
})



connection.query(`SELECT * FROM user`,  (e, res, fields) => {
    if (e) return done(e) 
    res.forEach(element => {
        console.log('The user id:', element.id);
        console.log('The user name:', element.name);
        console.log('The user email:', element.email);
        console.log('The user password:', element.password);
        }); 
    
})


connection.query(`SELECT * FROM chat`,  (e, res, fields) => {
    if (e) return done(e) 
    
    console.log('\n')
    console.log('This is a meaningness line\n')
    console.log(res);
        
    
})

connection.end()