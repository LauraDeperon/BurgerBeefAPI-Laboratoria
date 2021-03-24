'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Products', 'subtype', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Products', 'subtype')]);
  }
};
