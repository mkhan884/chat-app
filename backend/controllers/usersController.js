const usersService = require ('../services/usersService')

exports.registerUser = async (req, res) => {
    try{
        await usersService.registerUser(req.db, req.body)
        return res.status(200).send({message: "Successfully created a new user."})
    }
    catch (err){
        if(err.code == 'ER_DUP_ENTRY')
            return res.status(500).send({error: "Username already exists."})
        return res.status(500).send({error: "Unable to create a new account"})
    }
}

exports.loginUser = async (req, res) => {
    try{
        const token = await usersService.loginUser(req.db, req.body)
        return res.status(200).send({message: "Successfully logged in.", token})
    }
    catch (err){
        return res.status(500).send({error: err.message || "Unable to login"})
    }
}

exports.getUserId = async (req, res) =>{
    const username = req.params.username
    try{
        const user_id = await usersService.getUserId(req.db, username)
        return res.status(200).send({user_id})
    }
    catch(err){
        return res.status(500).send({error: err.message || "Unable to get userId for the user."})
    }
}