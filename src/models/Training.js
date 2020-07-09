const { Model, DataTypes } = require('sequelize');

class Training extends Model {
  static init(connection) {
    super.init(
      {
        description: DataTypes.STRING,
        type: DataTypes.STRING,
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
  }
}

module.exports = Training;
