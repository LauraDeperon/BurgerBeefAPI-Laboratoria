const { Router } = require('express');
const AuthController = require('../controller/AuthController');

const router = Router();

router.post('/', AuthController.authUser);

module.exports = router;
