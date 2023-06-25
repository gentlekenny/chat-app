import { StatusCodes } from "http-status-codes";

export class UsernameValidationError extends Error {
    errorMessage: string
    statusCode: number;

    constructor() {
        super("Username must be atleast 8 characters long.")
        this.errorMessage = "Username must be atleast 8 characters long."
        this.statusCode = StatusCodes.BAD_REQUEST

    }
}

export class PasswordValidationError extends Error {
    errorMessage: string
    statusCode: number;

    constructor() {
        super("Username must be atleast 8 characters long.")
        this.errorMessage = "Username must be atleast 8 characters long."
        this.statusCode = StatusCodes.BAD_REQUEST

    }
}

