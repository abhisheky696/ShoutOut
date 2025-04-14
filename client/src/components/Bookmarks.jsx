import React from "react";
import Tweetcard from "./Tweetcard.jsx";
import { useSelector } from "react-redux";
import useGetBookmarkedTweets from "../Hooks/useGetBookmarkedTweets.jsx";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Bookmarks = () => {
    const loggedInUser = useSelector((state) => state.user.profile);
    useGetBookmarkedTweets(loggedInUser?._id);
    const bookmarkedTweets = useSelector((state) => state.user.bookmarks);
    return (
        <div className="w-[50%] min-h-screen bg-white dark:bg-gray-900 border-l border-r">
            <div className="flex items-center gap-4 py-3 px-4 border-b">
                <Link to="/" className="cursor-pointer">
                    <ArrowLeft className="text-gray-700 dark:text-white" />
                </Link>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Bookmarks
                </h2>
            </div>
            <div className="w-full max-h-[80vh] overflow-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-400">
                {bookmarkedTweets?.length > 0 ? (
                    bookmarkedTweets.map((tweet) => (
                        <Tweetcard key={tweet?._id} tweet={tweet} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-10">
                        No bookmarks available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
