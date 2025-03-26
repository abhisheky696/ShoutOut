import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFollowingTweets } from "../redux/tweetSlice.jsx";
import { useSelector } from "react-redux";
import BASE_URL from "../utils/constant.jsx";
const useGetFollowingTweets = (id) => {
    const refreshTweet=useSelector((state)=>state.tweet.refresh);
    const refreshUser=useSelector((state)=>state.user.refresh);
    
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
               // console.log(id);
                const response = await axios.get(
                    `${BASE_URL}/api/v1/tweet/allfollowingtweets/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                // console.log(
                //     "following tweet response",
                //     response.data.allTweets
                // );
                dispatch(getFollowingTweets(response?.data?.allTweets));
            } catch (error) {
                console.log(
                    "some error occured while fetching following tweets"
                );
            }
        };
        fetchData();
    }, [id,refreshTweet,refreshUser]);
};

export default useGetFollowingTweets;
