module.exports = app => {
    const Users = require("../controllers/controller.js");
    /*
    const Friends = require("../controllers/controller.js");
    const RCs = require("../controllers/controller.js");
    const Posts = require("../controllers/controller.js");
    const Comments = require("../controllers/controller.js");
    const RCMembers = require("../controllers/controller.js");
    */


    var router = require("express").Router();
    //-----------------------USER------------------------
    // Create a new User
    
    // Retrieve all Users
    router.get("/users/", Users.findAllUser);

    // Retrieve all published Users
    //router.get("/published", Users.findAllPublishedUser);
    
    // Retrieve a single User with id
    //router.get("/users/:id", Users.findOneUser);
    // Update a User with id
    router.put("/users/:id", Users.updateUser);
    // Delete a User with id
    router.delete("/users/:id", Users.deleteUser);
    // Delete all Users
    router.delete("/users/", Users.deleteAllUser);


    //-----------------------FRIEND------------------------
    //create Friends
    

    //-----------------------RELATIONSHIP CIRCLE------------------------
   

    //-----------------------POST------------------------
    //create a Post
    

    //-----------------------COMMENT------------------------
    //create a comment
    

    //-----------------------MEMBER-RC--------------------
    //create a member in a RC
    
    //-----------------------POST-LIKELIST--------------------
    //create a liker in a post
    


    //登录验证（用户名，密码）
    router.post("/login/", Users.login);
    
    //退出登录（？）


    //修改密码（用户，新密码）
    
    router.put("/modifyPassword/:id", Users.modifyPassword);

    //新建账户（账户信息）
    router.post("/users/", Users.createUser);
    
    //创建（圈子）
    router.post("/RCs/", Users.createRC);

    //删除（圈子）
    router.delete("/RCs/:id", Users.deleteRC);

    //将（某用户）拉入（某圈子）
    router.post("/members/", Users.createRCMembers);


    //（某用户）退出（某圈子）
    router.delete("/members/:rcid/:memid", Users.deleteMember);

    //查看（某用户）好友列表
    router.get("/friends/:id", Users.checkFriends);

    //（某用户）搜索账户（用户名字？ID？邮箱？目前是ID），也就是查看（某用户）
    router.get("/users/:id", Users.findOneUser);

    //添加（好友关系）！！！务必设定user为发起者，且状态为pending
    router.post("/friends/", Users.createFriends);

    //删除（好友关系）
    router.delete("/friends/:userid/:friendid", Users.deleteFriend);

    //（某用户）查看好友申请
    router.get("/friendsRequests/:id", Users.checkFriendsRequests);

    //（某用户）处理（某好友申请）!!!这里userid就是这个用户id
    router.put("/dealRequest/:userid/:friendid", Users.dealRequest);

    //查看（某用户）的所有圈子
    router.get("/members/:id", Users.checkUserRCs);

    //查看（某圈子）的所有动态
    router.get("/posts/RCID/:id", Users.checkPostsByRCID);


    //查看（某动态）的内容
    router.get("/posts/:id", Users.findOnePost);

    //在（某圈子）发布（动态）
    router.post("/posts/", Users.createPost);

    //在（某圈子）删除（动态），根据该动态的唯一识别id删除
    router.delete("/posts/:id", Users.deletePost);

    //在（某动态）发表（评论）
    router.post("/comments/", Users.createComment);

    //在（某动态）删除（某评论），根据该评论的唯一识别id删除
    router.delete("/comments/:id", Users.deleteComment);

    //（某用户）在（某动态）点赞
    router.post("/likeLists/", Users.createPostLikes);

    //（某用户）在（某动态）取消点赞
    router.delete("/likeLists/:id", Users.deletelikeLists);

    //查看（某动态）的所有评论
    router.get("/comments/post/:id", Users.checkcommentsByPostID);

    //查看（某动态）的所有点赞
    router.get("/likeLists/post/:id", Users.checkLikeListsByPostID);

    //查看（某圈子）
    router.get("/RCs/:id", Users.findOneRC);

    



    app.use('/api', router);
  };