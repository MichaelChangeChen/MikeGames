import axios from 'axios';

axios.defaults.timeout = 60000;
// const request = axios.create({ baseURL: 'http://127.0.0.1:8000' });
const request = axios.create({ baseURL: 'https://pythonbackend-davincicode.onrender.com' });

export const resetGame = () => request.get(`/resetGame`);
export const getScore = () => request.get(`/getScore`);
export const guessGame = (data) => request.post(`/guessGame`, data);
export const saveRecord = (data) => request.post(`/saveRecord`, data);
export const checkName = (data) => request.post(`/checkName`, data);