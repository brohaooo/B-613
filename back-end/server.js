const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

//登录状态检测:
//引入body-parser模块并设置中间件，以便用req.body来获取post的传值
var bodyParser = require("body-parser");

//引入express-session模块并设置中间件
//npm install cookie-session

//const cookieSession = require("cookie-session");
const session = require("express-session");


app.use((req, res, next) => {
  // 设置是否运行客户端设置 withCredentials
  // 即在不同域名下发出的请求也可以携带 cookie
  res.header("Access-Control-Allow-Credentials","true")
  // 第二个参数表示允许跨域的域名，* 代表所有域名  
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')//配置80端口跨域
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
  // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
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
  secret : "nihao",  //加密session，随便写
  cookie : {maxAge : 60*1000*30}, //设置过期时间
  resave : true,  //强制保存session 默认为 true，建议设置成false
  saveUninitialized : false ////强制将未初始化的session存储 默认为true，建议设置成true
}));


/*
//设置应用中间件，监控所有请求
app.use(function (req, res, next) {
  const token = req.headers.token;
  // console.log(req.session);
  // console.log(token);
  if (req.session[token]) {  // 判断用户是否登录
    console.log("LOGGED IN");
    next();
  } else {
    // 解析用户请求的路径
    var arr = req.url.split('/');
    //console.log(arr[2]);
    const API = arr[2];
    if(API=="login"||API=="logout"||//API=="test"||
    API=="users"||API=="verifyEmail"||API=="codeChecking"
    ||API=="codeSending" || API == "admin" || API=="adminlogin" || API=="getIDViaEmail"
    ){
      console.log("these APIs don't need log in");
      next();
    }
    else{//登录拦截
      //req.flash('error', '请先登录');
      console.log("these APIs need log in first");
      res.redirect('/');  // 将用户重定向到登录页面
      //res.send("redirecting"); // 这一行好像不会执行。。。
    
    }

    //next();
  }
});
*/


//?????????????
const db = require("./app/models");


//二选一:后者每次重启会清空数据库

db.sequelize.sync();

/*
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to back-end application." });
});

//????
require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



