export default class User {

    constructor(universityId, nick, firstName, lastName, createdAt, password, email) {
        this.universityId = universityId;
        this.nick = nick;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = createdAt;
        this.password = password;
        this.email = email;
    }

    getObject() {
        return {
            universityId: this.universityId,
            nick: this.nick,
            firstName: this.firstName,
            lastName: this.lastName,
            createdAt: this.createdAt,
            password: this.password,
            email: this.email
        }
    }
}