const bcrypt = require('bcrypt');

async function createHash(userPassword){
    const saltRounds = 10
    try{
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        return hashedPassword;
    }
    catch(err){
        console.error(err)
    }
}

async function verify(userPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, hashedPassword);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

module.exports = {createHash, verify};