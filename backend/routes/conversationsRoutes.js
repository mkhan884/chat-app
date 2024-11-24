const express = require('express')
const router = express.Router()
const conversationsController = require('../controllers/conversationsController')

router.post('/start', conversationsController.startConversation)


module.exports = router