interface User {
    userId: number,
    universityId: number,
    nick: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    password: string,
    email: string
}

export default User;