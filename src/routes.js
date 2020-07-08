const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const UserSessionController = require('./controllers/UserSessionController');
const ProfessorSessionController = require('./controllers/ProfessorSessionController');
const StudentSessionController = require('./controllers/StudentSessionController');
const ProfessorController = require('./controllers/ProfessorController');
const StudentController = require('./controllers/StudentController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get('/users', authMiddleware, UserController.index);

routes.post('/users', upload.single('avatar'), UserController.store);

routes.post('/users/sessions', UserSessionController.store);

routes.post('/professors/sessions', ProfessorSessionController.store);

routes.post('/students/sessions', StudentSessionController.store);

routes.get(
  '/users/:userId/professors',
  authMiddleware,
  ProfessorController.index,
);
routes.post(
  '/users/:userId/professors',
  authMiddleware,
  upload.single('avatar'),
  ProfessorController.store,
);

routes.get('/students', authMiddleware, StudentController.index);

routes.post('/students', upload.single('avatar'), StudentController.store);

module.exports = routes;
