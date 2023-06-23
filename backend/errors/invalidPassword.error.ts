import { StatusCodes } from "http-status-codes";

export class InvalidPasswordError extends Error {
    errorMessage: string
    statusCode: string;

    constructor() {
        super("Invalid password")
        this.errorMessage = "Invalid password"
        this.statusCode = StatusCodes.UNAUTHORIZED.toString()

    }
}