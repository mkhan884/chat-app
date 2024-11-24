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

exports.getMessages = async (req,res) => {
    try{
        const conversation_id = req.params.conversation_id
        const messages = await messagesService.getMessages(req.db, conversation_id)
        res.status(200).send({messages: messages})
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
}