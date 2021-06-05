interface Post {
    postId: number,
    userId: number,
    tag: string,
    content: string,
    createdAt: Date,
    editedAt: Date | null
}

export default Post;