const { Router } = require('express')
const ProductsController = require('../controller/ProductsController')

const router = Router()

// aqui vai as requisições
router.get("/", ProductsController.getAllProducts)
router.get("/:productid", ProductsController.getProduct)
router.post("/", ProductsController.postProduct)
router.put("/:productid", ProductsController.putProduct)
router.delete("/productid", ProductsController.deleteProduct)

module.exports = router