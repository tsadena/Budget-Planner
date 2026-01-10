import axios from "axios";

const API = "http://localhost:3000/api/auth";

export const signup = (data) => axios.post(`${API}/signup`, data);
export const login = (data) => axios.post(`${API}/login`, data);
