module.exports = (sequelize, Sequelize) => {
    const member = sequelize.define("member", {
      RCID: {
        type: Sequelize.INTEGER
      },
      memberID: {
        type: Sequelize.INTEGER
        //unique: true
      }
    });
    return member;
  };