import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.send({
                success: true,
                message: "user is not authenticated",
            });
        }
        const authuser = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = authuser.userId;
        next();
    } catch (error) {
        console.log("some error occured while authenticating the user.");
        res.send({
            success: false,
            message: "some error occured while authenticating the user",
        });
    }
};
