const { uuid } = require('uuidv4');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth.json');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    const { name, email, password, graduation } = req.body;

    const checkUserExists = await User.findOne({ where: { email } });
    if (checkUserExists) {
      return res.json({ error: 'E-mail address already used' }, 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = await User.create({
      id: uuid(),
      name,
      email,
      password: hashedPassword,
      graduation,
    });
    return res.send({
      user,
      token: genetateToken({ id: user.id }),
    });
  },
};
