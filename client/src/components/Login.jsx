import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice.jsx";
import logo from "../assets/logo.png";
import BASE_URL from "../utils/constant.jsx";

const Login = () => {
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                const response = await axios.post(
                    `${BASE_URL}/api/v1/user/login`,
                    { email, password },
                    { withCredentials: true }
                );
                dispatch(getUser(response?.data?.user));
                if (response?.data?.success) {
                    toast.success(response?.data?.message);
                    navigate('/');
                } else {
                    toast.error(response?.data?.message);
                }
            } else {
                const response = await axios.post(
                    `${BASE_URL}/api/v1/user/signup`,
                    { name, username, email, password }
                );

                if (response?.data?.message === "User already exist") {
                    toast.success("User already exists. Please log in.");
                    setIsLogin(true);
                } else if (response?.data?.success) {
                    toast.success("User signed up successfully. Please log in.");
                    setIsLogin(true);
                } else {
                    toast.error(response?.data?.message || "Signup failed");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.error("Error:", error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row items-center justify-center p-6">
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                    className="lg:w-80 w-60"
                    src={logo}
                    alt="twitter_logo"
                />
            </div>
            <div className="w-full md:w-1/2 bg-white rounded-lg p-6 md:p-10">
                <h2 className="text-2xl lg:text-4xl font-bold text-center mb-6">
                    Shoutout loud so the world listen
                </h2>
                <div className="max-w-sm mx-auto">
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        {isLogin ? "Login" : "Sign Up"}
                    </h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border p-2 rounded"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="border p-2 rounded"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </>
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading
                                ? isLogin
                                    ? "Logging in..."
                                    : "Signing up..."
                                : isLogin
                                    ? "Login"
                                    : "Sign Up"}
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-500 underline"
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
