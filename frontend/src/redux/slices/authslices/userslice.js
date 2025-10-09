import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  mode: "create",
  profileId: null,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginsucc: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    togglemode: (state, action) => {
      state.mode = action.payload.mode;
      state.profileId = action.payload.profileId || null;
    },
  },
});

export const { loginsucc, logout, togglemode } = authslice.actions;
export default authslice.reducer;
