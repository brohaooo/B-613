const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
//we used sequelize to realize OOP databases, treating each turple as an object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userInfo = require("./userInfo.js")(sequelize, Sequelize);
db.friends = require("./friends.js")(sequelize, Sequelize);
db.RCs = require("./relationshipCircle.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);
db.members = require("./rcMembers.js")(sequelize, Sequelize);
db.postLikes = require("./postLikeList.js")(sequelize, Sequelize);
db.emailCodes = require("./emailCode.js")(sequelize, Sequelize);
db.administratorinfo = require("./administrator.js")(sequelize, Sequelize);
db.rcRequests = require("./rcRequests.js")(sequelize, Sequelize);
module.exports = db;
