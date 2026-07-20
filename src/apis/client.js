import axios from 'axios';

// 백엔드 API 기본 주소
export const api = axios.create({
    baseURL: 'https://tokplan.store',
});
