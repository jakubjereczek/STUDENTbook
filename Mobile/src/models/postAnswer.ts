interface PostAnswer {
    answerId: number,
    postId: number,
    userId: number,
    content: string,
    createdAt: Date,
    editedAt: Date | null
}

export default PostAnswer;