const express = require ('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.post('/register', usersController.registerUser)
router.post('/login', usersController.loginUser)
router.get('/get-user-id/:username', usersController.getUserId)

module.exports = router;