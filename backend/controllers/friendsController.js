const friendsService = require('../services/friendsService')
const usersService =  require('../services/usersService')

exports.getAllFriends = async (req,res) => {
    const username = req.params.username;
    try{
        const user_id = await usersService.getUserId(req.db, username)
        const friendsList = await friendsService.getAllFriends(req.db, user_id)
        return res.status(200).send(friendsList)
    }
    catch(err){
        return res.status(500).send({error: err.message})
    }
}

exports.sendFriendRequest = async (req, res) => {
    const {username, friendUsername} = req.body
    try{
        const user_id = await usersService.getUserId(req.db, username)
        const friend_id = await usersService.getUserId(req.db, friendUsername)
        const requestSent = await friendsService.sendFriendRequest(req.db, user_id, friend_id)
        return res.status(200).send({message: requestSent})
    }
    catch(err){
        return res.status(500).send({error: "Unable to send friend request."})
    }
}

exports.respondFriendRequest = async (req,res) =>{
    const {username, friendUsername, status} = req.body
    try{
        const user_id = await usersService.getUserId(req.db, username)
        const friend_id = await usersService.getUserId(req.db, friendUsername)
        const response = await friendsService.respondFriendRequest(req.db, user_id, friend_id, status)
        return res.status(200).send({message: response})
    }
    catch(err){
        return res.status(500).send({err})
    }
}