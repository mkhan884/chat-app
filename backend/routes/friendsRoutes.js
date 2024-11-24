const express = require ('express')
const router = express.Router()
const friendsController = require('../controllers/friendsController')

router.get('/get-all-friends/:username', friendsController.getAllFriends)
router.post('/send-friend-request/', friendsController.sendFriendRequest)
router.post('/respond-friend-request', friendsController.respondFriendRequest)

module.exports = router;