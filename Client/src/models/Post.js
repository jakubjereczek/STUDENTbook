export default class Post {

    constructor(userId, tag, content, createdAt, editedAt) {
        this.userId = userId;
        this.tag = tag;
        this.content = content;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
    }

    getObject() {
        return {
            userId: this.userId,
            tag: this.tag,
            content: this.content,
            createdAt: this.createdAt,
            editedAt: this.editedAt,
        }
    }
}