module.exports = (sequelize, Sequelize) => {
    const friends = sequelize.define("friend", {
      userID: {
        type: Sequelize.INTEGER
      },
      friendID: {
        type: Sequelize.INTEGER
        //unique: true
      },
      validateState: {
        type: Sequelize.STRING
        //unique: true
      }
    });
    return friends;
  };