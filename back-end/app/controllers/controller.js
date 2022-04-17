const { members, userInfo } = require("../models");
const db = require("../models");
const post = require("../models/post");
const User = db.userInfo;
const Administrator = db.administratorinfo;
const Friend = db.friends;
const RC = db.RCs;
const Post = db.posts;
const Comment = db.comments;
const RCMember = db.members;
const PostLike = db.postLikes;
const emailCode = db.emailCodes;
let fs = require("fs");
const path =require('path');  

const Op = db.Sequelize.Op;
//---------------------USER-------------------------
// Create and Save a new user

// Retrieve all users from the database.
exports.findAllUser = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};
// Find a single user with an id
exports.findOneUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find user with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
};
// Update a user by the id in the request
exports.updateUser = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
};
// Delete a user with the specified id in the request
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
};
// Delete all users from the database.
exports.deleteAllUser = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        });
};
// Delete all administrators from the database
exports.deleteAllAdministrators = (req, res) => {
    Administrator.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} administrators were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all administrators."
            });
        });
};
// Find all published users
/*
exports.findAllPublishedUser = (req, res) => {
    User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
*/


//登录验证（用户名，密码）
exports.login = (req, res) => {
  const user = {
    userEmail: req.body.userEmail,
    password: req.body.password,
  };
  var state = "invalid";
  
  User.findAll({ where: { userEmail: user.userEmail , password: user.password }})
    .then(data => {
      if (data.length != 0) {
        const user = {
          id: data[0].dataValues.id,
          userName: data[0].dataValues.userName,
          userEmail: data[0].dataValues.userEmail,
          password: data[0].dataValues.password,
          age: data[0].dataValues.age,
          gender: data[0].dataValues.gender,
          city: data[0].dataValues.city,
          picture: data[0].dataValues.picture
        };
        const id = user.id;
        //设置session
        //token随机生成//额，算了不随机了
        const token = id + 100000;
        req.session[token] = id;
        
        console.log("in login, token created:",token,":",req.session[token]);
        console.log("header test:",req.headers.token);


        state = "valid";
        res.send({state,data,token});
      } 
      else {
        res.status(404).send({
          state,
          message: `Cannot find user with email=${user.userEmail}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with email=" + user.userEmail
      });
    });
};
// 管理员登录
exports.administratorlogin = (req, res) => {
    const administrator = {
        userName: req.body.userName,
        password: req.body.password,
    };
    var state = "invalid";
    Administrator.findAll({ where: { userName: administrator.userName, password: administrator.password } })
        .then(data => {
            if (data.length != 0) {
                const administrator = {
                    id: data[0].dataValues.id,
                    userName: data[0].dataValues.userName,                   
                    password: data[0].dataValues.password,                 
                };
                const id = administrator.id;
                //设置session
                //token生成
                const token = id + 100000;
                req.session[token] = id;
                console.log("in login, token created:", token, ":", req.session[token]);
                console.log("header test:", req.headers.token);
                state = "valid";
                res.send({ state, data, token });
            }
            else {
                res.status(404).send({
                    state,
                    message: `Cannot find the administrator with userName=${administrator.userName}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with userName=" + administrator.userName
            });
        });
};
//退出登录（？）
exports.logout = async (req, res) => {
  try {
    req.session[req.headers.token] = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

//修改密码（用户，新密码）
exports.modifyPassword = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `user ${id} was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

//新建账户（账户信息）
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    res.status(400).send({
      message: "userName can not be empty!"
    });
    return;
  }
  // Create a user
  const user = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    city: req.body.city,
    picture: "default.png"
    //published: req.body.published ? req.body.published : false
  };
  // Save user in the database
  User.create(user)
    .then(data => {
      res.send({state:'Success',data});
      //res.send({ title:'GeeksforGeeks', data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    }); 
};
// 新建管理员（管理员信息）
exports.createAdministrator = (req, res) => {
    // Validate request
    if (!req.body.userName) {
        res.status(400).send({
            message: "userName can not be empty!"
        });
        return;
    }
    // Create administrator
    const administrator = {
        userName: req.body.userName,      
        password: req.body.password,
    };
    // Save in the database
    Administrator.create(administrator)
        .then(data => {
            res.send({ state: 'Success', data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the administrator."
            });
        });
};
//(某用户)创建（圈子）
exports.createRC = (req, res) => {
  // Validate request
  if (!req.body.rcName) {
    res.status(400).send({
      message: "rcName can not be empty!"
    });
    return;
  }
  if (!req.body.rcOwner) {
    res.status(400).send({
      message: "rcOwner can not be empty!"
    });
    return;
  }
  // Create a RC
  const circle = {
    rcName: req.body.rcName,
    rcOwner: req.body.rcOwner,
    rcTag: req.body.rcTag
  };
  // Save RC in the database
  RC.create(circle)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the relationship circle."
      });
    }); 
};

//(某用户)删除（某圈子）
exports.deleteRC = (req, res) => {
  const id = req.params.id;
  RC.destroy({
    where: { id: id }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete RC with id=" + id
    });
  });
    
    
  Comment.destroy({
        where: { RCID: id },
        truncate: false
    })
       
  PostLike.destroy({
        where: { RCID: id },
        truncate: false
    })
        
  RCMember.destroy({
    where: { RCID: id },
    truncate: false
  })
    
  res.send({ message: ` RC is deleted successfully! Comments and postlikes are deleted successfully! All RCmembers were deleted successfully!` });
};

//(某用户)将（某用户）拉入（某圈子）
exports.createRCMembers = (req, res) => {
  // Validate request
  if (!req.body.RCID) {
    res.status(400).send({
      message: "RCID can not be empty!"
    });
    return;
  }
  if (!req.body.memberID) {
    res.status(400).send({
      message: "memberID can not be empty!"
    });
    return;
  }
  // Create a rcMember
  const rcMember = {
    RCID: req.body.RCID,
    memberID: req.body.memberID
    
  };
  // Save rcMember in the database
  RCMember.create(rcMember)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rcMember."
      });
    }); 
};

//（某用户）加入（某圈子）
//同上


//（某用户）退出（某圈子）
exports.deleteMember = (req, res) => {
  const MEMID = req.params.memid;
  const RCID = req.params.rcid;
  RCMember.destroy({
    where: {
      [Op.and]: [
        { memberID : MEMID },
        { RCID : RCID }
      ] 
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "member was removed successfully!"
        });
      } else {
        res.send({
          message: `Cannot remove member with memid=${MEMID}, rcid=${RCID}. Maybe member was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not remove member with memid=" + MEMID + " rcid="+RCID
      });
    });
};


//（某用户）查看好友列表
exports.checkFriends = (req, res) => {
  const id = req.params.id;
  Friend.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { userID : id },
            { friendID : id }
          ]
        },
        { 
          validateState : "approved"
        }
     ]
    } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user's friends."
      });
    });
};

//（某用户）搜索账户（用户名字？ID？邮箱？）
exports.findOneUser = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

//（某用户）添加（某用户为好友）！！！务必设定user为发起者，且状态为pending
exports.createFriends = (req, res) => {
  // Validate request
  if (!req.body.userID) {
    res.status(400).send({
      message: "userID can not be empty!"
    });
    return;
  }
  if (!req.body.friendID) {
    res.status(400).send({
      message: "friendID can not be empty!"
    });
    return;
  }
  // Create a friend-couple
  const friends = {
    userID: req.body.userID,
    friendID: req.body.friendID,
    validateState: req.body.validateState
  };
  // Save friend-couple in the database
  Friend.create(friends)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the friends."
      });
    }); 
};

//（某用户）删除（某好友）
exports.deleteFriend = (req, res) => {
  const Uid = req.params.userid;
  const Fid = req.params.friendid;
  Friend.destroy({
    where:  {
      [Op.or]: [
        {
          [Op.and]: [
            { userID : Uid },
            { friendID : Fid }
          ]
        },
        { 
          [Op.and]: [
            { userID : Fid },
            { friendID : Uid }
          ] 
        }
     ]
    } 
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Friend was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Friend with user id=${Uid} and friend id=${Fid}. Maybe Friend relationship was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Friend relationship with user id=" + Uid + "and friend id=" + Fid
      });
    });
};

//（某用户）查看好友申请
exports.checkFriendsRequests = (req, res) => {
  const id = req.params.id;
  Friend.findAll({
    where: {
      [Op.and]: [
        {
          /*我发现，申请好像是单向的，我定义user是发起者，那么friendID持有者可以查看这个申请
          [Op.or]: [
            { userID : id },
            { friendID : id }
          ]
          */
          friendID : id
        },
        { 
          validateState : "pending"
        }
     ]
    } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user's friends requests."
      });
    });
};



//（某用户）处理（某好友申请）!!!这里userid就是这个用户id
exports.dealRequest = (req, res) => {
  const Uid = req.params.userid;
  const Fid = req.params.friendid;
  //const OP = req.params.operation;
  Friend.update(req.body, {
    where: {
      /*和上面一样的问题。。。。。。
      [Op.or]: [
        {
          [Op.and]: [
            { userID : Uid },
            { friendID : Fid }
          ]
        },
        { 
          [Op.and]: [
            { userID : Fid },
            { friendID : Uid }
          ] 
        }
     ]
     */
      [Op.and]: [
       { userID : Fid },
       { friendID : Uid }
    ] 
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `user-friend ${Uid} - ${Fid} was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update user-friend ${Uid} - ${Fid}. Maybe user-friend was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error dealing request with Uid = " + Uid + " Fid = " + Fid
      });
    });
};

//（某用户）查看圈子列表
exports.checkUserRCs = (req, res) => {
  const id = req.params.id;
  RCMember.findAll({
    where: {
      memberID : id
    } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user's RCs."
      });
    });
};

//（某用户）查看（某圈子）的内容--所有动态
//要不点开再详细展示吧。。。
exports.checkPostsByRCID = (req, res) => {
  const id = req.params.id;
  Post.findAll({
    attributes: ['id', 'posterID','RCID','postPicSrc','mood'],
    where: {
      RCID : id
    } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving RC's posts."
      });
    });
};



//（某用户）查看（某动态）的内容--动态信息
exports.findOnePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving post with id=" + id
      });
    });
};

//（某用户）在（某圈子）发布（动态）带图片!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!修改过！！！！！！！！！！！！！！！！！
exports.createPost = (req, res) => {
  // Validate request
  if (!req.body.posterID) {
    res.status(400).send({
      message: "posterID can not be empty!"
    });
    return;
  }
  if (!req.body.RCID) {
    res.status(400).send({
      message: "RCID can not be empty!"
    });
    return;
  }
  if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
    res.render("error", {message: "上传文件不能为空！"});
    return;
  } 
  else {
    let file = req.file;
    let fileInfo = {};
    console.log(file);
    //这里可以重命名
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.originalname);
    //我选择在乱码名字后面加上文件后缀，不然打不开
    const extname = path.extname(file.originalname)
    const fileName =  file.filename + extname;
    fs.renameSync('./upload/' + file.filename, './upload/' + fileName);
    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.path;
    //console.log(file.originalname);
   

    // Create a post
    const post = {
      posterID: req.body.posterID,
      RCID: req.body.RCID,
      postPicSrc: fileName,
      text: req.body.text,
      mood: req.body.mood
    };
    // Save post in the database
    Post.create(post)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the post."
        });
      }); 
  }
  
};

//（某用户）在（某圈子）发布（动态）不带图片!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!新增！！！！！！！！！！！！！！！！！
exports.createPostNoPic = (req, res) => {
  // Validate request
  if (!req.body.posterID) {
    res.status(400).send({
      message: "posterID can not be empty!"
    });
    return;
  }
  if (!req.body.RCID) {
    res.status(400).send({
      message: "RCID can not be empty!"
    });
    return;
  }
 
  
 
  // Create a post
  const post = {
    posterID: req.body.posterID,
    RCID: req.body.RCID,
    postPicSrc: "noPic",
    text: req.body.text,
    mood: req.body.mood
  };
  // Save post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    }); 
  
  
};
/*
.then(num => {
      if (num == 1) {
          ;
      } else {
        res.send({
          message: `Cannot delete post with id=${id}. Maybe RC was not found!`
        });
      }
    })
*/

//（某用户）在（某圈子）删除（动态）
exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: { id: id }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete post with id=" + id
    });
  });
    
  


  PostLike.destroy({
      where: { postID: id },
      truncate: false
  })
        
  Comment.destroy({
      where: { postID: id },
      truncate: false
  })
  res.send({ message: ` post is deleted successfully! Comments and postlikes are deleted successfully!` });
};

//（某用户）在（某动态）发表（评论）
exports.createComment = (req, res) => {
  // Validate request
  if (!req.body.commenterID) {
    res.status(400).send({
      message: "commenterID can not be empty!"
    });
    return;
  }
  if (!req.body.postID) {
    res.status(400).send({
      message: "postID can not be empty!"
    });
    return;
  }
  if (!req.body.content) {
    res.status(400).send({
      message: "content can not be empty!"
    });
    return;
  }
  // Create a comment
  const comment = {
    commenterID: req.body.commenterID,
    postID: req.body.postID,
    RCID: req.body.RCID,
    content: req.body.content
  };
  // Save comment in the database
  Comment.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    }); 
};

//（某用户）在（某动态）删除（某评论）
exports.deleteComment = (req, res) => {
  const id = req.params.id;
  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `comment with id=${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete comment with id=${id}. Maybe RC was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete comment with id=" + id
      });
    });
};

//（某用户）在（某动态）点赞
exports.createPostLikes = (req, res) => {
  // Validate request
  if (!req.body.postID) {
    res.status(400).send({
      message: "postID can not be empty!"
    });
    return;
  }
  if (!req.body.likerID) {
    res.status(400).send({
      message: "likerID can not be empty!"
    });
    return;
  }
  if (!req.body.RCID) {
    res.status(400).send({
       message: "RCID can not be empty!"
    });
      return;
  }
  // Create a comment
  const Postlike = {
    postID: req.body.postID,
    likerID: req.body.likerID,
    RCID: req.body.RCID
  };
  // Save comment in the database
  PostLike.create(Postlike)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    }); 
};


//（某用户）在（某动态）取消点赞

exports.deletelikeLists = (req, res) => {
  const id = req.params.id;
  PostLike.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `like with id=${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete like with id=${id}. Maybe RC was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete comment with id=" + id
      });
    });
};



//查看（某动态）的所有评论
exports.checkcommentsByPostID = (req, res) => {
  const id = req.params.id;
  Comment.findAll({
    where: {
      postID : id
    } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Post's comments."
      });
    });
};

//查看（某动态）的所有点赞
exports.checkLikeListsByPostID = (req, res) => {
  const id = req.params.id;
  PostLike.findAll({
    where: {
      postID : id
    } 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Post's comments."
      });
    });
};

//查看（某圈子）
exports.findOneRC = (req, res) => {
  const id = req.params.id;
  RC.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find RC with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving RC with id=" + id
      });
    });
};


//查看邮箱是否被注册
exports.verifyEmail = (req, res) => {
  const email = req.body.userEmail;
  var state = "valid";
  
  User.findAll({ where: { userEmail: email }})
    .then(data => {
      if (data.length != 0) {
        state = "invalid";
        res.send({state});
      } 
      else {
        res.send({state});
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with email=" + user.userEmail
      });
    });
};

//查看用户名是否被注册（需要吗）


//发送邮件并记录 邮箱--验证码 
//nodemailer用于邮箱验证: npm install nodemailer
const nodemailer = require("nodemailer")

exports.codeSending = (req, res) => {
  const email = req.body.userEmail;
  let code = Math.floor(Math.random() * 900000) + 100000;
  const EC = {
    email: email,
    code: code
  };
  let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true,
    port: 465,
    auth:{
      user: '18926040525@163.com',
      pass: 'UPOUWYHMHQGXWHMF',
    }
  })
  //配置相关参数
  let options = {
    from: '18926040525@163.com',
    to: '18926040525@163.com,'+ email,
    subject: '欢迎您',
    html: 
    `
    <div style="width:600px;margin:30px auto">
    <h1 style="text-align:center;">欢迎注册B-613系统账户</h1>
    <p style="font-size:24px">此次的验证码如下：</p><strong
        style="font-size: 20px;display:block;text-align: center;color: red">${code}</strong>
    <p>验证码永久有效，因为我懒得定时清除了</p><i style="color: red">此邮件为系统自动发送，请勿回复！若您没有进行注册请忽略</i>   
    </div>
    `
  }
  transporter.sendMail(options,function(err,msg){
    if(err){
      console.log(err)
    }
    else{
      res.send(msg)
      transporter.close()
    }
  })

  emailCode.destroy({
    where: { email: email }
  })
  emailCode.create(EC);

};

//验证邮箱--验证码

exports.codeChecking = (req, res) => {
  const email = req.body.userEmail;
  const code = req.body.code;
  var state = "valid";
  
  emailCode.findAll({ where: { 
    [Op.and]: [
      { email : email },
      { code : code }
    ] 

   }})
    .then(data => {
      if (data.length == 0) {
        state = "invalid";
        res.send({state});
      } 
      else {
        res.send({state});
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with email=" + user.userEmail
      });
    });
};


//上传头像 


exports.uploadHead = (req, res) => {
  if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
      res.render("error", {message: "上传文件不能为空！"});
      return
  } else {
     let file = req.file;
     let fileInfo = {};
     console.log(file);
     //这里可以重命名
     //fs.renameSync('./upload/' + file.filename, './upload/' + file.originalname);
     //我选择在乱码名字后面加上文件后缀，不然打不开
     const extname = path.extname(file.originalname)
     const fileName =  file.filename + extname;
     fs.renameSync('./upload/' + file.filename, './upload/' + fileName);
     // 获取文件信息
     fileInfo.mimetype = file.mimetype;
     fileInfo.originalname = file.originalname;
     fileInfo.size = file.size;
     fileInfo.path = file.path;
     //console.log(file.originalname);
     const newHead ={
       picture : fileName,
       id : req.body.id
     }
     console.log(newHead);
     //存入数据库:
     User.update(newHead, {
      where: { id: newHead.id }
    })
     
     // 设置响应类型及编码
     res.set({
       'content-type': 'application/json; charset=utf-8'
    });
      const state = "上传成功！"
     res.send({state,fileInfo});
     
  }
}







