import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, //user đã đn chưa
  isLoading: true,

  user: {
    userId: "",
    avatar: "",
    email: "",
    userName: "",
    role: "",
  },
  status: "idle",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,

  reducers: {
    // actions để nạp data
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
      // state.user = action.payload.user;
    }, // -> lấy dc payload sau đấy gán vào state của Redux

    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
    },

    doLogoutAction: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = {
        userId: "",
        avatar: "",
        email: "",
        userName: "",
        role: "",
      };
    },

    doUpdateUserInfoAction: (state, action) => {
      state.user.avatar = action.payload.avatar;
    },

    doUploadAvatarAction: (state, action) => {
      state.tempAvatar = action.payload.avatar;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const {
  doLoginAction,
  doGetAccountAction,
  doLogoutAction,
  doUpdateUserInfoAction,
  doUploadAvatarAction,
} = accountSlice.actions;

export default accountSlice.reducer;
