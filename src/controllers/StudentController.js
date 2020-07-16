const { uuid } = require('uuidv4');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const authConfig = require('../config/auth');

module.exports = {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  },

  async show(req, res) {
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId, {
      include: {
        association: 'trainings',
        attributes: ['title'],
        through: {
          attributes: [],
        },
      },
    });

    return res.json(student);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    try {
      const { name, email, password, graduation } = req.body;

      const checkStudentExists = await Student.findOne({ where: { email } });
      if (checkStudentExists) {
        return res.json({ error: 'E-mail address already used' }, 401);
      }

      const hashedPassword = await hash(password, 8);

      const student = {
        id: uuid(),
        avatar: req.file.filename,
        name,
        email,
        password: hashedPassword,
        graduation,
      };

      await Student.create(student);

      delete student.password;

      return res.send({
        student,
        token: genetateToken({ id: student.id }),
      });
    } catch (err) {
      return res.status(500).json({ error: 'Student can not be created' });
    }
  },

  async update(req, res) {
    try {
      const { studentId } = req.params;
      const { name, email, password, graduation } = req.body;

      const hashedPassword = await hash(password, 8);

      const student = {
        avatar: req.file.filename,
        name,
        email,
        password: hashedPassword,
        graduation,
      };

      await Student.update(student, {
        where: { id: studentId },
      });

      delete studentId.password;

      return res.status(200).json(student);
    } catch (err) {
      return res.status(500).json({ error: 'Student can not be updated' });
    }
  },

  async destroy(req, res) {
    try {
      const { studentId } = req.params;

      const student = await Student.findByPk(studentId);

      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }

      await student.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({
        error: 'Student can not be excluded',
      });
    }
  },
};
