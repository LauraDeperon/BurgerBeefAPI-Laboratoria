const Model = require('../db/models');
const Utils = require('../../utils');

const getAllProducts = (req, res) => {
  Model.Product.findAll()
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Don't have any product created yet!" });
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const getProductById = (req, res) => {
  Model.Product.findOne({
    where: {
      id: req.params.productid,
    },
  })
    .then((result) => {
      if (result !== null) {
        res.status(200).json(result);
      }
      return res.status(404).json({ code: 404, message: 'Product not found!' });
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const postProduct = (req, res) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Utils.validationEmptyorNull(req.body.name, res, 'Name');
  Utils.validationEmptyorNull(req.body.price, res, 'Price');
  Utils.validationEmptyorNull(req.body.type, res, 'Type');
  Utils.validationEmptyorNull(req.body.subtype, res, 'SubType');
  Model.Product.findOne({
    where: {
      name: req.body.name,
    },
  }).then((result) => {
    if (result !== null) {
      return res
        .status(403)
        .json({ code: 403, message: 'Product already created!' });
    }
    return Model.Product.create({
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
        return res.status(400).json({ code: 400, message: err.message });
      });
  });
};

const putProduct = (req, res) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Model.Product.update(
    { name, flavor, complement, price, image, type, subtype },
    {
      where: {
        id: req.params.productid,
      },
    }
  )
    .then(() => {
      getProductById(req, res);
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const deleteProduct = (req, res) => {
  Model.Product.findOne({
    where: {
      id: req.params.productid,
    },
  })
    .then((result) => {
      if (result !== null) {
        res.status(200).json(result);
        Model.Product.destroy({
          where: {
            id: req.params.productid,
          },
        });
      }
      return res.status(404).json({ code: 404, message: 'Product not found!' });
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
