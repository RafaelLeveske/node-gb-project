const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const ProfessorsController = require('./controllers/ProfessorController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.post('/users', upload.single('avatar'), UserController.store);

routes.post('/sessions', authMiddleware, SessionController.store);

routes.get('/professors', authMiddleware, ProfessorsController.index);

module.exports = routes;
