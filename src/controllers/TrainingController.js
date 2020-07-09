const { parseISO } = require('date-fns');
// const moment = require('moment');
const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
const Training = require('../models/Training');
const Professor = require('../models/Professor');
const authConfig = require('../config/auth');

module.exports = {
  async index(req, res) {
    const trainings = await Training.findAll();

    return res.json(trainings);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    const { professorId } = req.params;

    const { description, type, date, time, url } = req.body;

    const parsedDate = parseISO(date);

    const checkTrainingExists = await Training.findOne({
      where: { date, time },
    });
    if (checkTrainingExists) {
      return res.json({ error: 'Training is already booked' }, 401);
    }

    const professor = await Professor.findByPk(professorId);

    if (!professor) {
      return res.status(400).json({ error: 'User not Found' });
    }

    const training = await Training.create({
      id: uuid(),
      professorId,
      description,
      type,
      date: parsedDate,
      time,
      url,
      presence: 0,
    });

    return res.send({
      training,
      token: genetateToken({ id: training.id }),
    });
  },
};
