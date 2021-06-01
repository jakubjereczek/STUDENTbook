import axios from '../helpers/axios-interceptors';
import { URL } from '../constants'
const URL_USERS = `${URL}/users`;

// Autoryzacja
const getUserByName = async (name) => await axios()
    .get(`${URL_USERS}/GetBy/username/${name}`)

const getAllUsers = async () => await axios()
    .get(URL_USERS)

// Autoryzacja
const getUserById = async (id) =>
    await axios()
        .get(`${URL_USERS}/${id}`)

// User = User class model
const postUser = async (user) => await axios()
    .post(URL_USERS, {
        ...user
    })

// Autoryzacja
// User = User class model
const putUser = async (id, user) => await axios()
    .put(`${URL_USERS}/${id}`, {
        ...user
    })

// Autoryzacja
const deleteUser = async (id) => await axios()
    .delete(`${URL_USERS}/${id}`)

export {
    getUserByName,
    getAllUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser
}