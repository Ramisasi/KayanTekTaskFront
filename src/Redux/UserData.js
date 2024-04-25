import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  id: "",
  userName: "",
  isLogin: false,
  token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state) => {
      const data = localStorage.getItem("userToken");
      if (data) {
        const decoded = jwtDecode(data);
        if (Date.now() <= decoded?.exp * 1000) {
          state.id = decoded.id;
          state.userName = decoded.userName;
          state.isLogin = true;
          state.token = "test__" + data;
        }
      } else {
        state.id = 0;
        state.userName = "";
        state.isLogin = false;
        state.token = "";
      }
    },
    logOut: (state) => {
      state.id = 0;
      state.userName = "";
      state.isLogin = false;
      state.token = "";
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser, logOut } = userSlice.actions;
