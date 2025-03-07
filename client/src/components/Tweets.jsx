import React, { useEffect } from "react"
import Tweetcard from "./Tweetcard"
import { useSelector } from "react-redux"
import useGetAllTweets from "../Hooks/useGetAllTweets"
const Tweets = () => {
    const user = useSelector((state) => state.user.user);
    //console.log("data received in the tweet section", user);
    const id = user?._id;
    useGetAllTweets(id);
    const allTweets = useSelector((state) => state.tweet.allTweets);
    if(allTweets?.length==0) {
        return <div className="text-center">
            No tweet exist
        </div>
    }
    return allTweets?.map((tweet) => {
        return (
            <div className="overflow-auto ">
                <Tweetcard key={tweet?._id} tweet={tweet} />
            </div>
        );
    });
};

export default Tweets;
