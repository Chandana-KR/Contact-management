const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'contactManagement.db',
});

module.exports = sequelize;
