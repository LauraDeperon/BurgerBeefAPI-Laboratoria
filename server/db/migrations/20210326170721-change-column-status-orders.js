'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Orders', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pending"
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Orders', 'status')]);
  }
};
