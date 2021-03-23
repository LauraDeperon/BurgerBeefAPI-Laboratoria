const Model = require('../db/models');

const getAllProducts = (req, res) => {
  console.log("Lista de todos os produtos!")
  res.send("Request getAllProducts feita")
}

const getProduct = (req, res) => {
  console.log("Produto #id")
  res.send("Request getProduct feita")
}

const postProduct = (req, res) => {
  console.log("Produto criado com sucesso")
  res.send("Request postProduct feita")
}

const putProduct = (req, res) => {
  console.log("Produto #id alterado com sucesso")
  res.send("Request putProductfeita")
}

const deleteProduct = (req, res) => {
  console.log("Produto #id excluído com sucesso")
  res.send("Request deleteProduct feita")
}

module.exports = { getAllProducts, getProduct, postProduct, putProduct, deleteProduct }