import axios from 'axios'

const axiosInstance = axios.create({});

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    axiosInstance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token') // TODO: Cookie not read by the others (Http-only cookie)
        config.headers.Authorization = `Basic ${token}`

        return config;
    });

    axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        err => {
            if (err.response.status === 401) {
                console.log("UNAUTHORIZED")
                localStorage.removeItem('token')
                localStorage.removeItem('user');
                window.location.reload();
            }
            return Promise.reject(err);
        });
    return axiosInstance;
}

