import axios from './axios';
import { URL } from '../constants';
import PostAnswer from '../models/postAnswer';
const URL_POSTS = `${URL}/postanswers`;

// Autoryzacja
const getPostAnswersByUserName = async (name: string) => await axios()
    .get(`${URL_POSTS}/GetBy/username/${name}`)

export {
    getPostAnswersByUserName,
}
