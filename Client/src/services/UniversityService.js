import axios from '../helpers/axios-interceptors';
import { URL } from '../constants'

const URL_UNIVERSITIES = `${URL}/university`;

const getAllUniversities = async () => await axios()
    .get(URL_UNIVERSITIES)


export {
    getAllUniversities
}