'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'restaurant', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Users', 'role')]);
  },
};
