const { uuid } = require('uuidv4');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Professor = require('../models/Professor');
const authConfig = require('../config/auth');

module.exports = {
  async index(req, res) {
    const professors = await Professor.findAll();

    return res.json(professors);
  },

  async show(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: { association: 'professors' },
    });

    return res.json(user);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    try {
      const { userId } = req.params;

      const { name, email, password, graduation } = req.body;

      const checkUserExists = await Professor.findOne({ where: { email } });
      if (checkUserExists) {
        return res.json({ error: 'E-mail address already used' }, 401);
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not Found' });
      }

      const hashedPassword = await hash(password, 8);

      const professor = {
        id: uuid(),
        userId,
        avatar: req.file.filename,
        name,
        email,
        password: hashedPassword,
        graduation,
      };

      await Professor.create(professor);

      delete professor.password;

      return res.send({
        professor,
        token: genetateToken({ id: professor.id }),
      });
    } catch (err) {
      return res.status(500).json({ error: 'Professor can not be created' });
    }
  },

  async update(req, res) {
    try {
      const { professorId } = req.params;
      const { name, email, password, graduation } = req.body;

      const hashedPassword = await hash(password, 8);

      const professor = {
        avatar: req.file.filename,
        name,
        email,
        password: hashedPassword,
        graduation,
      };

      await Professor.update(professor, {
        where: { id: professorId },
      });

      delete professor.password;

      return res.status(200).json(professor);
    } catch (err) {
      return res.status(500).json({ error: 'Professor can not be updated' });
    }
  },

  async destroy(req, res) {
    try {
      const { professorId } = req.params;

      const professor = await Professor.findByPk(professorId);

      if (!professor) {
        return res.status(400).json({ error: 'Professor not found' });
      }

      await professor.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({
        error: 'Professor can not be excluded',
      });
    }
  },
};
