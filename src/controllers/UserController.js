const { uuid } = require('uuidv4');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    delete users.password;

    return res.json(users);
  },
  async show(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    return res.json(user);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    const { name, email, password } = req.body;

    const checkUserExists = await User.findOne({ where: { email } });
    if (checkUserExists) {
      return res.json({ error: 'E-mail address already used' }, 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = {
      id: uuid(),
      avatar: req.file.filename,
      name,
      email,
      password: hashedPassword,
    };

    await User.create(user);

    delete user.password;

    return res.send({
      user,
      token: genetateToken({ id: user.id }),
    });
  },
};
