const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Professor = require('../models/Professor');

const connection = new Sequelize(dbConfig);

User.init(connection);
Professor.init(connection);

User.associate(connection.models);
Professor.associate(connection.models);

module.exports = connection;
