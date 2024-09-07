import axios from "axios";
import {retrieveToken } from '../services/token';

export const host = '192.168.1.8';

const Api = axios.create({
  baseURL: `http://${host}:3000`,
});

// Adicionar um interceptor de requisição para incluir o token de autenticação
Api.interceptors.request.use(
  async (config) => {
    const token = await retrieveToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;