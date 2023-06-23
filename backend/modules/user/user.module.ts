import { Router, Request, Response } from "express";
import { UserController } from "./user.controller";
import { Db } from "mongodb";
import { authenticateToken } from "../../auth/auth.service";
import AuthenticatedUser from "../../auth/auth.interface";

export class UserModule {
    public userRouter: Router
    private userController: UserController

    constructor(db: Db) {
        this.userRouter = Router()
        this.userController = new UserController(db)
        this.generateRoutes()
    }

    private generateRoutes(): void {
        this.userRouter.get("/users", authenticateToken, async (req: Request, res: Response) => {
            const allUsers = await this.userController.getAllUsers()
            res.send(allUsers)
        })
        this.userRouter.post("/create-chatroom", authenticateToken, async (req: Request, res: Response) => {
            const user = req.user as AuthenticatedUser
            const response = await this.userController.createChatroom(user.id, req.body)
            res.send(response)
        })
        this.userRouter.post("/join/:id", async (req: Request, res: Response) => {
            const user = req.user as AuthenticatedUser
            const roomId = req.params.id
            const response = await this.userController.joinChatroom(user.id, roomId)
            res.send(response)
        })
        this.userRouter.post("/leave/:id", async (req: Request, res: Response) => {
            const user = req.user as AuthenticatedUser
            const roomId = req.params.id
            const response = await this.userController.leaveChatroom(user.id, roomId)
            res.send(response)
        })
    }
}