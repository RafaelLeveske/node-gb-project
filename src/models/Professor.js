const { Model, DataTypes } = require('sequelize');

class Professor extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        graduation: DataTypes.STRING,
      },
      {
        sequelize: connection,
      },
    );
  }
}

module.exports = Professor;
