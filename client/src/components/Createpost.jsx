import React, { useState } from "react";
import Avatar from "react-avatar";
import { Image } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { doRefresh } from "../redux/tweetSlice.jsx";
import { toast } from "react-toastify";
import BASE_URL from "../utils/constant";

const Createpost = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const postTweet = async () => {
        if (content.trim() === "") {
            return toast.error("Please write something before posting");
        }

        try {
            setIsPosting(true);
            await axios.post(
                `${BASE_URL}/api/v1/tweet/create`,
                { content },
                { withCredentials: true }
            );
            setContent("");
            dispatch(doRefresh());
            toast.success("Tweet posted successfully");
        } catch (error) {
            console.log("some error occurred while posting a tweet", error);
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="flex flex-col border-b">
            <div className="flex border-b my-2 p-2">
                <div className="cursor-pointer">
                    <Avatar name={user?.name} size="40" round="40px" />
                </div>
                <div>
                    <textarea
                        className="py-2 px-3 mx-4 text-md outline-none w-full h-40 p-2"
                        type="text"
                        name="content"
                        cols={50}
                        placeholder="what is happening?!!"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-between items-center px-5 py-2">
                <div className="cursor-pointer">
                    <Image />
                </div>
                <button
                    onClick={postTweet}
                    type="submit"
                    disabled={isPosting}
                    className={`bg-gray-400 rounded-full px-6 py-2 ${
                        isPosting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                    {isPosting ? "Posting..." : "Post"}
                </button>
            </div>
        </div>
    );
};

export default Createpost;
