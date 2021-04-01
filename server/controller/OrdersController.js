const Model = require('../db/models');
const Utils = require('../../utils');
const Sequelize = require('sequelize');

const getAllOrders = (req, res) => {
  Model.Order.findAll({
    include: {
      model: Model.Product,
      as: 'products',
      attributes: ['id', 'name', 'flavor', 'complement'],
      through: {
        model: Model.ProductsOrder,
        as: 'qtd',
        attributes: ['qtd'],
      },
    },
  })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Don't have any order created yet!" });
      }

      result = JSON.parse(JSON.stringify(result));

      const returnedOrders = result.map((order) => {
        const productsList = order.products.map((product) => ({
          ...product,
          qtd: product.qtd.qtd,
        }));

        return {
          ...order,
          products: productsList,
        };
      });

      return res.status(200).json(returnedOrders);
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const getOrderById = (req, res) => {
  Utils.getOrder(req, res, req.params.orderid);
};

const postOrder = (req, res) => {
  const { client_name, table, products } = req.body;
  Utils.validationEmptyorNull(req.body.client_name, res, 'Client_name');
  Utils.validationEmptyorNull(req.body.table, res, 'Table');
  Utils.validationEmptyorNull(req.body.products, res, 'Products');
  Model.Order.create({
    client_name,
    table,
    products,
  })
    .then((result) => {
      req.body.products.map((item) => {
        Model.Product.findOne({
          where: {
            id: item.id,
          },
        })
          .then(() => {
            const itemProductOrder = {
              order_id: result.id,
              product_id: item.id,
              qtd: item.qtd,
            };

            Model.ProductsOrder.create(itemProductOrder)
              .then((result) => {
                Utils.getOrder(req, res, result.order_id);
              })
              .catch((err) => {
                return res
                  .status(400)
                  .json({ code: 400, message: err.message });
              });
          })
          .catch((err) => {
            return res.status(400).json({ code: 400, message: err.message });
          });
      });
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const putOrder = (req, res) => {
  const { status } = req.body;
  Model.Order.findOne({
    where: {
      id: req.params.orderid,
    },
  })
    .then((result) => {
      if (result === null) {
        return res.status(404).json({ code: 404, message: 'Order not found!' });
      } else if (result.status == 'pending') {
        Model.Order.update(
          { status, processedAt: Sequelize.literal('CURRENT_TIMESTAMP') },
          {
            where: {
              id: req.params.orderid,
            },
          }
        )
          .then(() => {
            Utils.getOrder(req, res, req.params.orderid);
          })
          .catch((err) => {
            return res.status(400).json({ code: 400, message: err.message });
          });
      } else {
        Model.Order.update(
          { status },
          {
            where: {
              id: req.params.orderid,
            },
          }
        )
          .then(() => {
            Utils.getOrder(req, res, req.params.orderid);
          })
          .catch((err) => {
            return res.status(400).json({ code: 400, message: err.message });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const deleteOrder = (req, res) => {
  Model.Order.findOne({
    where: {
      id: req.params.orderid,
    },
  })
    .then((result) => {
      if (result !== null) {
        Model.Order.destroy({
          where: {
            id: req.params.orderid,
          },
        });
        return res.status(200).json(result);
      }
      return res.status(404).json({ code: 404, message: 'Order not found!' });
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

module.exports = {
  getAllOrders,
  getOrderById,
  postOrder,
  putOrder,
  deleteOrder,
};
