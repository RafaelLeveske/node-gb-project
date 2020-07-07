module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Professors', {
      id: {
        type: Sequelize.INTEGER,
        primarKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
          is: /regex_validation/,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      graduation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  down: async queryInterface => {
    return queryInterface.dropTable('Professors');
  },
};
