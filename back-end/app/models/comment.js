module.exports = (sequelize, Sequelize) => {
    const comment = sequelize.define("comment", {
      commenterID: {
        type: Sequelize.INTEGER
      },
      postID: {
        type: Sequelize.INTEGER
        //unique: true
      },
      RCID: {
        type: Sequelize.INTEGER
        //unique: true
      },
      content: {
        type: Sequelize.STRING
      }
    });
    return comment;
  };