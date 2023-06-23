import { Router, Request, Response } from "express";
import { UserController } from "./user.controller";
import { Db } from "mongodb";

export class UserModule {
    public userRouter: Router
    private userController: UserController

    constructor(db: Db) {
        this.userRouter = Router()
        this.userController = new UserController(db)
        this.generateRoutes()
    }

    private generateRoutes(): void {
        this.userRouter.post("/register", async (req: Request, res: Response) => {
            const newUser = await this.userController.createUser(req.body)
            res.send(newUser)
        })
        this.userRouter.get("/users", async (req: Request, res: Response) => {
            const allUsers = await this.userController.getAllUsers()
            res.send(allUsers)
        })
    }
}