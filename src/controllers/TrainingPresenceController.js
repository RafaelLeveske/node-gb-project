const Student = require('../models/Student');
const Training = require('../models/Training');

module.exports = {
  async store(req, res) {
    const { studentId } = req.params;
    const { trainingId } = req.body;

    const student = await Student.findByPk(studentId, {
      include: {
        association: 'trainings',
        attributes: ['id', 'title'],
        through: {
          attributes: [],
        },
      },
    });
    const training = await Training.findByPk(trainingId, {
      include: {
        association: 'students',
        attributes: ['id', 'avatar', 'name'],
        through: {
          attributes: [],
        },
      },
    });

    const { presence, presential } = training;

    if (presential === true) {
      if (presence === 5) {
        return res
          .status(401)
          .json({ error: 'Sorry training has reached its presentials limits' });
      }
    }

    if (!student) {
      return res.status(400).json({ error: 'Student not Found' });
    }

    await student.addTraining(training);

    if (student.hasTraining(training)) {
      await training.increment('presence');
    }

    return res.json(training);
  },
};
