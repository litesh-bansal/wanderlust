// accessing environment variables
if(process.env.NODE_ENV !="production")
{
    require('dotenv').config();
}

console.log(process.env);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ExpressError = require('./util/ExpressError.js');
const path = require('path');

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user.js');
const userRouter = require('./routes/user.js')
const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');


// const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

const dbUrl = process.env.ATLASDB_URL;
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views")); 
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
app.use(methodOverride("_method"));



app.use(express.static(path.join(__dirname,"public")));
main()
.then(()=>{
    console.log('connected to DB');
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbUrl); 
}



// app.get('/',(req,res)=>{
//     res.send('hi i am the root');
// })


const store = new MongoStore({
    mongoUrl:dbUrl,
    crypto:
    {
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on('error',()=>{
    console.log('error on mongo store',err);
});
let sessionOptions = 
{
    store,
    secret:process.env.SECRET,
    resave:false
    ,saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
}};

app.use(session(sessionOptions));
app.use(flash());
// initialization of passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})


// demo user
app.get('/demouser',async (req,res)=>{ 
    let fakeUser = new User({
        email:'litesh123@gmail.com',
        username:'chutiya',
    });
    let newUser = await User.register(fakeUser,'helloworld');
    res.send(newUser);
})
app.use('/listings',listingsRouter);
app.use('/listings/:id/reviews',reviewsRouter);
app.use('/',userRouter);
app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
})
// middleware to handle the errors
app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"} = err;
    res.render('error.ejs',{message});
})
app.listen(8080,()=>{
    console.log('server is listening to the port 8080');
})