import { Db } from "mongodb";
import Message from "./message.interface";

export class MessageService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async sendMessage(message: Message) {
        const newMessage = await this.db.collection<Message>("messages").insertOne(message)
        return newMessage
    }

    async getRecentMessages(receiver: string) {
        // Recent would be 50-100, but for this case I've set limit to 20
        const recentMessages = await this.db.collection<Message>("messages").find({ receiver }).sort({ _id: -1 }).limit(20).toArray()
        return recentMessages
    }
}