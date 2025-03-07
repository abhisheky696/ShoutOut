import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tweetReducer from "./tweetSlice"
export default configureStore({
    reducer: {
        user: userReducer,
        tweet:tweetReducer,
    },
});
