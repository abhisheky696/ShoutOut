import React from "react";
import Avatar from "react-avatar";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import useGetProfile from "../Hooks/useGetProfile.jsx";
import useGetTweetsByUser from "../Hooks/useGetTweetsByUser.jsx";
import Tweetcard from "./Tweetcard.jsx";

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const loggedInUserId = user?._id;
    const { id } = useParams();
    
    useGetTweetsByUser(id);
    useGetProfile(id);
    
    const tweets = useSelector((state) => state.user.tweets);
    const profile = useSelector((state) => state.user.profile);

    let followButtonText = "Follow";
    if (user?.following?.includes(id)) {
        followButtonText = "Following";
    }

    if (profile === null) {
        return <div className="w-[50%] bg-white text-center text-3xl">Loading...</div>;
    }
    if (!profile) {
        return <div className="w-[50%] bg-white text-center text-3xl">No user found</div>;
    }

    return (
        <div className="w-[50%] h-[100vh] overflow-y-scroll overflow-x-hidden bg-white m-0 border-l border-r">
            <div className="flex gap-7 my-1 py-1 items-center px-3">
                <Link to="/" className="cursor-pointer">
                    <ArrowLeft />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">{profile?.name}</h1>
                    <h1>{tweets?.length || 0} Tweets</h1>
                </div>
            </div>
            <div className="h-52 bg-gray-300 px-3"></div>
            <div className="relative -top-16 left-3 flex justify-between items-center">
                <Avatar
                    className="rounded-full"
                    alt={profile?.name}
                    name={profile?.name}
                    size={150}
                />
                <button className="px-3 py-1 text-white bg-black h-10 mr-10 rounded-full cursor-pointer font-medium">
                    {loggedInUserId === id ? "Edit Profile" : followButtonText}
                </button>
            </div>
            <div className="flex flex-col justify-start relative -top-12 px-3">
                <h2 className="text-xl font-bold">{profile?.name}</h2>
                <p className="text-gray-500">@{profile?.username}</p>
                <p className="text-gray-500 mt-2">📅 Joined February 2025</p>
                <div className="flex gap-4 mt-1 text-gray-700">
                    <span>
                        <strong>{profile?.following?.length}</strong> Following
                    </span>
                    <span>
                        <strong>{profile?.followers?.length}</strong> Followers
                    </span>
                </div>
            </div>
            <div className="px-3">
                <h2 className="text-2xl font-bold my-3 text-center">All Tweets</h2>
                <hr/>
                {tweets?.length > 0 ? (
                    tweets.map((tweet) => <Tweetcard key={tweet?._id} tweet={tweet} />)
                ) : (
                    <p className="text-gray-500 mt-4">No Tweets available</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
