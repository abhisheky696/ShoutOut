import React, { useState } from "react";
import Avatar from "react-avatar";
import { FolderCheck, MessageCircle } from "lucide-react";
import { Heart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doRefresh } from "../redux/tweetSlice";
const Tweetcard = ({ tweet }) => {
    const dispatch=useDispatch();
    const [liked, setLiked] = useState(false);
    const user = useSelector((state) => state.user.user);
    let userId = user?._id;
    let [isLike,setIsLike]=useState(tweet.likes.includes(userId));
    // isLike=tweet.likes.includes(userId)
    // console.log(isLike)
    const handleLikeDislike = async (id) => {
        try {
            // console.log("like button was clicked");
            // console.log("tweet id ",id)
            // console.log("user id ",userId)
            let response = await axios.post(
                `http://localhost:8000/api/v1/tweet/like/${userId}`,
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            // console.log(response.data.message);
            toast.success(response?.data?.message);
            dispatch(doRefresh());
            
        } catch (error) {
            console.log("some error cocured while liking a tweet", error);
            toast.error("some error occured");
        }
    };
    return (
        <div className="flex border-b m-3 whitespace-normal">
            <div>
                <Avatar name={tweet?.author?.name} size="40" round="40px" />
            </div>
            <div>
                <div className="flex gap-2 mx-3">
                    <span>{tweet?.author?.name}</span>
                    <span className="cursor-pointer">
                        @{tweet?.author?.username}
                    </span>
                    <span>7h ago</span>
                </div>
                <div className="mx-2">{tweet?.content}</div>
                <div className="flex justify-between px-5 py-2">
                    <div className="flex cursor-pointer rounded-full shadow-2xl">
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
                            animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
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
                                {tweet?.likes.length}
                        </span>
                    </button>
                    <div className="flex cursor-pointer rounded-full shadow-2xl">
                        <Bookmark />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweetcard;
