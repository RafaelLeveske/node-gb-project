module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trainings', {
      id: {
        type: Sequelize.UUID,
        primarKey: true,
        allowNull: false,
        unique: true,
      },
      professorId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Professors',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      description: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING(1234),
        allowNull: true,
      },
      presence: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
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
    return queryInterface.dropTable('Trainings');
  },
};
