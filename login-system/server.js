// -------------------------------------------------avoid error in dotenv-------------------------------------------------
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


// -------------------------------------------------packages-------------------------------------------------
const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')


// -------------------------------------------------custom moduels-------------------------------------------------
const passportModules = require('./passport-config')
const initialize = passportModules.initialize
const registerFunction = passportModules.registerFunction

initialize(passport)


// -------------------------------------------------express setting-------------------------------------------------
const app = express()
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// -------------------------------------------------home page-------------------------------------------------
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", { userID: req.user.user_id })
})


// -------------------------------------------------login page-------------------------------------------------
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


// -------------------------------------------------register page-------------------------------------------------
app.get('/register',  checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

app.post('/register', checkNotAuthenticated, (req, res) => {
    registerFunction(req,res)
})


// -------------------------------------------------logout-------------------------------------------------
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})


// -------------------------------------------------custome middleware-------------------------------------------------
function checkAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next()
    }
    
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    
    next()
}


// -------------------------------------------------port-------------------------------------------------
app.listen(8080)