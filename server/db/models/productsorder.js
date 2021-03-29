'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsOrder extends Model {
      static associate(models) {
        ProductsOrder.belongsTo(models.Order, {
          foreignKey: 'order_id'
        });
        ProductsOrder.belongsTo(models.Product, {
          foreignKey: 'product_id'
        });        
      }
  };
  ProductsOrder.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qtd: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductsOrder',
  });
  return ProductsOrder;
};