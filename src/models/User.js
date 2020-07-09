const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init(
      {
        avatar: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Professor, {
      foreignKey: 'userId',
      as: 'professors',
    });
  }
}
module.exports = User;
