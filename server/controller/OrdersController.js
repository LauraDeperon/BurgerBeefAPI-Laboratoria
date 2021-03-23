const Model = require('../db/models');

const getAllOrders = (req, res) => {
  console.log("Lista de todos os pedidos!")
  res.send("Request getAllOrders feita")
}

const getOrder = (req, res) => {
  console.log("Pedido #id")
  res.send("Request getOrder feita")
}

const postOrder = (req, res) => {
  console.log("Pedido criado com sucesso")
  res.send("Request postOrder feita")
}

const putOrder = (req, res) => {
  console.log("Pedido #id alterado com sucesso")
  res.send("Request postOrderfeita")
}

const deleteOrder = (req, res) => {
  console.log("Pedido #id excluído com sucesso")
  res.send("Request deleteOrder feita")
}

module.exports = { getAllOrders, getOrder, postOrder, putOrder, deleteOrder }