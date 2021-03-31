'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: 'ProductsOrder',
        as: 'Order',
        foreignKey: 'product_id',
        otherKey: 'order_id',
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      flavor: DataTypes.STRING,
      complement: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
      subtype: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
