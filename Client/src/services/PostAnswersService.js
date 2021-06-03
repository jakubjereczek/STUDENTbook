import axios from '../helpers/axios-interceptors';
import { URL } from '../constants'

const URL_POST_ANSWERS = `${URL}/postanswers`;

// Autoryzacja
const getPostAnswersByUserName = async (name) => await axios()
    .get(`${URL_POST_ANSWERS}/GetBy/username/${name}`)

export {
    getPostAnswersByUserName
}