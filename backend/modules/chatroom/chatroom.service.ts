import { Db } from "mongodb";
import Chatroom from "./chatroom.interface";

export class ChatroomService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async getAllChatrooms() {
        const chatrooms = await this.db.collection<Chatroom>("chatrooms").find({}).toArray()
        return chatrooms
    }

    async createChatroom(name: string) {
        // When someone creates a chatroom, it will have one member
        const newChatroom = {
            name: name,
            totalMembers: 1
        }
        const savedChatroom = await this.db.collection<Chatroom>("chatrooms").insertOne(newChatroom)

        return savedChatroom
    }

    async updateMemberNumber(roomId: string, increasing: boolean) {
        // Calling this method only if someone joins or leaves chatroom
        const room = await this.db.collection<Chatroom>("chatrooms").findOne({ roomId })
        var numberOfMembers = room?.totalMembers
        if (numberOfMembers) {
            if (increasing) {
                numberOfMembers = numberOfMembers + 1
            } else {
                numberOfMembers = numberOfMembers - 1
            }
        }
        const updatedRoom = await this.db.collection<Chatroom>("chatrooms").updateOne({ roomId }, {
            totalMembers: numberOfMembers
        })
        return updatedRoom
    }
}