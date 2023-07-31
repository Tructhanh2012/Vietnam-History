// import axios from "../utils/axios-customize";

import axios from "axios";

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

export const callFetchAccount = () => {
  return axios.get("/reload");
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

export const callGetStatistic = () => {
  return axios.get("/admin/dashboard");
};
// export const callPostDashboard = () => {
//   return axios.post("admin/dashboard/newAccs/1");
// }; //=========================finish admin============================================

// export const callGetRanking = (keyword) => {
//   return axios.post("/ranking", {
//     data: {
//       keyword: "",
//     },
//   });
// }; //finish ranking table

//=========== Map =======================
// export const callGetEventMap = () => {
//   return axios.get("map/1");
// };

export const callMap = () => {
  return axios.get("/map");
};

//========== Timeline ====================
export const callTimeline = () => {
  return axios.get("http://localhost:8084/general/list-generation");
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

//============== EVENT ===================
export const getOutstandingEvent = () => {
  return axios.get("/homepage");
};

export const callGetSingleEvent = (id) => {
  return axios.get(`/singleEvent/${id}`);
};

// export const getAPI = () => {
//   return axios.get("https://jsonplaceholder.typicode.com/todos");
// };

// export const getRanking = () => {
//  return axios.get(
//     "https://dashboardcard-733ac-default-rtdb.asia-southeast1.firebasedatabase.app/table"
//   );
// };

export const callLogout = (username, password) => {
  return axios.get("http://localhost:8084/logout", {
    username,
    password,
  });
};
export const callRegister = (name, email, password) => {
  return axios.post("http://localhost:8084/register", {
    name,

    email,
    password,
  });
};

export const callPostLogin = (email, password) => {
  return axios.post("http://localhost:8084/authenticate", {
    email,
    password,
  });
};

export const callGetHashtag = () => {
  return axios.get("http://localhost:8084/general/hashtags");
};
export const callGetProvice = () => {
  return axios.get("http://localhost:8084/general/provinces");
};

export const callPostQuiz = () => {
  return axios.post("http://localhost:8084/editor/create-questions", {
    question,
    firstChoice,
    secondChoice,
    thirdChoice,
    answer,
    hashtagId,
  });
};

export const callTimelineEvent = (id) => {
  return axios.post("http://localhost:8084/general/articles-hashtag", { id });
};

export const callGetRanking = () => {
  return axios.get("http://localhost:8084/general/top-member");
};

export const callUpdateProfile = (id, name, password) => {
  return axios.put("http://localhost:8084/general/update-profile", {
    id,
    name,
    password,
  });
};

export const callGetEditorList = () => {
  return axios.get("http://localhost:8084/admin/editors");
};
// export const callGetMemberList = () => {
//   return axios.get("http://localhost:8084/admin/editors");
// };

export const callDeleteUser = (id) => {
  return axios.delete("http://localhost:8084/admin/delete-user", { id });
};

export const callGetArticleDetail = (id) => {
  return axios.post("http://localhost:8084/general/article"), { id };
};

export const callGetArticle = () => {
  return axios.get("http://localhost:8084/general/list-articles");
};

export const callGetMap = () => {
  return axios.get("http://localhost:8084/general/map-info");
};
