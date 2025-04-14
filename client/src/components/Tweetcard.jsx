import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { FolderCheck, MessageCircle } from "lucide-react";
import { Heart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doRefresh } from "../redux/tweetSlice.jsx";
import BASE_URL from "../utils/constant.jsx";
import { doRefreshUser } from "../redux/userSlice.jsx";
import Comments from "./Comments.jsx";
const Tweetcard = ({ tweet }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    let userId = user?._id;
    let [isLike, setIsLike] = useState(tweet?.likes?.includes(userId));
    const [bookmarked, setBookmarked] = useState(
        user?.bookmarks?.includes(tweet?._id)
    );
    const [comments, setComments] = useState(false);
    const handleComments = () => {
        try {
            setComments(!comments);
        } catch (error) {
            console.log("some error occured while working withi comments");
        }
    };
    const handleLikeDislike = async (id) => {
        try {
            let response = await axios.post(
                `${BASE_URL}/api/v1/tweet/like/${userId}`,
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            toast.success(response?.data?.message);
            dispatch(doRefresh());
            dispatch(doRefreshUser());
        } catch (error) {
            console.log("some error cocured while liking a tweet", error);
            toast.error("some error occured");
        }
    };
    const handleBookmark = async (id) => {
        try {
            let response = await axios.patch(
                `${BASE_URL}/api/v1/user/bookmark/${userId}`,
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            toast.success(response?.data?.message);
        } catch (error) {
            console.log("some error occured in Bookmark", error);
            toast.success("error");
        }
        const timeSince = (timestamp) => {
            let time = Date.parse(timestamp);
            let now = Date.now();
            let secondsPast = (now - time) / 1000;
            let suffix = "ago";
            let intervals = {
                year: 31536000,
                month: 2592000,
                week: 604800,
                day: 86400,
                hour: 3600,
                minute: 60,
                second: 1,
            };
            for (let i in intervals) {
                let interval = intervals[i];
                if (secondsPast >= interval) {
                    let count = Math.floor(secondsPast / interval);
                    return `${count} ${i} ${count > 1 ? "s" : ""} ${suffix}`;
                }
            }
        };
    };
    return (
        <div>
            <div className="flex border-b border-gray-400 px-2 py-4  m-3 whitespace-normal hover:bg-gray-100 cursor-pointer">
                <div>
                    <Avatar
                        name={tweet?.author?.name}
                        size="40"
                        round="40px"
                        onClick={() => handleComments()}
                    />
                </div>
                <div>
                    <div
                        className="flex gap-2 mx-3"
                        onClick={() => handleComments()}
                    >
                        <span>{tweet?.author?.name}</span>
                        <span className="cursor-pointer">
                            @{tweet?.author?.username}
                        </span>
                        <span></span>
                    </div>
                    <div className="mx-2" onClick={() => handleComments()}>
                        {tweet?.content}
                    </div>
                    <div className="flex justify-between px-5 py-2">
                        <div
                            className="flex cursor-pointer rounded-full shadow-2xl"
                            onClick={() => handleComments()}
                        >
                            <MessageCircle />
                            {tweet?.comments.length}
                        </div>
                        <button
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => {
                                setIsLike(!isLike);
                                handleLikeDislike(tweet?._id);
                            }}
                        >
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                animate={{ scale: isLike ? [1, 1.3, 1] : 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Heart
                                    className={`transition ${
                                        isLike
                                            ? "fill-red-500 stroke-red-500"
                                            : "stroke-gray-600"
                                    }`}
                                />
                            </motion.div>
                            <span className="text-sm">
                                {tweet?.likes?.length}
                            </span>
                        </button>
                        <button
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => {
                                setBookmarked(!bookmarked);
                                handleBookmark(tweet?._id);
                            }}
                        >
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Bookmark
                                    className={`transition ${
                                        bookmarked
                                            ? "fill-gray-300 stroke-gray-500"
                                            : "stroke-gray-600"
                                    }`}
                                />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>
            {comments && <Comments />}
        </div>
    );
};

export default Tweetcard;
