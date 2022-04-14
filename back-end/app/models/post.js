module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      posterID: {
        type: Sequelize.INTEGER
      },
      RCID: {
        type: Sequelize.INTEGER
        //unique: true
      },
      postPicSrc: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      mood: {
        type: Sequelize.STRING
      }
    });
    return Post;
  };