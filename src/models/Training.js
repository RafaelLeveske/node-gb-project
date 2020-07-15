const { Model, DataTypes } = require('sequelize');

class Training extends Model {
  static init(connection) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        presential: DataTypes.BOOLEAN,
        online: DataTypes.BOOLEAN,
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        url: DataTypes.STRING,
        presence: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Professor, {
      foreignKey: 'professorId',
      as: 'professors',
    });
    this.belongsToMany(models.Student, {
      foreignKey: 'trainingId',
      through: 'StudentsTraining',
      as: 'students',
    });
  }
}

module.exports = Training;
