const Model = require('../db/models');

const getAllUsers = (req, res, next) => {
  Model.User.findAll({
    attributes: {
      exclude: ['password'],
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  Model.User.findAll({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['password'],
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const postUser = (req, res, next) => {
  const { name, email, password, role, restaurant } = req.body;
  if (
    req.body.email !== '' &&
    req.body.password !== '' &&
    req.body.role !== '' &&
    req.body.restaurant !== ''
  ) {
    Model.User.create({ name, email, password, role, restaurant })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next);
  } else {
    res.send('Missing required data');
  }
};

const putUser = (req, res, next) => {
  const { name, email, password, role, restaurant } = req.body;
  Model.User.update(
    { name, email, password, role, restaurant },
    {
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ['password'],
      },
    }
  )
    .then(() => {
      res.status(200).send('Usuário alterado com sucesso');
    })
    .catch(next);
};

const deleteUser = (req, res, next) => {
  Model.User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send('Usuário excluído com sucesso');
    })
    .catch(next);
};

module.exports = { getAllUsers, getUserById, postUser, putUser, deleteUser };
