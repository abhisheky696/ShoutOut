import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { CiHome, CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline, IoIosMore } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineWorkspacePremium, MdOutlineVerified } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Avatar from "react-avatar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logOutUser } from "../redux/userSlice.jsx";
import { toast } from "react-toastify";
import axios from "axios";
const Modal = ({ onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        try {
            dispatch(logOutUser());
            //axios.get(`http://localhost:8000/api/v1/user/logout`);
            toast.success("user logged out successfully");
            navigate("/login");
        } catch (error) {
            console.log("some error occured while logging out the user", error);
            toast.error("some error occured while logging out the user");
        }
    };
    const handleAnotherAccount = () => {
        try {
            dispatch(logOutUser());
            navigate("/login");
        } catch (error) {
            console.log(
                "some error occured while adding anotehr account",
                error.messge
            );
        }
    };
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", closeModal);
        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    }, []);
    return (
        <div
            className="inset-0 absolute bottom-10 left-20 background-blur-sm"
            style={{ zIndex: 50 }}
        >
            <div
                ref={modalRef}
                className="absolute bottom-20 left-0 flex flex-col justify-left cursor-pointer py-2 px-3 rounded-lg text-2xl gap-3 bg-white shadow-2xl"
            >
                <button
                    onClick={logout}
                    className="hover:bg-gray-200 rounded-lg p-2"
                >
                    Logout
                </button>
                <div
                    onClick={handleAnotherAccount}
                    className="hover:bg-gray-200 rounded-lg p-2"
                >
                    Add another account
                </div>
            </div>
        </div>
    );
};
const LeftSidebar = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user.user);
    //console.log("user is defined in leftsidebar",user);
    return (
        <div className=" lg:gap-y-3 lg:pr-12 w-[20%] mx-auto">
            <Link to={"/"}>
                <div>
                    <img className="cursor-pointer w-30 ml-4 my-3" src={logo} />
                </div>
            </Link>
            <div className="flex flex-col gap-1">
                <Link to={"/"}>
                    <div className="flex items-center cursor-pointer hover:bg-gray-400 py-2 px-3 rounded-lg text-xl gap-3 sm:gap-3 sm:justify-start sm:flex">
                        <div className="text-3xl sm:text-3xl sm:mr-2">
                            <CiHome />
                        </div>
                        <div className="sm:block hidden">Home</div>
                    </div>
                </Link>
                <Link to={"/explore"}>
                    <div className="flex items-center cursor-pointer hover:bg-gray-400 py-2 px-3 rounded-lg text-xl gap-3 sm:gap-3 sm:justify-start sm:flex-row">
                        <div className="text-3xl sm:text-3xl sm:mr-2">
                            <CiSearch />
                        </div>
                        <div className="sm:block hidden">Explore</div>
                    </div>
                </Link>
                <Link to={"/notification"}>
                    <div className="flex items-center cursor-pointer hover:bg-gray-400 py-2 px-3 rounded-lg text-xl gap-3 sm:gap-3 sm:justify-start sm:flex-row">
                        <div className="text-3xl sm:text-3xl sm:mr-2">
                            <IoIosNotificationsOutline />
                        </div>
                        <div className="sm:block hidden">Notifications</div>
                    </div>
                </Link>
                <Link to={"/bookmarks"}>
                    <div className="flex items-center cursor-pointer hover:bg-gray-400 py-2 px-3 rounded-lg text-xl gap-3 sm:gap-3 sm:justify-start sm:flex-row">
                        <div className="text-3xl sm:text-3xl sm:mr-2">
                            <FiMessageSquare />
                        </div>
                        <div className="sm:block hidden">Bookmarks</div>
                    </div>
                </Link>
                <Link to={`/profile/${user?._id}`}>
                    <div className="flex items-center cursor-pointer hover:bg-gray-400 py-2 px-3 rounded-lg text-xl gap-3 sm:gap-3 sm:justify-start sm:flex-row">
                        <div className="text-3xl sm:text-3xl sm:mr-2">
                            <CgProfile />
                        </div>
                        <div className="sm:block hidden">Profile</div>
                    </div>
                </Link>
            </div>
            <div className="rounded-full bg-black text-white px-3 py-2 text-center cursor-pointer my-5 text-xl">
                Post
            </div>
            <div
                className="flex justify-center px-2 cursor-pointer hover:bg-gray-400 rounded-full p-2"
                onClick={() => setOpen(!open)}
            >
                <div className="py-2">
                    <Avatar name={user?.name} size="40" round="40px" />
                </div>
                <div className="flex-col hidden sm:block">
                    <div>{user?.name}</div>
                    <div>
                        <i>@{user?.username}</i>
                    </div>
                </div>
                <div className="text-2xl">...</div>
            </div>
            {open && <Modal onClose={() => setOpen(false)} />}
        </div>
    );
};

export default LeftSidebar;
