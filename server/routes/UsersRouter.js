const { Router } = require('express');
const UserController = require('../controller/UserController');
const AuthController = require('../controller/AuthController');

const router = Router();

router.get('/', AuthController.auth, UserController.getAllUsers);
router.get('/:id', AuthController.auth, UserController.getUserById);
router.post('/', UserController.postUser, AuthController.login);
router.put('/:id', AuthController.auth, UserController.putUser);
router.delete('/:id', AuthController.auth, UserController.deleteUser);

module.exports = router;
