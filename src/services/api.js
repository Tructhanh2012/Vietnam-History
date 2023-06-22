import axios from "../utils/axios-customize";
// import axios from "axios";
export const callRegister = (username, password, email) => {
  return axios.post("/signup", {
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
  return axios.post("/signin", {
    username,
    password,
  });
};

// axios.post("http://localhost:8080/signin", data, {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "application/json",
//   },
//   mode: "cors",
// });

export const getMap = () => {
  return axios.get(
    "https://react-history-default-rtdb.firebaseio.com/history.json"
  );
};
// export const getAPI = () => {
//   return axios.get("https://jsonplaceholder.typicode.com/todos");
// };

// export const getRanking = () => {
//  return axios.get(
//     "https://dashboardcard-733ac-default-rtdb.asia-southeast1.firebasedatabase.app/table"
//   );
// };
