import axios from "../utils/axios-customize";

export const callRegister = (username, password, email) => {
  return axios.post("/signup", {
    username,
    password,
    email,
  });
};
export const callRegisterRole = (username, password, email, roles) => {
  return axios.post("/admin/accountList/account", {
    username,
    password,
    email,
    roles,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/signin", {
    username,
    password,
  });
};

// export const callGetListUser = (keyword) => {
//   return axios.get(`/admin/accountList?keyword=${keyword}`);
// };

export const callGetListUser = (keyword) => {
  return axios.post("/admin/accountList", {
    data: {
      keyword: "",
    },
  });

  // return axios.get("/admin/accountList", {
  //   params: {
  //     keyword: keyword,
  //   },
  // });
};

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
