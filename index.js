const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

// to parse the body into json format
app.use(express.urlencoded());

app.use(express.static('./assets'));

//TODO -> create express-session
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
const MongoStrore = require('connect-mongo');

app.use(session({
    name : 'TODO',
    secret : 'secretkeytobechanged',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : MongoStrore.create(
        {
            mongoUrl : 'mongodb+srv://Chats:wkTnlxjfJG9dmxTP@cluster0.mxmxr.mongodb.net/ProgrammersTODO?retryWrites=true&w=majority',
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))

//setting layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.use(expressLayouts);

//setup view engine
app.set('view engine', 'ejs');
app.set('views','./views');


// setting up passport with local startegy
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)  // middleware to access the authenticated user from locals for views

//setting up flash
const flash = require('connect-flash');
app.use(flash());

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Server not setup", err);
    }
    console.log('Server is up and running at port:',port);
})