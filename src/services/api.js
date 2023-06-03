import axios from "../utils/axios-customize";

export const callRegister = (username, password, email) => {
  return axios.post("", {
    username,
    password,
    email,
  });
};
export const callRegisterRole = (username, password, email, role) => {
  return axios.post("", {
    username,
    password,
    email,
    role,
  });
};

export const callLogin = (username, password) => {
  return axios.post("", {
    username,
    password,
  });
};
