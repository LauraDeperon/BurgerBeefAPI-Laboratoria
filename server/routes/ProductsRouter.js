const { Router } = require('express');
const ProductsController = require('../controller/ProductsController');
const AuthController = require('../controller/AuthController');

const router = Router();

// aqui vai as requisições
router.get('/', AuthController.auth, ProductsController.getAllProducts);
router.get(
  '/:productid',
  AuthController.auth,
  ProductsController.getProductById
);
router.post('/', AuthController.auth, ProductsController.postProduct);
router.put('/:productid', AuthController.auth, ProductsController.putProduct);
router.delete(
  '/:productid',
  AuthController.auth,
  ProductsController.deleteProduct
);

module.exports = router;
