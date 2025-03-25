import React from 'react'
import Tweetcard from "./Tweetcard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { doRefresh } from '../redux/tweetSlice.jsx';
import useGetFollowingTweets from '../Hooks/useGetFollowingTweets.jsx';
const FollowingTweets = () => {
    const dispatch=useDispatch();
    const user = useSelector((state) => state.user.user);
    //console.log("data received in the tweet section", user);
    const id = user?._id;
    // console.log("id received in following tweet section",id)
    useGetFollowingTweets(id);
    const allTweets = useSelector((state) => state.tweet.followingTweets);
    //console.log("all following tweets",allTweets)
    if(allTweets.length<=0) {
        return <div className='text-center'>No tweet exist</div>
    }
    return allTweets?.map((tweet) => {
        return (
            <div className="overflow-auto">
                <Tweetcard key={tweet?._id} tweet={tweet} />
            </div>
        );
    });
}
export default FollowingTweets