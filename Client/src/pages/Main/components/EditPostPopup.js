import React, { useEffect, useState } from 'react'
import { PopupWrapper, Popup, ClosePopup } from './EditPostPopup.css'
import { TextArea, Input, Label, Button, ButtonIcon } from '../../../components/SharedStyles.css'
import { FaRegWindowClose } from "react-icons/fa";
import Post from '../../../models/Post';
import { putPost } from '../../../services/PostService'
import toast from 'react-hot-toast';

function EditPostPopup({ active, setActive, post, posts, setPosts }) {

    const setActiveActive = () => setActive(false);

    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");

    const handleContentChange = (event) => setContent(event.target.value);
    const handleTagChange = (event) => setTag(event.target.value)

    useEffect(() => {
        if (post) {
            setContent(post.content);
            setTag(post.tag);
        }
    }, [post])

    const handleCommitChanges = () => {
        if (content.length < 30)
            return toast.error('Treść posta musi mieć powyżej 30 znaków!')

        const modifiedPost = new Post(post.userId, tag, content, post.createdAt, new Date());
        const postObj = {
            postId: post.postId,
            ...modifiedPost.getObject()
        }

        putPost(post.postId, postObj)
            .then(() => {
                toast.success('Post został edytowany.')
                // musze tu ustawić setPosts na nowy
                post = { ...post, content, tag }
                const newPosts = posts.map(p => {
                    if (p.postId === post.postId) {
                        return {
                            ...p,
                            content,
                            tag
                        }
                    }
                    return p;
                })
                setPosts(newPosts)
                console.log(posts, newPosts)
            }).catch((err) => {
                toast.error('Wystąpił bląd podczas edycji postu.')
            }).finally(() => {
                setActive(false);
            })
    }

    return active && (
        <PopupWrapper>
            <Popup>
                <ClosePopup onClick={setActiveActive}>
                    <ButtonIcon>  <FaRegWindowClose /></ButtonIcon>
                </ClosePopup>
                <Label htmlFor="tag">Treść posta: </Label>
                <TextArea value={content} onChange={handleContentChange}></TextArea>
                <Label htmlFor="tag">Tag: </Label>
                <Input type="text" id="tag" value={tag} onChange={handleTagChange} />
                <Button onClick={handleCommitChanges}>Zapisz</Button>
            </Popup>
        </PopupWrapper>
    )
}

export default EditPostPopup;