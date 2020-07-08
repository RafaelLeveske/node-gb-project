const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const ProfessorsController = require('./controllers/ProfessorController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get('/users', authMiddleware, UserController.index);

routes.post('/users', upload.single('avatar'), UserController.store);

routes.post('/sessions', SessionController.store);

routes.get(
  '/users/:userId/professors',
  authMiddleware,
  ProfessorsController.index,
);
routes.post(
  '/users/:userId/professors',
  authMiddleware,
  upload.single('avatar'),
  ProfessorsController.store,
);

module.exports = routes;
