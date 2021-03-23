const getAllUsers = (req, res, next) => {
  Model.User.findAll({
    attributes: {
      exclude: ['password'],
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findAll({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['password'],
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch(next);
};

const postUser = (req, res, next) => {
  const {name, email, password, role, restaurant} = req.body
  User.create({name, email, password, role, restaurant})
    .then((result) => {
      res.send("Usuário criado com sucesso")
    })
    .catch(next);
};

const putUser = (req, res, next) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['password'],
    },
  })
    .then((result) => {
      res.send("Usuário alterado com sucesso")
    })
    .catch(next);
};

const deleteUser = (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((result) => {
    res.send("Usuário excluído com sucesso")
  })
  .catch(next);
};

module.exports = { getAllUsers, getUserById, postUser, putUser, deleteUser };
