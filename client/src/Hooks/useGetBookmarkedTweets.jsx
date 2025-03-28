import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../redux/userSlice";
const useGetBookmarkedTweets = (id) => {
    const refreshUser = useSelector((state) => state.user.user);
    const refreshTweets = useSelector((state) => state.tweet.allTweets);
    const dispatch=useDispatch();
    const fetchTweets = async () => {
        try {
            const tweets =await axios.get(
                `${BASE_URL}/api/v1/user/bookmarktweets/${id}`,
                {
                    withCredentials: true,
                }
            );
            // console.log(tweets?.data?.allTweets)
            dispatch(getBookmarks(tweets?.data?.allTweets));
            
        } catch (error) {
            console.log("some error occurd while fetching bookmarked tweets",error);
        }
    };
    useEffect(() => {
        fetchTweets();
    }, [id, refreshUser, refreshTweets]);
};

export default useGetBookmarkedTweets;
