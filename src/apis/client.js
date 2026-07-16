import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fe-mini-session-code.onrender.com',
});

export default api;
