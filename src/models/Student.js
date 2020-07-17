const { Model, DataTypes } = require('sequelize');

class Student extends Model {
  static init(connection) {
    super.init(
      {
        avatar: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        graduation: DataTypes.STRING,
        block: DataTypes.BOOLEAN,
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
    });

    this.belongsToMany(models.Training, {
      foreignKey: 'studentId',
      through: 'StudentsTraining',
      as: 'trainings',
    });
  }
}
module.exports = Student;
