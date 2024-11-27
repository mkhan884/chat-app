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

exports.getMessages = (db, conversation_id) => {
    return new Promise((resolve, reject) => {
        const getMessagesQuery = `
            SELECT messages.conversation_id, messages.sender_id, messages.content, messages.created_at, users.username 
            FROM messages 
            JOIN users ON messages.sender_id = users.id 
            WHERE conversation_id = ?
            ORDER BY messages.created_at ASC;
        `
        db.query(getMessagesQuery, [conversation_id], (err, result) =>{
            if (err){
                return reject(new Error("Unable to fetch messages for this conversation."))
            }
            resolve(result)
        })
    })
}