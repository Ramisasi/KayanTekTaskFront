import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./UserData";

export const localStore = configureStore({
  reducer: {
    user: userReducer,
  },
});
