import axios from '../helpers/axios-interceptors';

const URL = 'https://localhost:44357/api/users';

// Autoryzacja
const getUserByName = async (name) => await axios().get(`${URL}/GetBy/username/${name}`)

const getAllUsers = async () => await axios().get(URL)

// Autoryzacja
const getUserById = async (id) =>
    await axios().get(`${URL}/${id}`)


export {
    getUserByName,
    getAllUsers,
    getUserById,
}