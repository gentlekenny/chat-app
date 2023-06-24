interface AuthenticatedUser extends Express.User {
    id: string
}

export default AuthenticatedUser