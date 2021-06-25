import axios from '../helpers/axios-interceptors';
import { URL } from '../constants'
const URL_POSTS = `${URL}/posts`;

// Autoryzacja
const getPostsByUserName = async (name) => await axios()
    .get(`${URL_POSTS}/GetBy/username/${name}`)

// Autoryzacja
const getAllPosts = async (pageNumber, pageSize, filter) => await axios()
    .get(`${URL_POSTS}`,
        {
            params: {
                pageNumber,
                pageSize,
                filter,
            }
        });

// Authoryzacja
/// Post = Post class model
const postPost = async (userId, post) => await axios()
    .post(`${URL_POSTS}/${userId}`, {
        ...post
    })

// Authoryzacja
/// Post = Post class model
const putPost = async (id, post) => await axios()
    .put(`${URL_POSTS}/${id}`, {
        ...post
    })

// Autoryzacja
const deletePost = async (id) => await axios()
    .delete(`${URL_POSTS}/${id}`)



export {
    getPostsByUserName,
    getAllPosts,
    postPost,
    putPost,
    deletePost
}