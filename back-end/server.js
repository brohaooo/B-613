const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

//check login status
// import body-parser module and setup middleware
var bodyParser = require("body-parser");

//import express-session module and setup middleware
//npm install cookie-session

//const cookieSession = require("cookie-session");
const session = require("express-session");


app.use((req, res, next) => {
  // sets whether to run client settings withCredentials
  // requests made under different domain names can also be carried cookie
  res.header("Access-Control-Allow-Credentials","true")
  // the second parameter indicates the domain name that is allowed to cross domains，* represent all domain names 
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')//configure port 3000 across domains
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS') // allowed http requests
  // allows the foreground to obtain the division Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma response headers
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, token')
  if (req.method == 'OPTIONS') {
      res.sendStatus(200)
  } else {
      next()
  }
});

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/*
app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
*/

app.use(session({
  secret : "nihao",  //encryption session
  cookie : {maxAge : 60*1000*30}, //set expire time
  resave : true,  //force to save session by default is true
  saveUninitialized : false ////force to save uninitialized session, by default true
}));



//set up the application middleware to monitor all requests
// app.use(function (req, res, next) {
//   const token = req.headers.token;
//   console.log(req.session);
//   // console.log("tooken: ",token);
//   if (req.session[token]) {  // check whether the user is logged in 
//     console.log("LOGGED IN");
//     next();
//   } else {
//     // resloves the patht to the user's request 
//     var arr = req.url.split('/');
//     //console.log(arr[2]);
//     const API = arr[2];
//     if(API=="login"||API=="logout"||//API=="test"||
//     API=="users"||API=="verifyEmail"||API=="codeChecking"
//     ||API=="codeSending" || API == "admin" || API=="adminlogin" || API=="getIDViaEmail"
//     ){
//       console.log("these APIs don't need log in");
//       next();
//     }
//     else{//intercept and login
//       //req.flash('error', '请先登录');
//       console.log("these APIs need log in first");
//       res.redirect('/');  // redirect the user to the login page
//       //res.send("redirecting"); 
    
//     }

//     //next();
//   }
// });



//?????????????
const db = require("./app/models");


//option: the first one activate database normally, while the second one clear the database with each restart

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to back-end application." });
});

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



