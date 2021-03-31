'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Orders.belongsToMany(models.Products, {
        through: 'ProductsOrders',
        as: 'Products',
        foreignKey: 'order_id',
        otherKey: 'product_id',
        onDelete: 'CASCADE',
      });
      Orders.belongsTo(models.Users, {
        foreignKey: 'userId',
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
