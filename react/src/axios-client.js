// import axios from "axios";

// const axiosClient = axios.create({
//     baseURL: `${import.meta.env.VITE_API_BASEURL}/api`
// });

// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('ACCESS_TOKEN');
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// })


// axiosClient.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     try {
//            const { response } = error;
//            if (response.status === 401) {
//                localStorage.removeItem("ACCESS_TOKEN");
//            }
//     } catch (e) {
//         console.log(e, error);
//     }
//     throw err;
// })

// export default axiosClient;

import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASEURL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (e) {
            console.error(e, error);
        }
        // Corrected from `throw err` to `return Promise.reject(error)`
        return Promise.reject(error);
    }
);

export default axiosClient;
