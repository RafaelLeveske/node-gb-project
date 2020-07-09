const { Model, DataTypes } = require('sequelize');

class Training extends Model {
  static init(connection) {
    super.init(
      {
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        url: DataTypes.STRING,
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
  }
}

module.exports = Training;
