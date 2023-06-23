import { Db } from "mongodb";
import User from "./user.interface";
import bcrypt from "bcrypt"
import { InvalidPasswordError } from "../../errors/invalidPassword.error";
import jwt from "jsonwebtoken"

export class UserService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async createUser(userDto: User) {

        // Hashing password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(userDto.password, saltRounds)
        userDto.password = hashedPassword

        const newUser = {
            ...userDto, chatRooms: []
        }
        const result = await this.db.collection<User>("users").insertOne(newUser)
        return result
    }

    async getAllUsers() {
        const result = await this.db.collection<User>("users").find().toArray()
        return result
    }

    async login(user: User) {
        const username = user.username

        // Finding user in database 
        const dbUser = await this.db.collection<User>("users").findOne({ username })
        if (!dbUser) {
            throw new Error("User does not exist")
        }
        const comparePassword = await bcrypt.compare(user.password, dbUser.password)
        if (!comparePassword) {
            return new InvalidPasswordError()
        }

        const token = jwt.sign({ username: username }, "secret", {
            expiresIn: "1h"
        })
        return {
            accessToken: token
        }
    }

    async checkIfUsernameExists(username: string) {
        const user = await this.db.collection<User>("users").findOne({ username })
        if (user) {
            return true
        }
        return false
    }

}