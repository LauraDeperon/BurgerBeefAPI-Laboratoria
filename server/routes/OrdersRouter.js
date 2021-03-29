const { Router } = require('express');
const OrdersController = require('../controller/OrdersController');
const AuthController = require('../controller/AuthController');

const router = Router();

router.get('/', AuthController.auth, OrdersController.getAllOrders);
router.get('/:orderid', AuthController.auth, OrdersController.getOrderById);
router.post('/', AuthController.auth, OrdersController.postOrder);
router.put('/:orderid', AuthController.auth, OrdersController.putOrder);
router.delete('/:orderid', AuthController.auth, OrdersController.deleteOrder);

module.exports = router;
