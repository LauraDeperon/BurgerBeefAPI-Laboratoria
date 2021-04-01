const Model = require('../db/models');
const Utils = require('../../utils');

const getAllOrders = (req, res) => {
  Model.Order.findAll({
    include: {
      model: Model.Product,
      as: 'Product',
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
          .json({ code: 404, message: "Don't have any user created yet!" });
      }

      result = JSON.parse(JSON.stringify(result));

      const returnedOrders = result.map((order) => {
        const productsList = order.Product.map((product) => ({
          ...product,
          qtd: product.qtd.qtd,
        }));

        return {
          ...order,
          Product: productsList,
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
  Model.Order.create(req.body)
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
      }
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
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const deleteOrder = (req, res) => {
  Model.Order.destroy({
    where: {
      id: req.params.orderid,
    },
  })
    .then(() => {
      res.status(200).send('Produto excluído com sucesso');
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
  Model.ProductsOrder.destroy({
    where: {
      order_id: req.params.orderid,
    },
  })
    .then(() => {
      res.status(200).send('Produto excluído com sucesso');
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
