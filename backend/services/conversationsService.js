exports.startConversation = (db, user1_id, user2_id) => { 
    return new Promise ((resolve, reject) => {
        const conversationExistsQuery = `
            SELECT * FROM conversations 
            WHERE (user1_id = ? AND user2_id = ?) OR (user2_id = ? AND user1_id = ?);
        `
        db.query(conversationExistsQuery, [user1_id, user2_id, user2_id, user1_id], (err, result) => {
            if (err){
                return reject(new Error("Server error."))
            }
            if (result.length > 0){
                return reject(new Error("Conversation already exists."))
            }
            const addConversationQuery = `
                INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?);
            `
            db.query(addConversationQuery, [user1_id, user2_id], (err, result) => {
                if(err){
                    return reject(new Error("Server error"))
                }
                const conversationId = result.insertId
                resolve({message: "Successfully created a new conversation", conversationId: conversationId})
            })
        })
    })
}