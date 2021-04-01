const Model = require('./server/db/models')

const validationEmptyorNull = (parametro, res, parametro2) => {
  if (parametro == '' || parametro == null || parametro == ' ') {
    res
      .status(400)
      .json({ code: '400', message: parametro2 + ' can not be empty or null' });
  }
};

const getOrder = (req, res, id) => {
  Model.Order.findOne({
    where: {
      id: id,
    },
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
      if (result === null) {
        return res.status(404).json({ code: 404, message: 'Order not found!' });
      }

      result = result.toJSON();

      const orderedItems = result.Product.map((product) => ({
        ...product,
        qtd: product.qtd.qtd,
      }));

      const completeOrder = {
        ...result,
        Product: orderedItems,
      };

      return res.status(200).json(completeOrder);
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

module.exports = { validationEmptyorNull, getOrder }