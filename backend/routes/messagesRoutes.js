const express = require('express')
const router = express.Router()
const messagesController = require ('../controllers/messagesController')

router.post('/send', messagesController.sendMessage)
router.get('/get-messages/:conversation_id', messagesController.getMessages)

module.exports = router