import axios from 'axios';

axios.defaults.timeout = 60000;

// ==================================================

const request = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const guessGame = (data) => request.post(`/guessGame`, data); 
export const resetGame = () => request.get(`/resetGame`);