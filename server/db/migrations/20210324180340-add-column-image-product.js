'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'image', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Products', 'image')]);
  }
};
