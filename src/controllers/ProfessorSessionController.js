const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Professor = require('../models/Professor');

module.exports = {
  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    const { email, password } = req.body;

    const professor = await Professor.findOne({ where: { email } });
    if (!professor) {
      return res.json({ error: 'Incorrect email/password combination.' }, 401);
    }

    const passwordMatched = await compare(password, professor.password);

    if (!passwordMatched) {
      return res.json({ error: 'Incorrect email/password combination.' }, 401);
    }

    return res.send({
      professor,
      token: genetateToken({ id: professor.id }),
    });
  },
};
