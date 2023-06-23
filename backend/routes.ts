import { Router } from "express";
import { UserModule } from "./modules/user/user.module";
import { Db } from "mongodb";

export const appRouter = Router()

export function GenerateRoutes(db: Db) {
    const userModule = new UserModule(db)
    appRouter.use(userModule.userRouter)
}