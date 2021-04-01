const validationEmptyorNull = (parametro, res, parametro2) => {
  if (parametro == '' || parametro == null || parametro == ' ') {
    res
      .status(400)
      .json({ code: '400', message: parametro2 + ' can not be empty or null' });
  }
};

module.exports = { validationEmptyorNull }