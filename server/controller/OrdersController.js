const Model = require('../db/models');

const getAllOrders = (req, res, next) => {
  Model.Order.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const getOrderById = (req, res, next) => {
  Model.Order.findAll({
    where: {
      id: req.params.orderid,
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const postOrder = (req, res, next) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Model.Order.create({ name, flavor, complement, price, image, type, subtype })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const putOrder = (req, res, next) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Model.Order.create(
    { name, flavor, complement, price, image, type, subtype },
    {
      where: {
        id: req.params.orderid,
      },
    }
  )
    .then(() => {
      res.status(200).send('Produto alterado com sucesso');
    })
    .catch(next);
};

const deleteOrder = (req, res, next) => {
  Model.Order.destroy({
    where: {
      id: req.params.orderid,
    },
  })
    .then(() => {
      res.status(200).send('Produto excluído com sucesso');
    })
    .catch(next);
};

module.exports = {
  getAllOrders,
  getOrderById,
  postOrder,
  putOrder,
  deleteOrder,
};
