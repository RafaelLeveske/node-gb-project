const Training = require('../models/Training');

module.exports = {
  async store(req, res) {
    const { trainingId } = req.params;

    const training = await Training.findByPk(trainingId);

    if (!training) {
      return res.status(400).send({ error: 'Training not found.' });
    }

    await training.increment('presence');

    return res.json(training);
  },
};
