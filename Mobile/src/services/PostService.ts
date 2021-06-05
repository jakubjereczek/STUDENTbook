import axios from './axios';
import { URL } from '../constants';
import Post from '../models/post';
const URL_POSTS = `${URL}/posts`;

// Autoryzacja
const getPostsByUserName = async (name: string) => await axios()
    .get(`${URL_POSTS}/GetBy/username/${name}`)

const getAllPosts = async () => await axios()
    .get(URL_POSTS)

// Authoryzacja
const postPost = async (userId: number, post: Post) => await axios()
    .post(`${URL_POSTS}/${userId}`, {
        ...post
    })

// Authoryzacja
const putPost = async (id: number, post: Post) => await axios()
    .put(`${URL_POSTS}/${id}`, {
        ...post
    })

// Autoryzacja
const deletePost = async (id: number) => await axios()
    .delete(`${URL_POSTS}/${id}`)

export {
    getPostsByUserName,
    getAllPosts,
    postPost,
    putPost,
    deletePost
}
