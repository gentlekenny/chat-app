import { Db } from "mongodb";
import { UserService } from "./user.service";
import { ChatroomService } from "../chatroom/chatroom.service";

export class UserController {
    private userService: UserService
    private chatroomService: ChatroomService

    constructor(db: Db) {
        this.userService = new UserService(db)
        this.chatroomService = new ChatroomService(db)
    }

    async getAllUsers() {
        return await this.userService.getAllUsers()
    }

    async createChatroom(userId: string, name: string) {
        const chatroom = await this.chatroomService.createChatroom(name)
        const updatedUser = await this.userService.joinChatroom(userId, chatroom.insertedId.toString())
        return updatedUser
    }

    async joinChatroom(userId: string, roomId: string) {
        const response = await this.userService.joinChatroom(userId, roomId)
        await this.chatroomService.updateMemberNumber(roomId, true)
        return response
    }

    async leaveChatroom(userId: string, roomId: string) {
        const response = await this.userService.leaveChatroom(userId, roomId)
        await this.chatroomService.updateMemberNumber(roomId, false)
        return response
    }

}