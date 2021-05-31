import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.18.3.159/schwebapp/public/api/'
    //baseURL: 'https://api.github.com/users/defunkt'
});

export default api;