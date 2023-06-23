import { Db } from "mongodb";
import User from "./user.interface";
import { UserNotFoundError } from "../../errors/userDoesNotExist.error";

export class UserService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async getAllUsers() {
        const result = await this.db.collection<User>("users").find({}, { projection: { password: 0 } }).toArray()
        return result
    }

    async findUser(id: string) {
        const user = await this.db.collection<User>("users").findOne({ id })
        return user;
    }

    async joinChatroom(userId: string, newChatroom: string) {
        const user = await this.findUser(userId)
        if (!user) {
            return new UserNotFoundError()
        }
        // Typescript requieres this assertion
        const chatrooms = user.chatrooms
        if (chatrooms) {
            user.chatrooms = [...chatrooms, newChatroom]
        }

        const updatedUser = this.updateUser(userId, user)
        return updatedUser
    }

    async leaveChatroom(userId: string, deletedChatroom: string) {
        const user = await this.findUser(userId)
        if (!user) {
            return new UserNotFoundError()
        }

        // Typescript requieres this assertion
        const chatrooms = user.chatrooms
        if (chatrooms) {
            user.chatrooms = chatrooms.filter((room) => room !== deletedChatroom)
        }

        const updatedUser = this.updateUser(userId, user)
        return updatedUser
    }

    async updateUser(userId: string, updatedUser: User) {
        const updateUser = await this.db.collection("users").findOneAndReplace({ userId }, updatedUser)
        return updateUser
    }

}