import React, { useRef } from 'react'
import { ContainerInside, Input, Button, TextArea, Label } from '../../../components/SharedStyles.css'
import Post from '../../../models/Post'
import { useAuth } from '../../../services/AuthorizationService';
import { postPost } from '../../../services/PostService'
import toast from 'react-hot-toast';

function AddPost({ setPosts, posts }) {

    const userStatus = useAuth();
    const user = userStatus.user;

    const tagRef = useRef("");
    const contentRef = useRef("");

    const addPostAction = () => {
        if (contentRef.current.value.length < 30)
            return toast.error('Treść posta musi mieć powyżej 30 znaków!')

        const post = new Post(
            user.userId,
            tagRef.current.value,
            contentRef.current.value,
            new Date(),
            null)
        const postObj = post.getObject();

        postPost(user.userId, postObj)
            .then((res => {
                const postsAll = [res.data, ...posts]
                setPosts(postsAll);
                tagRef.current.value = "";
                contentRef.current.value = "";
                toast.success('Post został dodany.')
            })).catch(() => {
                toast.error('Wystąpił bląd podczas dodawania postu!')
            })
    }

    return (
        <ContainerInside>
            <Label htmlFor="tag">Treść posta: </Label>
            <TextArea type="text" id="tag" ref={contentRef} />
            <Label htmlFor="tag">Tag: </Label>
            <Input type="text" id="tag" ref={tagRef} />

            <Button onClick={addPostAction}>Dodaj post</Button>
        </ContainerInside >
    )
}

export default AddPost;