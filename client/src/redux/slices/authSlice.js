import { act } from "react"
import {createSlice} from "@reduxjs/toolkit"

const initialState ={
  user :localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userinfo')) :null,

  isSlidebarOpen : false,
}

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers:{
    setCredentials : (state , action)=>{
      state.user = action.playload;
      localStorage.setItem("userInfo" , JSON.stringify(action.playload));
    },
    logout : (state , action) =>{
      state.user = null;
      localStorage.removeItem("userInfo")
    },
    setOpenSlidebar : (state,action)=>{
      state,isSlidebarOpen = action.playload;
    },
  },
});


export const {setCredentials , logout , setOpenSlidebar} = authSlice.actions;


export default authSlice.reducer;