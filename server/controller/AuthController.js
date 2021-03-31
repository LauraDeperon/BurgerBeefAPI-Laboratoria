const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Bearer } = require('permit');

const Model = require('../db/models');

const permit = new Bearer();

module.exports = {
  login(req, res) {
    const { email, password } = req.body;

    Model.User.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (!user)
        return res.status(400).json({ code: 400, message: 'email not found' });
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ code: 401, message: 'invalid password' });
      }
      let jwtPayload = { email: user.email, id: user.id };
      let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

      return res
        .status(200)
        .json({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          restaurant: user.restaurant,
          token,
        });
    });
  },

  auth(req, res, next) {
    // Try to find the bearer token in the request.
    const token = permit.check(req);

    // No token found, so ask for authentication.
    if (!token) {
      permit.fail(res);
      return res.status(401).json({ error: "authentication required!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        permit.fail(res);
        return res.status(401).json({ error: "failed to authenticate token!" });
      }

      req.id = decoded.id;
      next();
    });
  },
};
