import axios from 'axios';

axios.defaults.timeout = 60000;

const isLocal = window.location.hostname === "127.0.0.1";

const request = axios.create({
  baseURL: isLocal ? 'http://127.0.0.1:8000' : 'https://pythonbackend-davincicode.onrender.com',
});

export const guessGame = (data) => request.post(`/guessGame`, data);
export const resetGame = () => request.get(`/resetGame`);