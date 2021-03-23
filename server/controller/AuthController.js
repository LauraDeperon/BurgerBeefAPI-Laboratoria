const authUser = (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ['password'],
    },
  })
    .then((result) => {
      res.json(result);
      console.log(req);
    })
    .catch(next);
};

module.exports = { authUser };
