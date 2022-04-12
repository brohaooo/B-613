module.exports = (sequelize, Sequelize) => {
    const RC = sequelize.define("RC", {
      rcName: {
        type: Sequelize.STRING
      },
      rcOwner: {//owner's userID
        type: Sequelize.INTEGER
        //unique: true
      },
      rcTag: {
        type: Sequelize.STRING
        //unique: true
      }
    });
    return RC;
  };