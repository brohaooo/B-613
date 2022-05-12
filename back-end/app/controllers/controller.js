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
const rcRequest = db.rcRequests;
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


//login authentication (user name, password)
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
        //set session
        //token is generated as id + 100000
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
// admin log on
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
                //set uo session
                //token generation (same as user's)
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
//logout
exports.logout = async (req, res) => {
  try {
    req.session[req.headers.token] = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

//change the password (user, new password)
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

//create an account (account information)
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
// Creating an Administrator (Administrator Information)
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
//(a user) to create (a circle)
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
      //The creator is added to the circle synchronously
      
      console.log("now addign user ",data.dataValues.id," to members");
      const rcMember = {
        RCID: data.dataValues.id,
        memberID: req.body.rcOwner
      };
      // Save rcMember in the database
      RCMember.create(rcMember)
        
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the relationship circle."
      });
    }); 
};

//Delete (a circle) from (a user)
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

//To draw (a user) into (a circle)
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



//To quite from (a relationship circle).
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


//View a list of friends
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

//(a user) searches for accounts (user name? ID? Email address?
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

//(user) add (user as friend)!! Make sure that user is the initiator and the status is pending
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

//Delete (a friend) from (a user).
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

//View a friend request
exports.checkFriendsRequests = (req, res) => {
  const id = req.params.id;
  Friend.findAll({
    where: {
      [Op.and]: [
        {
          /*I find that the application seems to be one-way and I define user as the originator so that the friendID holder can view the application
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



//Process (a friend request)!! Here userid is the userid
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

//View the circle list
exports.checkUserRCs = async (req, res) => {
  const id = req.params.id;
  RCMember.findAll({
    where: {
      memberID : id
    } 
  })
    .then(data => {
      //console.log("RCS length:",data.length);
      //console.log("RCS:",data[0].dataValues.RCID);
      var length = data.length;
      var id_names = [];
      
      for(var i=0;i<length;i++){
        var RCID = data[i].dataValues.RCID
        console.log(RCID);
        id_names[i]=RCID;
        
      }

      RC.findAll({
        where: {
              id : id_names
        } 
      }).then(data => {
        
        res.send(data);
      })



      
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user's RCs."
      });
    });
};

//(a user) views (a circle) content - all activity
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



//(a user) views (a dynamic) content - dynamic information
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

//(a user) in the (circle) release (dynamic) take pictures!
exports.createPost = (req, res) => {
  // Validate request
  console.log('requeset body',req.body);
  console.log('requeset body content: ',req.body.posterID);
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
  if (req.file.length === 0) {  //To determine whether the file exists, you can also do this in the front-end code
    res.render("error", {message: "上传文件不能为空！"});
    return;
  } 
  else {
    let file = req.file;
    let fileInfo = {};
    console.log(file);
    //can rename it here
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.originalname);
    //I choose to add a file suffix to the garbled name, otherwise it won't open
    const extname = path.extname(file.originalname)
    const fileName =  file.filename + extname;
    fs.renameSync('./upload/' + file.filename, './upload/' + fileName);
    // get File Details
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
    console.log("post",post);
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

//Post (a user) to (a circle) without pictures
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

//Delete from (a circle) (a user)
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

//(a user) posts (comments) on (a news feed)
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

//Delete (a comment) in (a dynamic)
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

//(a user) thumbs up (a feed)
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


//To unlike (a user) in (a dynamic)

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



//View all comments on (an activity)
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

//View all the likes for (an activity)
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

//To view (a circle).
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


//Check whether the mailbox is registered
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



//Send mail and record the mailbox - verification code
//nodemailer For mailbox authentication: npm install nodemailer
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
  //Configuring Related Parameters
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
    <i style="color: red">此邮件为系统自动发送，请勿回复！若您没有进行注册请忽略</i>   
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

//Verification mailbox - verification code

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


//upload photo as avatar
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


//4.17 new api：

//Sending circle invitations
exports.sendRcRequest = (req, res) => {
  const request = {
    userID : req.body.userID,
    inviterID : req.body.inviterID,
    RCID : req.body.RCID
  };
  // Save user in the database
  rcRequest.create(request)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the request."
      });
    }); 
} 

//Viewing the Invitation List
exports.checkRcRequests = (req, res) => {
  const id = req.params.id;
  rcRequest.findAll({
    where: {
      userID : id
    } 
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find RcRequests towards user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error finding RcRequests towards user with id=" + id
      });
    });
};


//dealing invitations
exports.handleRcRequest = (req, res) => {
  const request = {
    id : req.body.id,
    action : req.body.action
    
  };
  
  rcRequest.findByPk(request.id)
  .then(data => {
    if(request.action=="approve"){
      //添加到rc
      console.log("approve",data);
      // Create a rcMember
      const rcMember = {
        RCID: data.RCID,
        memberID: data.userID
      };
      rcRequest.destroy({
        where: { id: request.id }
      })
      // Save rcMember in the database
      RCMember.create(rcMember).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the rcMember."
        });
      }); 

      
    }
    else if(request.action=="deny"){
      rcRequest.destroy({
        where: { id: request.id }
      })
      res.send("denied");
    }
    else{
      res.status(404).send({
        message: `invalide action`
      })
    }
    
  })
  .catch(err => {
    res.status(500).send({
      message: "Error finding request with id=" + request.id
    });
  });

} 


//4.18 new api：
//Obtain a user id through the user's mailbox
exports.getIDViaEmail = (req, res) => {
  const email = req.body.userEmail;
  User.findAll({
    where: {
      userEmail : email
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
}

//Show friend request (with applicant's personal information)
exports.checkFRinDetail = (req, res) => {
  const id = req.params.id;
  Friend.findAll({
    where: {
      [Op.and]: [
        {
          friendID : id
        },
        { 
          validateState : "pending"
        }
     ]
    } 
  })
    .then(data => {
      var length = data.length;
      var id = [];
      
      for(var i=0;i<length;i++){
        var ID = data[i].dataValues.userID;
        console.log(ID);
        id[i]=ID;
        
      }

      User.findAll({
        where: {
              id : id
        } 
      }).then(data => {
        
        res.send(data);
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user's friends requests."
      });
    });
};




//Show friends list (with friends' personal information)
exports.checkFriendsInDetail = (req, res) => {
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
    var length = data.length;
    var id = [];
    var ownID = req.params.id;
    
    for(var i=0;i<length;i++){
      var ID1 = data[i].dataValues.userID;
      var ID2 = data[i].dataValues.friendID;
      if(ID1==ownID){
        id[i]=ID2;
      }
      else{
        id[i]=ID1;
      }
      
      
    }
    //console.log(id);
    User.findAll({
      where: {
            id : id
      } 
    }).then(data => {
      
      res.send(data);
    })
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user's friends."
      });
    });
};




