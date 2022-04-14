module.exports = (sequelize, Sequelize) => {
    //this defines the name of the table ,plus a "s"
  const emailCode = sequelize.define("emailCode", {
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      code: {
        type: Sequelize.INTEGER
      }
    });
    return emailCode;
  };