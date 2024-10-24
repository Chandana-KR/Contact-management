const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    resetCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = User;
