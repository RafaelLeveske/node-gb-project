const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const Student = require('../models/Student');

module.exports = {
  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    const { email, password } = req.body;

    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.json({ error: 'Incorrect email/password combination.' }, 401);
    }

    const passwordMatched = await compare(password, student.password);

    if (!passwordMatched) {
      return res.json({ error: 'Incorrect email/password combination.' }, 401);
    }

    return res.send({
      student,
      token: genetateToken({ id: student.id }),
    });
  },
};
