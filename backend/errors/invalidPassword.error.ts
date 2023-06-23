import { StatusCodes } from "http-status-codes";

export class InvalidPasswordError extends Error {
    errorName: string
    statusCode: string;

    constructor() {
        super("Invalid password")
        this.errorName = "InvalidPasswordError"
        this.statusCode = StatusCodes.UNAUTHORIZED.toString()

    }
}