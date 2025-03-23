import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Feed from "./components/Feed";
import Leftsidebar from "./components/Leftsidebar";
import Profile from "./components/Profile";
import Rightsidebar from "./components/Rightsidebar";
import Login from "./components/Login";
import "./index.css";
import { useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound";
const Layout = ({ children }) => {
    return (
        <div className="md:w-[80%] w-full flex  justify-between  mx-auto">
            <Leftsidebar />
            {children}
            <Rightsidebar />
        </div>
    );
};
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.user);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    if (!isAuthenticated) return null; 
    return children; 
};
export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Layout><Feed /></Layout></ProtectedRoute>} />
                <Route path="/explore" element={<ProtectedRoute><Layout><PageNotFound /></Layout></ProtectedRoute>} />
                <Route path="/notification" element={<ProtectedRoute><Layout><PageNotFound /></Layout></ProtectedRoute>} />
                <Route path="/message" element={<ProtectedRoute><Layout><PageNotFound /></Layout></ProtectedRoute>} />
                <Route path={'/profile/:id'} element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
};
