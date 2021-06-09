import React, { useRef } from 'react'
import { ContainerInside, Input, Button, TextArea, Label } from '../../../components/SharedStyles.css'
import Post from '../../../models/Post'
import { useAuth } from '../../../services/AuthorizationService';
import { postPost } from '../../../services/PostService'
import PostsList from './PostsList';
import toast from 'react-hot-toast';

function AddPost({ setLoading, setPosts, posts }) {

    const userStatus = useAuth();
    const user = userStatus.user;

    const tagInput = useRef(null);
    const contentTextArea = useRef(null);

    const addPostAction = () => {
        if (contentTextArea.current.value.length < 30)
            return toast.error('Treść posta musi mieć powyżej 30 znaków!')
        setLoading(true);
        const post = new Post(user.userId, tagInput.current.value, contentTextArea.current.value, new Date(), null)
        const postObj = post.getObject();
        postPost(user.userId, postObj).then((res => {
            const postsAll = [...posts, res.data]
            setPosts(postsAll);
            setLoading(false);
            contentTextArea.current.value = "";
            tagInput.current.value = "";
            toast.success('Post został dodany.')
        })).catch(() => {
            toast.error('Wystąpił bląd podczas dodawania postu!')
        })

    }

    return (
        <ContainerInside>
            <Label htmlFor="tag">Treść posta: </Label>
            <TextArea type="text" id="tag" ref={contentTextArea} />
            <Label htmlFor="tag">Tag: </Label>
            <Input type="text" id="tag" ref={tagInput} />

            <Button onClick={addPostAction}>Dodaj post</Button>
        </ContainerInside >
    )
}

export default AddPost;