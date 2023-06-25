import { Socket } from "socket.io";

export const handleSocketEvents = (socket: Socket) => {
    socket.on("send-message", (data) => {
        socket.broadcast.emit("chat-message", data.user + ": " + data.message)
    });
    socket.on("new-user", user => {
        socket.broadcast.emit("user-connected", user)
    })
}