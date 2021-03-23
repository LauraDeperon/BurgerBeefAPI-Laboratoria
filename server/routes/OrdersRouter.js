const { Router } = require('express');
const OrdersController = require('../controller/OrdersController');

const router = Router();

router.get('/', OrdersController.getAllOrders);
router.get('/:orderid', OrdersController.getOrder);
router.post('/', OrdersController.postOrder);
router.put('/:orderid', OrdersController.putOrder);
router.delete('/:orderid', OrdersController.deleteOrder);

module.exports = router;
