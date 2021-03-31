const Model = require('../db/models');
const bcrypt = require('bcrypt');
require('dotenv').config();

const getAllUsers = (req, res) => {
  Model.User.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });    })
};

const getUserById = (req, res, next) => {
  Model.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });    });
};

const postUser = (req, res) => {
  const { name, email, role, restaurant } = req.body;
  const password = req.body.password;
  if (req.body.name == '') {
    res.status(400).send({ code: '400', message: 'Name can not be empty' });
  } else if (req.body.email == '') {
    res.status(400).send({ code: '400', message: 'Email can not be empty' });
  } else if (req.body.password == '') {
    res.status(400).send({ code: '400', message: 'Password can not be empty' });
  } else if (req.body.role == '') {
    res.status(400).send({ code: '400', message: 'Role can not be empty' });
  } else if (req.body.restaurant == ' ') {
    res
      .status(400)
      .send({ code: '400', message: 'Restaurant can not be empty' });
  } else {
    Model.User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      restaurant,
    })
      .then((result) => {
        res.status(200).json(result);
        console.log(req.body.name);
      })
      .catch ((err)=> {
        return res.status(400).json({ code:500, message: err.message });      })
  }
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
      res.status(200).send('Usuário alterado com sucesso');
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });
    })
};

const deleteUser = (req, res) => {
  Model.User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send('Usuário excluído com sucesso');
    })
    .catch ((err)=> {
      return res.status(400).json({ code:500, message: err.message });
    })
};

module.exports = { getAllUsers, getUserById, postUser, putUser, deleteUser };
