import axios from "axios";

const proxyAxios = axios.create({
  baseURL: "/api/vastli-proxy",
  withCredentials: true,
});

export default proxyAxios;
