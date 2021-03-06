if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const db = require('./config/mongoose')

const bodyParser = require("body-parser");
// to parse the body into json format
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


const customMware = require('./config/middleware');
app.use(express.static('./assets'));

//TODO -> create express-session
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
const MongoStrore = require('connect-mongo');

app.use(session({
    name: 'TODO',
    secret: process.env.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (604800000)
    },
    store: MongoStrore.create(
        {
            mongoUrl: process.env.mogourl,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))

//setting layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)
app.use(expressLayouts);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// setting up passport with local startegy
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)  // middleware to access the authenticated user from locals for views

function visitor(req, res, next) {

    console.log(req.ip, req.path, req.method)
    next()
}

app.use(visitor);

//setting up flash
const flash = require('connect-flash');
app.use(flash());
app.use(customMware.setFlash);

// app.use((error,req,res,next)=>{
//     console.log(error);
//     res.send(error)
//     next();
// })

//use express router
app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        console.log("Server not setup", err);
    }
    console.log('Server is up and running at port:', port);
})


