import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        profile:null,
        otherUsers:[],
        refresh:false
    },
    reducers:{
        getUser:(state,action) => {
            state.user=action.payload;
        },
        getProfile:(state,action) => {
            state.profile=action.payload;
        },
        getOtherUsers:(state,action) => {
            state.otherUsers=action.payload;
        },
        logOutUser:(state)=> {
            state.user=null;
            state.otherUsers=[];
            state.profile=null;
        },
        doRefreshUser:(state)=> {
            state.refresh=!state.refresh;
        }
    }
})

export const {getProfile,getOtherUsers,getUser,logOutUser,doRefreshUser}=userSlice.actions;
export default userSlice.reducer;