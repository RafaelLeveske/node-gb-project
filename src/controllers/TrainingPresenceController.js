const Student = require('../models/Student');
const Training = require('../models/Training');

module.exports = {
  async store(req, res) {
    try {
      const { studentId } = req.params;
      const { trainingId, presential, online } = req.body;

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

      if (student.block === true) {
        return res.status(401).json({
          error: 'Access restrict',
        });
      }

      if (training.online === false && online === true) {
        return res
          .status(401)
          .json({ error: 'This training its only presential' });
      }

      if (training.presence < training.limit && presential === true) {
        await training.increment('presence');
      }

      if (training.presence >= training.limit && presential === true) {
        await res
          .status(401)
          .json({ message: 'Training has reached its presentials limits' });
      }

      if (!student) {
        return res.status(400).json({ error: 'Student not Found' });
      }

      await student.addTraining(training);

      return res.json(training);
    } catch (err) {
      return res.status(500).json({ error: 'Presence can not be confirmed' });
    }
  },
};
