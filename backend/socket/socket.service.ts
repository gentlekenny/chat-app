import { Db } from "mongodb";
import { Socket } from "socket.io";
import Chatroom from "../modules/chatroom/chatroom.interface";

export const handleSocketEvents = (socket: Socket, db: Db) => {
    socket.on("send-message", (data) => {
        socket.broadcast.emit("chat-message", data.sender + ": " + data.context)
        // Have to save messages into the database, but this can be done behind the scenes
        // so no need to send a post request, socket can handle it
        db.collection("messages").insertOne(data)
    });
    socket.on("new-user", user => {
        socket.broadcast.emit("user-connected", user)
    })

    // This could have been done with a simple post request, but I am into sockets
    socket.on("chatroom-created", chatroom => {
        const name = chatroom.name
        const user = chatroom.users[0]
        findChatroom(name, db).then(existingChatroom => {
            if (!existingChatroom) {
                db.collection("chatrooms").insertOne(chatroom)
            } else if (!existingChatroom.users?.includes(user)) {
                db.collection("chatrooms").findOneAndUpdate({ name }, {
                    $inc: { totalMembers: 1 },
                    $push: { users: user },
                },)
            }
            socket.emit("refresh-chatrooms", user)
        })
    })
}

const findChatroom = async (name: string, db: Db) => {
    const chatroom = await db.collection<Chatroom>("chatrooms").findOne({ name })
    return chatroom
}