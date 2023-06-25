import { Db } from "mongodb";
import { Socket } from "socket.io";

export const handleSocketEvents = (socket: Socket, db: Db) => {
    socket.on("send-message", (data) => {
        socket.broadcast.emit("chat-message", data.user + ": " + data.message)
        // Have to save messages into the database, but this can be done behind the scenes
        // so no need to send a post request, socket can handle it
        db.collection("messages").insertOne(data)
    });
    socket.on("new-user", user => {
        socket.broadcast.emit("user-connected", user)
    })
}