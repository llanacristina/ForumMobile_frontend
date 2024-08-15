import axios from "axios";

export const host = '192.168.2.3';

const Api = axios.create({
  baseURL: `http://${host}:3000`,
});

export default Api;