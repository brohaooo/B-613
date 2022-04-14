const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

//登录状态检测:
//引入body-parser模块并设置中间件，以便用req.body来获取post的传值
var bodyParser = require("body-parser");

//引入express-session模块并设置中间件
//npm install cookie-session
const cookieSession = require("cookie-session");





app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);



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




