import React, { useRef } from 'react'
import { ContainerInside, Input, Button, TextArea } from '../../../components/SharedStyles.css'
import Post from '../../../models/Post'
import { useAuth } from '../../../services/AuthorizationService';
import { postPost } from '../../../services/PostService'

function AddPost() {

    const userStatus = useAuth();
    const user = userStatus.user;

    const tagInput = useRef(null);
    const contentTextArea = useRef(null);

    const addPostAction = () => {
        const post = new Post(user.userId, tagInput.current.value, contentTextArea.current.value, new Date(), null)
        const postObj = post.getObject()
        postPost(user.userId, postObj);
    }

    return (
        <ContainerInside>
            <label htmlFor="tag">Treść posta: </label>
            <TextArea type="text" id="tag" ref={contentTextArea} />

            <label htmlFor="tag">Tag: </label>
            <Input type="text" id="tag" ref={tagInput} />

            <Button onClick={addPostAction}>Dodaj post</Button>
        </ContainerInside >
    )
}

export default AddPost;