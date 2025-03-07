import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name:"tweet",
    initialState:{
        allTweets:[],
        followingTweets:[],
        refresh:false,
    },
    reducers:{
        getAllTweets:(state,action)=> {
            state.allTweets=action.payload;
        },
        getFollowingTweets:(state,action)=> {
            state.followingTweets=action.payload;
        },
        doRefresh:(state) => {
            state.refresh=!state.refresh;
        }
    }
})

export const {getAllTweets,getFollowingTweets,doRefresh}=tweetSlice.actions;

export default tweetSlice.reducer