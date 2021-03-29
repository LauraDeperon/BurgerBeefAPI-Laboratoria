'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductsOrder, {
        foreignKey: 'product_id',
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
