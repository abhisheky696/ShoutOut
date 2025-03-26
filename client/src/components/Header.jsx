import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doRefresh } from "../redux/tweetSlice.jsx";

const Header = ({ followingTweets }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("forYou");

    const handleToggle = (tab) => {
        setActiveTab(tab);
        if (tab === "followings") {
            followingTweets(true);
            dispatch(doRefresh());
        } else {
            followingTweets(false);
        }
    };

    return (
        <div className="flex h-12 font-semibold border-b sticky">
            <button
                onClick={() => handleToggle("forYou")}
                className={`w-[50%] flex justify-center items-center border-r cursor-pointer ${
                    activeTab === "forYou" ? "bg-gray-300" : ""
                }`}
            >
                For You
            </button>
            <button
                onClick={() => handleToggle("followings")}
                className={`w-[50%] flex justify-center items-center cursor-pointer ${
                    activeTab === "followings" ? "bg-gray-300" : ""
                }`}
            >
                Followings
            </button>
        </div>
    );
};

export default Header;
