exports.getAllFriends = (db, user_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                CASE 
                    WHEN f.user_id = ? THEN u2.username
                    ELSE u1.username
                END AS friend_username
            FROM 
                friends f
            JOIN 
                users u1 ON f.user_id = u1.id
            JOIN 
                users u2 ON f.friend_id = u2.id
            WHERE 
                (f.user_id = ? OR f.friend_id = ?) 
                AND f.status = 'accepted';
        `;
        db.query(query, [user_id, user_id, user_id], (err, result) =>{
            if(err){
                return reject(new Error("Server error."))
            }
            resolve(result)
        })
    })
}

exports.sendFriendRequest = (db, user_id, friend_id) => {
    return new Promise((resolve, reject) => {
        // Check if the relationship already exists in either direction
        db.query(
            'SELECT * FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)',
            [user_id, friend_id, friend_id, user_id],
            (err, result) => {
                if (err) {
                    return reject(new Error("Server error."));
                }

                if (result.length > 0) {
                    return reject(new Error("Friend request already exists or is reversed."));
                }

                // Insert the new friend request
                db.query(
                    'INSERT INTO friends (user_id, friend_id, status) VALUES (?, ?, "pending")',
                    [user_id, friend_id],
                    (err, result) => {
                        if (err) {
                            return reject(new Error("Server error."));
                        }
                        resolve(true);
                    }
                );
            }
        );
    });
};

exports.respondFriendRequest = (db, user_id, friend_id, status) => {
    return new Promise((resolve, reject) => {
        // Check friends table for requests that are pending and where the current user is the one that received it
        const checkFriendRequestExistQuery = `
            SELECT * FROM friends WHERE friend_id = ? AND user_id = ? AND status = "pending";
        `
        db.query(checkFriendRequestExistQuery, [user_id, friend_id, status], (err, result) => {
            if(err){
                return reject(new Error("Server error."))
            }
            if(result.length === 0){
                return reject(new Error("No friend request exists"))
            }
            // Pending friend requests found, now respond with accept or reject.
            if(status === "accepted"){
                const acceptFriendRequestQuery = `
                    UPDATE friends SET status = ? WHERE friend_id = ? AND user_id = ?;
                `
                db.query(acceptFriendRequestQuery, [status, user_id, friend_id], (err, result)=>{
                    if(err){
                        return reject(new Error("Server error."))
                    }
                    resolve(status)
                })
            }
            if(status === "rejected"){
                const rejectFriendRequestQuery = `
                    DELETE FROM friends WHERE user_id = ? AND friend_id = ? and status = "pending";
                `
                db.query(rejectFriendRequestQuery, [friend_id, user_id], (err, result) => {
                    if(err){
                        return reject(new Error("Server error."))
                    }
                    resolve(status)
                })
            }
        })
    })
}

