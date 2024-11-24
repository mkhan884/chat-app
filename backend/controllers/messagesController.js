const messagesService = require('../services/messagesService')
const usersService = require('../services/usersService')

exports.sendMessage = async (req, res) =>{
    try{
        const {conversation_id, username, content} = req.body
        const sender_id = await usersService.getUserId(req.db, username)
        const result = await messagesService.sendMessage(req.db, conversation_id, sender_id, content)
        res.status(200).send({message: result})
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
}