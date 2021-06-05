import axios from './axios';
import { URL } from '../constants'

const URL_USERS = `${URL}/users`;

// Autoryzacja
const getUserByName = async (name: string) => await axios()
    .get(`${URL_USERS}/GetBy/username/${name}`)

const getAllUsers = async () => await axios()
    .get(URL_USERS)

// Autoryzacja
const getUserById = async (id: number) => await axios()
    .get(`${URL_USERS}/${id}`)

// User = User class model
const postUser = async (user: User) => await axios()
    .post(URL_USERS, {
        ...user
    })

// Autoryzacja
// User = User class model
const putUser = async (id: number, user: User) => await axios()
    .put(`${URL_USERS}/${id}`, {
        ...user
    })

// Autoryzacja
const deleteUser = async (id: number) => await axios()
    .delete(`${URL_USERS}/${id}`)

export interface User {
    universityId: number,
    nick: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    password: string,
    email: string
}

export {
    getUserByName,
    getAllUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser
}