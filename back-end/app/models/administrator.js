module.exports = (sequelize, Sequelize) => {
    const administratorInfo = sequelize.define("administratorInfo", {
        userName: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }     
    });
    return administratorInfo;
};