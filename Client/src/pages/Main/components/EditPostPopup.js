import React, { useEffect, useState } from 'react'
import { PopupWrapper, Popup, ClosePopup } from './EditPostPopup.css'
import { TextArea, Input, Label, Button, ButtonIcon } from '../../../components/SharedStyles.css'
import { FaRegWindowClose } from "react-icons/fa";
import Post from '../../../models/Post';
import { putPost } from '../../../services/PostService'
import toast from 'react-hot-toast';

function EditPostPopup({ active, setActive, post }) {

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
        const postObj = { postId: post.postId, ...modifiedPost.getObject() }
        console.log(postObj)

        putPost(post.postId, postObj)
            .then((res) => {
                toast.success('Post został edytowany.')
            }).catch((err) => {
                console.log(err);
                toast.error('Wystąpił bląd podczas edycji postu.')
            }).finally(() => {
                setActive(false);
            })


        // Aktualziacja tam

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