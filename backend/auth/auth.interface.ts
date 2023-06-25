interface AuthenticatedUser extends Express.User {
    id: string,
    username: string
}

export default AuthenticatedUser