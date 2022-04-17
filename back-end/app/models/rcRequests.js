module.exports = (sequelize, Sequelize) => {
    const rcRequests = sequelize.define("rcRequest", {
      userID: {
        type: Sequelize.INTEGER
      },
      inviterID: {
        type: Sequelize.INTEGER
        //unique: true
      },
      RCID: {
        type: Sequelize.INTEGER
        //unique: true
      }
    });
    return rcRequests;
  };