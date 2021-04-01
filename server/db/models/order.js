'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        through: 'ProductsOrder',
        as: 'products',
        foreignKey: 'order_id',
        otherKey: 'product_id',
        onDelete: 'CASCADE',
      });
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      client_name: DataTypes.STRING,
      table: DataTypes.INTEGER,
      status: DataTypes.STRING,
      processedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
