const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reply = sequelize.define('Reply', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'replies',
  timestamps: false
});

module.exports = Reply;
