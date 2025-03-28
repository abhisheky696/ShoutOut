import React, {useState} from "react";
import Createpost from "./Createpost.jsx";
import Header from "./Header.jsx";
import Tweets from "./Tweets.jsx";
import FollowingTweets from "./FollowingTweets.jsx";
const Feed = () => {
    const [followingTweets,setFollowingTweets]=useState(false);
    return (
        <div className="flex flex-col border-r border-l w-full md:w-[50%] md:mx-4">
            <Header followingTweets={setFollowingTweets}/>
            <div className="overflow-scroll-y max-h-screen ">
                <Createpost />
                {!followingTweets&&<Tweets />}
                {followingTweets&&<FollowingTweets/>}
            </div>
        </div>
    );
};

export default Feed;
