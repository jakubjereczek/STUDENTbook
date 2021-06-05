import axios from 'axios'

import { get, set } from './ionicStorage';

const axiosInstance = axios.create({});

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    axiosInstance.interceptors.request.use(async function (config: any) {
        const token = await get('token');
        config.headers.Authorization = `Basic ${token}`;
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response: Response | any) => {
            return response;
        },
        (err: Error | any) => {
            console.log(err)
            if (err.response && err.response.status === 401) {
                console.log("UNAUTHORIZED")
                set('token', null);
                set('user', null);
            }
            return Promise.reject(err);
        });
    return axiosInstance;
}

