exports.sendMessage = (db, conversation_id, sender_id, content) => {
    return new Promise ((resolve, reject) => {
        const validateConversationSenderQuery = `
            SELECT * FROM conversations WHERE id = ? AND (user1_id = ? OR user2_id = ?);
        `
        db.query(validateConversationSenderQuery, [conversation_id, sender_id, sender_id], (err, result) => {
            if(err){
                return reject(new Error("Server error."))
            }
            if(result.length === 0){
                return reject(new Error("Conversation does not exist."))
            }
            const addMessageQuery = `
                INSERT INTO messages (conversation_id, sender_id, content) VALUES (?,?,?);
            ` 
            db.query(addMessageQuery, [conversation_id, sender_id, content], (err, result) =>{
                if (err){
                    return reject(new Error ("Server error while sending message."))
                }
                resolve("Message sent")
            })
        })

    })
}