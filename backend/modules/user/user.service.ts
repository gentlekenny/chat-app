import { Db } from "mongodb";
import User from "./user.interface";
import bcrypt from "bcrypt"
import { InvalidPasswordError } from "../../errors/invalidPassword.error";
import jwt from "jsonwebtoken"
import { UserNotFoundError } from "../../errors/userDoesNotExist.error";
import { UserAlreadyExistsError } from "../../errors/usernameExists.error";

export class UserService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async getAllUsers() {
        const result = await this.db.collection<User>("users").find({}, { projection: { password: 0 } }).toArray()
        return result
    }


}