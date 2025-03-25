import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log("token",token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated",
            });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error("Error during authentication:", error.message);
        return res.redirect("/login");
    }
};
