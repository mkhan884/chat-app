const conversationsService = require('../services/conversationsService')
const usersService = require('../services/usersService')

exports.startConversation = async (req, res) => {
    // When two people are friends they can start messaging so create a conversation
    const {username, friendUsername} = req.body
    try{
        const user1_id = await usersService.getUserId(req.db, username)
        const user2_id = await usersService.getUserId(req.db, friendUsername)
        const result = await conversationsService.startConversation(req.db, user1_id, user2_id)
        return res.status(200).send({message: result.message, conversationId: result.conversationId})
    }
    catch(err){
        return res.status(500).send({error: err.message})
    }
}