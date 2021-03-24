const Model = require('../db/models');

const getAllProducts = (req, res, next) => {
  Model.Product.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const getProductById = (req, res, next) => {
  Model.Product.findAll({
    where: {
      id: req.params.productid,
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const postProduct = (req, res, next) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Model.Product.create({ name, flavor, complement, price, image, type, subtype })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const putProduct = (req, res, next) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Model.Product.create(
    { name, flavor, complement, price, image, type, subtype },
    {
      where: {
        id: req.params.productid,
      },
    }
  )
    .then(() => {
      res.status(200).send('Produto alterado com sucesso');
    })
    .catch(next);
};

const deleteProduct = (req, res, next) => {
  Model.Product.destroy({
    where: {
      id: req.params.productid,
    },
  })
    .then(() => {
      res.status(200).send('Produto excluído com sucesso');
    })
    .catch(next);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
