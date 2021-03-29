'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('ProductsOrders', {
      fields: ['product_id'],
      type: 'foreign key',
      references: {
        table: 'Products',
        field: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ProductsOrders', {
      fields: ['product_id'],
      type: 'foreign key',
      references: {
        table: 'Products',
        field: 'id'
      }
    })
  }
};