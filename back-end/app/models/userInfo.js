module.exports = (sequelize, Sequelize) => {
    //this defines the name of the table ,plus a "s"
  const userInfo = sequelize.define("userInfo", {
      userName: {
        type: Sequelize.STRING
      },
      userEmail: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      }
    });
    return userInfo;
  };