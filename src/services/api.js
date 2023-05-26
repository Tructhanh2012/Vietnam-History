import axios from "../utils/axios-customize";

export const callRegister = (username, password, email) => {
  return axios.post("", {
    username,
    password,
    email,
  });
};
