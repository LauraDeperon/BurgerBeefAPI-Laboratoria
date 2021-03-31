const Model = require('../db/models');

const getAllOrders = (req, res) => {
  Model.Order.findAll({
    include: [
      {
        model: Model.ProductsOrder,
        as: 'productsOrder',
        required: false,
        attributes: ['id', 'qtd'],
      },
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });    })
};

const getOrderById = (req, res) => {
  Model.Order.findOne({
    where: {
      id: req.params.orderid,
    },
    include: [
      {
        model: Model.Product,
        as: 'products',
        required: false,
        attributes: ['id', 'name', 'type', 'price', 'flavor', 'complement'],
        through: {
          model: Model.ProductsOrder,
          as: 'productsOrders',
          attributes: ['qtd'],
        },
      },
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });    })
};

const postOrder = (req, res) => {
  Model.Order.create(req.body)
  .then(() => {

    req.body.products
      .map((item) => {
        Model.Product.findOne({
          where: {
            id: item.id,
          },
        });
  
        const itemProductOrder = {
          order_id: postOrder.id,
          product_id: item.id,
          qtd: item.qtd,
        };
  
        Model.ProductsOrder.create(itemProductOrder);
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch ((err)=> {
        return res.status(400).json({ code:500, message: err.message });    })
  })
  .catch ((err)=> {
    return res.status(400).json({ code:500, message: err.message });    })
};

const putOrder = (req, res) => {
  Model.Order.update(req.body, {
    where: {
      id: req.params.orderid,
    },
  })
    .then(() => {
      res.status(200).send('Pedido alterado com sucesso');
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });    })
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
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });    })
  Model.ProductsOrder.destroy({
    where: {
      order_id: req.params.orderid,
    },
  })
    .then(() => {
      res.status(200).send('Produto excluído com sucesso');
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });    })
};

module.exports = {
  getAllOrders,
  getOrderById,
  postOrder,
  putOrder,
  deleteOrder,
};
