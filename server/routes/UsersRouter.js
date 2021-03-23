const { Router } = require('express')
const UserController = require('../controller/UserController')

const router = Router()

router.get("/", UserController.getAllUsers)
router.get("/:id", UserController.getUserById)
router.post("/", UserController.postUser)
router.put("/:id", UserController.putUser)
router.delete("/:id", UserController.deleteUser)

module.exports = router