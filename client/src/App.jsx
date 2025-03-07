import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Feed from "./components/Feed";
import Leftsidebar from "./components/Leftsidebar";
import Profile from "./components/Profile";
import Rightsidebar from "./components/Rightsidebar";
import Login from "./components/Login";
import "./index.css";
const Layout = ({ children }) => {
    return (
        <div className="md:w-[80%] w-full flex  justify-between  mx-auto">
            <Leftsidebar />
            {children}
            <Rightsidebar />
        </div>
    );
};
export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout><Feed /></Layout>} />
                <Route path={'/profile/:id'} element={<Layout><Profile /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
};
