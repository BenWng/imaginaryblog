var express=require("express");
var passport = require('passport');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');


var app=express();
app.use(multer());
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());



var localMongoPath = 'mongodb://localhost/cs5610fall2015';
var mongoConnectionPath = (process.env.OPENSHIFT_MONGODB_DB_URL || localMongoPath);
mongoose.connect(mongoConnectionPath);
var db = mongoose.connection;




//////////////////////////////////////////////////////////
// Passport configuration

var UserSchema2 = require ("./public/project/server/schema/user.schema.js")(app,mongoose,db);
var UserModel2 = mongoose.model("UserModel2", UserSchema2);
////////////////////////////////////



function findOrCreate(user){
        console.log(user);
        UserModel2.findOne({id:user.id}, function(err,returnedUser){
             if (returnedUser == null) {
                 UserModel2.create(user, function (err,doc) {
                 });
             }
        });
        return user;
}



//////////////////////////
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserModel2.findOne({id:id}, function(err,user){
            done(err,user);
    });
});

passport.use(new GoogleStrategy({
        clientID: "290952859311-64faglfo74nv27gcr1f2ecc63gh5jt99.apps.googleusercontent.com",
        clientSecret: "YZvp83VF0szDrOZPQbXLYYhB" ,
        callbackURL: "http://localhost:3000/oauth/google/callback"
        // "http://cs5610wangzhongxi-firsttestdomain.rhcloud.com/oauth/google/callback"


    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        var name;
        if (profile.displayName!=""){
            name=profile.displayName;
        }
        else{
            name="N/A"
        }
        done(null, findOrCreate({id:profile.id,Name:name,account:"N/A",role:"N/A"}));
    }
));

app.get('/oauth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login']
    }));

app.get('/oauth/google/callback',
    passport.authenticate('google'),
    function(req, res) {
        res.redirect('#/home');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.send(200);
});


app.get("/loggedin",function(req,res){
    res.send(req.isAuthenticated() ? req.user : "0" );
})
///////////////////////////////////////////////////

app.use(express.static(__dirname + '/public/project/client'));


///////////////////////////////////////////////////

app.use(function(req, res, next) {
    console.log(req.originalUrl);
    if(pathcontains(req.originalUrl, ['/favicon.ico', '/home','/add','/editor','/upload','/contact','/individual','/admin','/profile']))
        res.sendfile(__dirname + '/public/project/client/index.html');
    else
        res.send(200);
});

function pathcontains(path, validPlaces){
    console.log("******************************************");
    console.log(path);
    console.log(arguments);
    for(var i=0; i<validPlaces.length; i++) {
        if(path.indexOf(validPlaces[i]) > -1) {
            return true;
        }
    }
    return false;
    //return Array.prototype.slice.call(arguments,1).find(function(x){
    //    return path.indexOf(x)>-1;
    //})
}
//////////////////////////////////////////////





var ipaddress = process.env.OPENSHIFT_NODEJS_IP||"127.0.0.1";
var port=process.env.OPENSHIFT_NODEJS_PORT||3000;







//require("./public/assignment/server/app.js")(app,mongoose,db);
require("./public/project/server/app.js")(app,mongoose,db);

app.listen(port,ipaddress);
