module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentsTraining', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      studentId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Students',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      trainingId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Trainings',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('StudentsTraining');
  },
};
