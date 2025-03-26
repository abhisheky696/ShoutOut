import React from "react";
import axios from "axios";
import { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../redux/userSlice.jsx";
const useGetTweetsByUser = async (id) => {
    const dispatch = useDispatch();
    // console.log("cookie", document.cookie);
    const refreshTweet=useSelector(state=> state.tweet.refresh)
    const refreshUser=useSelector(state=> state.user.refresh)
    useEffect(() => {
        const fetchTweets = async () => {
            try {
                let response = await axios.get(
                    `${BASE_URL}/api/v1/user/posts`,
                    {
                        params: {id},
                        withCredentials: true,
                    },
                );
                // console.log(response?.data?.tweets);
                dispatch(getTweets(response?.data?.tweets));
            } catch (error) {
                console.log("some error occured while fetching all tweets");
            }
        };
        fetchTweets();
    }, [id,refreshUser,refreshTweet]);
};

export default useGetTweetsByUser;
