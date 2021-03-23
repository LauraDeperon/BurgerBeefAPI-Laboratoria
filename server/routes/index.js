const { Router } = require('express');
const UsersRouter = require('./UsersRouter.js');
// const ProductsRouter = require('./ProductsRouter.js');
// const OrdersRouter = require('./OrdersRouter.js');
// const AuthRouter = require('./AuthRouter.js');

const router = Router();

router.use('/users', UsersRouter);
// router.use('/products', ProductsRouter);
// router.use('/orders', OrdersRouter);
// router.use('/auth', AuthRouter);

module.exports = router;
