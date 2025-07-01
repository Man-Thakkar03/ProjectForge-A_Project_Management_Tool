import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setOpenSidebar, logout } = authSlice.actions;
export default authSlice.reducer;
