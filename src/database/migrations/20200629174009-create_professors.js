module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Professors', {
      id: {
        type: Sequelize.UUID,
        primarKey: true,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
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
