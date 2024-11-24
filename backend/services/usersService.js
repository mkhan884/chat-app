const passwordHelper = require('../helpers/passwordHelper');
const jwt = require ('jsonwebtoken')

exports.registerUser = async (db, userInfo) => {
    const {username, email, password} = userInfo;
    const hashedPassword = await passwordHelper.createHash(password);

    return new Promise((resolve, reject) => {
        db.query("INSERT INTO users (username, email, password) VALUES(?, ?, ?)", [username, email, hashedPassword], (err, result) =>{
            if(err){
                return reject(err)
            }
            resolve(result)
        })
    })
}

exports.loginUser = async (db, userInfo) => {
    const {username, password} = userInfo
    return new Promise((resolve, reject)=>{
        db.query("SELECT username, password FROM users WHERE username = ?", [username], async (err, result) =>{
            if(err){
                return reject(new Error("Server error."))
            }
            if(result.length === 0){
                return reject(new Error("User does not exist."))
            }
            const hashedPassword = result[0].password
            const passwordMatch = await passwordHelper.verify(password, hashedPassword)
            if(!passwordMatch){
                return reject(new Error("Invalid credentials"))
            }
            const token = jwt.sign(
                {username: result[0].username},
                process.env.KEY
            )
            resolve(token);
        })
    })
}

exports.getUserId = async (db, username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT id FROM users WHERE username = ?", [username], (err,result) => {
            if(err){
                return reject(new Error("Server error"))
            }
            if(result.length === 0){
                return reject(new Error("User does not exist."))
            }
            const id = result[0].id
            resolve(id)
        })
    })
}