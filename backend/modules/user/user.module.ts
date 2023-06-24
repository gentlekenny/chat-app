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
        this.userRouter.get("/chatrooms", authenticateToken, async (req: Request, res: Response) => {
            const response = await this.userController.getAllChatrooms()
            res.send(response)
        })
        this.userRouter.post("/create-chatroom", authenticateToken, async (req: Request, res: Response) => {
            const response = await this.userController.createChatroom(req.user!.id, req.body.name)
            res.send(response)
        })
        this.userRouter.post("/join/:id", async (req: Request, res: Response) => {
            const roomId = req.params.id
            const response = await this.userController.joinChatroom(req.user!.id, roomId)
            res.send(response)
        })
        this.userRouter.post("/leave/:id", async (req: Request, res: Response) => {
            const roomId = req.params.id
            const response = await this.userController.leaveChatroom(req.user!.id, roomId)
            res.send(response)
        })
    }
}