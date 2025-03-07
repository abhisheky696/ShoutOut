import React, {useState} from "react";
import Createpost from "./Createpost";
import Header from "./Header";
import Tweets from "./Tweets";
import FollowingTweets from "./FollowingTweets";
const Feed = () => {
    const [followingTweets,setFollowingTweets]=useState(false);
    return (
        <div className="flex flex-col border-r border-l w-[50%] mx-4">
            <Header followingTweets={setFollowingTweets}/>
            <div className="overflow-scroll max-h-screen ">
                <Createpost />
                {!followingTweets&&<Tweets />}
                {followingTweets&&<FollowingTweets/>}
            </div>
        </div>
    );
};

export default Feed;
