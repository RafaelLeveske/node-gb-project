const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Student = require('../models/Student');
const Professor = require('../models/Professor');
const Training = require('../models/Training');

const connection = new Sequelize(dbConfig);

User.init(connection);
Professor.init(connection);
Student.init(connection);
Training.init(connection);

User.associate(connection.models);
Professor.associate(connection.models);
Training.associate(connection.models);

module.exports = connection;
