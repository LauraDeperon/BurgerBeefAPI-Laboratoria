'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Users', 'password')]);
  },
};
