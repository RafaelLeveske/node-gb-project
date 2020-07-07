const Professor = require('../models/Professor');

module.exports = {
  async index(req, res) {
    const professors = await Professor.findAll();

    return res.json(professors);
  },
};
