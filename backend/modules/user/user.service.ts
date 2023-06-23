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


    async createUser(userDto: User) {

        const username = userDto.username

        // Checking if user with given username already exists
        const dbUser = await this.db.collection<User>("users").findOne({ username })
        if (dbUser) {
            return new UserAlreadyExistsError()
        }

        // Hashing password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(userDto.password, saltRounds)
        userDto.password = hashedPassword

        const newUser = {
            ...userDto, chatRooms: []
        }

        // Inserting new entry into database
        const result = await this.db.collection<User>("users").insertOne(newUser)
        return result
    }


    async getAllUsers() {
        const result = await this.db.collection<User>("users").find({}, { projection: { password: 0 } }).toArray()
        return result
    }


    async login(user: User) {
        const username = user.username

        // Finding user in database 
        const dbUser = await this.db.collection<User>("users").findOne({ username })

        // Checking if user does not exist
        if (!dbUser) {
            return new UserNotFoundError()
        }

        // Comparing password
        const comparePassword = await bcrypt.compare(user.password, dbUser.password)
        if (!comparePassword) {
            return new InvalidPasswordError()
        }

        // Generating token
        const token = jwt.sign({ username: username }, `${process.env.SECRET}`, {
            expiresIn: "1h"
        })
        return {
            accessToken: token
        }
    }

}