import React, { useEffect } from "react"
import { Search } from "lucide-react"
import Avatar from "react-avatar"
import { useDispatch, useSelector } from "react-redux"
import useGetUsers from "../Hooks/useGetUsers.jsx"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { doRefreshUser } from "../redux/userSlice.jsx"
import useGetProfile from "../Hooks/useGetProfile.jsx"
import BASE_URL from "../utils/constant.jsx"
const Rightsidebar = () => {
    const dispatch = useDispatch();
    const user=useSelector((state)=>state.user.user);
    const userId=user?._id;
    useGetProfile(userId);
    const profile = useSelector((state) => state.user.profile);
    // console.log(profile)
    useGetUsers(userId);
    const otherUsers = useSelector((state) => state.user.otherUsers);
    //console.log("other users data", otherUsers);
    const handleFollowUnfollow = async (id) => {
        if(profile?.following?.includes(id)) {
            let res = await axios.post(
                `${BASE_URL}/api/v1/user/unfollow/${userId}`,
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            //toast.success(res?.data?.message)
            dispatch(doRefreshUser());
           // console.log(res?.data?.message);
            toast.success(res?.data?.message);
        } else {
            let res = await axios.post(
                `${BASE_URL}/api/v1/user/follow/${userId}`,
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(doRefreshUser());
            toast.success(res?.data?.message);
            // console.log(res?.data?.message);
        }
    };
    return (
        <div className="w-[30%] px-2 py-3 hidden md:block">
            <div className="flex justify-center items-center  border-1 rounded-full px-3">
                <Search />
                <input
                    type="search"
                    className="p-2 w-full outline-none "
                    placeholder="search"
                />
            </div>
            <div className="border my-5 rounded-lg">
                <div className="text-2xl font-bold py-3 px-3">
                    Who to follow
                </div>
                {otherUsers?.map((user) => {
                    return (
                        <div
                            className="flex justify-between items-center rounded-lg py-1 px-3"
                            key={user?._id}
                        >
                            <Link to={"/profile/" + user?._id}>
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <Avatar
                                            name={user.name}
                                            size="40"
                                            round="40px"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-serif">
                                            {user.name}
                                        </div>
                                        <div>
                                            <i>@{user.username}</i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={() => handleFollowUnfollow(user?._id)}
                                className="px-3 py-2 text-white bg-black rounded-full cursor-pointer"
                            >
                                {profile?.following?.includes(user?._id)
                                    ? "following"
                                    : "follow"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Rightsidebar;
