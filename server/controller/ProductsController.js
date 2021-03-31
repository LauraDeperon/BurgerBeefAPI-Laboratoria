const Model = require('../db/models');

const getAllProducts = (req, res) => {
  Model.Product.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ code: 500, message: err.message });
    });
};

const getProductById = (req, res) => {
  Model.Product.findOne({
    where: {
      id: req.params.productid,
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ code: 500, message: err.message });
    });
};

const postProduct = (req, res) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Model.Product.create({
    name,
    flavor,
    complement,
    price,
    image,
    type,
    subtype,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ code: 500, message: err.message });
    });
};

const putProduct = (req, res) => {
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
    .catch((err) => {
      return res.status(400).json({ code: 500, message: err.message });
    });
};

const deleteProduct = (req, res) => {
  Model.Product.destroy({
    where: {
      id: req.params.productid,
    },
  })
    .then(() => {
      res.status(200).send('Produto excluído com sucesso');
    })
    .catch((err) => {
      return res.status(400).json({ code: 500, message: err.message });
    });
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
