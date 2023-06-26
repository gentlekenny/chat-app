interface AuthenticatedUser extends Express.User {
    id: string,
    username: string
    iat: number,
    exp: number
}

export default AuthenticatedUser