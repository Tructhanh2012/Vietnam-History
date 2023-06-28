import axios from "../utils/axios-customize";

export const callRegister = (username, password, email) => {
  return axios.post("/signup", {
    username,
    password,
    email,
  });
};

export const callRegisterRole = (username, password, email, role) => {
  return axios.post("/admin/accountList/account", {
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

export const callGetListUser = (keyword) => {
  return axios.post("/admin/accountList", {
    data: {
      keyword: "",
    },
  });
};

export const callUpdateUser = (userId, userName, email, userRole) => {
  return axios.put("/admin/accountList/account", {
    userId,
    userName,
    email,
    userRole,
  });
};

export const callDeleteUser = (userID) => {
  return axios.delete(`/admin/accountList/account/${userID}`);
};

export const callGetStatistic = () => {
  return axios.get("/admin/dashboard");
};
export const callPostDashboard = () => {
  return axios.post("admin/dashboard/newAccs/1");
}; //=========================finish admin============================================

export const callGetRanking = (keyword) => {
  return axios.post("/ranking", {
    data: {
      keyword: "",
    },
  });
};

export const callMap = () => {
  return axios.get("/map");
};

//=====Profile
export const callUpdateAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};

export const callUpdateUserInfor = (userID, username, avatar, email) => {
  return axios.put(``, { userID, username, avatar, email });
};

export const callUpdatePassword = (email, oldpass, newpass) => {
  return axios.put(``, { email, oldpass, newpass });
};
//=======
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
