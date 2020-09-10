require('./config/db.config');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const passport = require('passport');

const PORT = 3000;
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// CORS implementation
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials: true
}));

// passport initialization
app.use(passport.initialize());

// Configuring the database

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true
}, (err) => {
    if(!err) {
        console.log('Successfully connected to database');
    } else {
        console.log('Error in Mongodb connection : ' + JSON.stringify(err, undefined, 2));
    }
});

//Index route
app.get('/', (req, res) => {
    res.send("This is student registration process");
})

const userRoute = require('./routes/user.route');
app.use('/users', userRoute);

// error handler
app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(PORT, () => {
    console.log("Server is connected to the port" +PORT);
})

/* Below implementation is related to the session storage by using the 
   session storage implementation I was not able to get username so that I have used local storage */
   
// session implementation

// // const session = require('express-session');
// // const cookieParser = require('cookie-parser');
// // const MongoStore = require('connect-mongo')(session);
// // app.use(cookieParser());

// // app.use((req,res,next) => {
// //    res.locals.session = req.session
// //    res.locals.user = req.user
// //    next()
// // })

// // app.use(session({
// //    name:'myname.sid',
// //    resave:false,
// //    saveUninitialized:false,
// //    secret: 'secret',
// //    cookie: {
// //      maxAge: 36000000,
// //      httpOnly: false,
// //      secure:false
// //    },
// //    store: new MongoStore({mongooseConnection: mongoose.connection})
// // }));

// // app.use(passport.session());