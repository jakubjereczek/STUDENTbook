import axios from '../helpers/axios-interceptors';
import { URL } from '../constants'
const URL_USERS = `${URL}/posts`;

// Autoryzacja
const getPostsByUserName = async (name) => await axios()
    .get(`${URL_USERS}/GetBy/username/${name}`)

const getAllPosts = async () => await axios()
    .get(URL_USERS)

export {
    getPostsByUserName,
    getAllPosts
}