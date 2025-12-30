import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const registerUser = (data) => {
  return api.post("/api/users", data);
};

export const loginUser = (data) => {
  return axios.post("http://localhost:3001/api/login", data);
};

