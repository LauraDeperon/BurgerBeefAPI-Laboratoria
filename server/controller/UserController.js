const Model = require('../db/models');
const Utils = require('../../utils');
const bcrypt = require('bcrypt');
require('dotenv').config();

const getAllUsers = (req, res) => {
  Model.User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Don't have any user created yet!" });
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const getUserById = (req, res, next) => {
  Model.User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ['password'] },
  })
    .then((result) => {
      if (result !== null) {
        res.status(200).json(result);
      }
      return res.status(404).json({ code: 404, message: 'User not found!' });
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const postUser = (req, res) => {
  const { name, email, role, restaurant } = req.body;
  const password = req.body.password;
  Utils.validationEmptyorNull(req.body.name, res, 'Name');
  Utils.validationEmptyorNull(req.body.email, res, 'Email');
  Utils.validationEmptyorNull(req.body.password, res, 'Password');
  Utils.validationEmptyorNull(req.body.role, res, 'Role');
  Utils.validationEmptyorNull(req.body.restaurant, res, 'Restaurant');
  Model.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((result) => {
    if (result !== null) {
      return res
        .status(403)
        .json({ code: 403, message: 'Email already in use!' });
    }
    return Model.User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      restaurant,
    })
      .then((result) => {
        res.status(200).json({
          id: result.id,
          name: result.name,
          email: result.email,
          role: result.role,
          restaurant: result.restaurant,
        });
      })
      .catch((err) => {
        return res.status(400).json({ code: 400, message: err.message });
      });
  });
};

const putUser = (req, res) => {
  const { name, email, password, role, restaurant } = req.body;
  Model.User.update(
    { name, email, password, role, restaurant },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      getUserById(req, res);
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

const deleteUser = (req, res) => {
  Model.User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ['password'] },
  })
    .then((result) => {
      if (result !== null) {
        res.status(200).json(result);
        Model.User.destroy({
          where: {
            id: req.params.id,
          },
        });
      }
      return res.status(404).json({ code: 404, message: 'User not found!' });
    })
    .catch((err) => {
      return res.status(400).json({ code: 400, message: err.message });
    });
};

module.exports = { getAllUsers, getUserById, postUser, putUser, deleteUser };
