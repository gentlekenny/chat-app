import { Db } from "mongodb";
import { UserService } from "./user.service";
import User from "./user.interface";

export class UserController {
    private userService: UserService

    constructor(db: Db) {
        this.userService = new UserService(db)
    }

    async getAllUsers() {
        return await this.userService.getAllUsers()
    }

}