import { Db } from "mongodb";
import User from "./user.interface";

export class UserService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async createUser(userDto: User) {
        const result = await this.db.collection("users").insertOne(userDto)
        return result
    }

    async getAllUsers() {
        const result = await this.db.collection("users").find().toArray()
        return result
    }
}