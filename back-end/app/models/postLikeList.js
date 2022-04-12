module.exports = (sequelize, Sequelize) => {
    const postLike = sequelize.define("postLike", {
      postID: {
        type: Sequelize.INTEGER
      },
      likerID: {
        type: Sequelize.INTEGER
        //unique: true
      }
    });
    return postLike;
  };