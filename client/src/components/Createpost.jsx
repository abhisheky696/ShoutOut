import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Fullscreen, Image } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { doRefresh } from "../redux/tweetSlice";
import { toast } from "react-toastify";
import BASE_URL from "../utils/constant";
const Createpost = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch=useDispatch();
    const [content, setContent] = useState("");
    const postTweet = async () => {
        if(content!="") {
            try {
                await axios.post(
                    `${BASE_URL}/api/v1/tweet/create`,
                    {
                        content,
                    },
                    {
                        withCredentials: true,
                    }
                );
               // console.log("tweet posted successfully");
                setContent("");
                dispatch(doRefresh());
                toast.success("Tweet posted successfully")
                //console.log(refresh)
            } catch (error) {
                console.log("some error occured while posting a tweet",error);
            }
        } else {
            return toast.error("Please write something before posting ")
        }
    };
    //console.log("data received in the create section", user);
    return (
        <div className="flex flex-col border-b">
            <div className="flex border-b my-2 p-2 ">
                <div className="cursor-pointer">
                    <Avatar name={user?.name} size="40" round="40px" />
                </div>
                <div>
                    <textarea
                        className="py-2 px-3 mx-4 text-md outline-none w-full h-40 p-2  "
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
                    className="bg-gray-400 rounded-full px-6 py-2 cursor-pointer"
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default Createpost;
