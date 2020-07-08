const { uuid } = require('uuidv4');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const authConfig = require('../config/auth.json');

module.exports = {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    const { name, email, password, graduation } = req.body;

    const checkStudentExists = await Student.findOne({ where: { email } });
    if (checkStudentExists) {
      return res.json({ error: 'E-mail address already used' }, 401);
    }

    const hashedPassword = await hash(password, 8);

    const student = await Student.create({
      id: uuid(),
      avatar: req.file.filename,
      name,
      email,
      password: hashedPassword,
      graduation,
    });
    return res.send({
      student,
      token: genetateToken({ id: student.id }),
    });
  },
};
