const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const UserSessionController = require('./controllers/UserSessionController');
const ProfessorSessionController = require('./controllers/ProfessorSessionController');
const StudentSessionController = require('./controllers/StudentSessionController');
const ProfessorController = require('./controllers/ProfessorController');
const StudentController = require('./controllers/StudentController');
const TrainingController = require('./controllers/TrainingController');
const TrainingPresenceController = require('./controllers/TrainingPresenceController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/:userId', authMiddleware, UserController.show);
routes.post('/users', upload.single('avatar'), UserController.store);
routes.put('/user/:userId', upload.single('avatar'), UserController.update);
routes.post('/users_sessions', UserSessionController.store);

routes.get('/professors', authMiddleware, ProfessorController.index);
routes.get('/professors/:userId', authMiddleware, ProfessorController.show);
routes.post(
  '/professors/:userId',
  upload.single('avatar'),
  authMiddleware,
  ProfessorController.store,
);
routes.put(
  '/professors/:professorId',
  upload.single('avatar'),
  ProfessorController.update,
);
routes.delete('/professors/:professorId', ProfessorController.destroy);
routes.post('/professors_sessions', ProfessorSessionController.store);

routes.get('/students', authMiddleware, StudentController.index);
routes.get('/students/:studentId', authMiddleware, StudentController.show);
routes.post('/register', upload.single('avatar'), StudentController.store);
routes.put(
  '/students/:studentId',
  upload.single('avatar'),
  StudentController.update,
);
routes.delete('/students/:studentId', StudentController.destroy);
routes.post('/students_sessions', StudentSessionController.store);

routes.get('/trainings', authMiddleware, TrainingController.index);
routes.get('/trainings/:trainingId', authMiddleware, TrainingController.show);
routes.post(
  '/trainings/:professorId',
  authMiddleware,
  TrainingController.store,
);
routes.put('/trainings/:trainingId', TrainingController.update);
routes.delete('/trainings/:trainingId', TrainingController.destroy);
routes.post(
  '/presence/:studentId',
  authMiddleware,
  TrainingPresenceController.store,
);

module.exports = routes;
