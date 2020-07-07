const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const ProfessorsController = require('./controllers/ProfessorController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();
routes.use(authMiddleware);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.get('/professors', ProfessorsController.index);

module.exports = routes;
