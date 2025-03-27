import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Tweet from "../models/tweet.js";
export const root = (req, res) => {
    res.send("root route is working");
};
export const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.send({
                message: "All fields are required",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.send({
                message: "User already exist",
                success: true,
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 6);
        await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        return res.send({
            message: "user created successfully",
            success: true,
        });
    } catch (error) {
        console.log("some error occured while signup a user", error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({
                message: "All fields are required",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const matchPassword = await bcryptjs.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            maxAge: 86400000,
            httpOnly: true,
            secure:true,
            sameSite:"None"
        });
        return res.status(200).json({
            message: `Welcome back ${user.name}`,
            user,
            token,
            success: true,
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.send({
        message: "logged out successfully",
        success: true,
    });
};

export const bookmarks = async (req, res) => {
    try {
        const tweetId = req.body.id;
        const userId = req.params.id;
        let user = await User.findById(userId);
        let tweet = await Tweet.findById(tweetId);
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        if (!tweet) {
            return res.send({
                success: false,
                message: "Tweet does not exist with this ID",
            });
        }
        if (user.bookmarks.includes(tweetId)) {
            await User.findByIdAndUpdate(userId, {
                $pull: { bookmarks: tweetId },
            });
            return res.send({
                success: true,
                message: "Tweet removed from bookmarks",
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                $push: { bookmarks: tweetId },
            });
            return res.send({
                success: true,
                message: "Tweet bookmarked successfully",
            });
        }
    } catch (error) {
        console.error("Error while bookmarking the tweet:", error);
        return res.send({
            success: false,
            message: "An error occurred while bookmarking the tweet",
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        // console.log(userId)
        if (!userId) {
            return res.send({
                success: false,
                message: "user id is not accessible",
            });
        }
        const user = await User.findById(userId).select("-password");
        // console.log(user)
        if (!user) {
            return res.send({
                success: false,
                message: "user does not exist with this ID",
            });
        }

        res.send({
            success: true,
            user,
        });
    } catch (error) {
        console.log(
            "some error occured while fetching the profile data",
            error
        );
        return res.send({
            success: false,
            message: "some error occured while fetching profile data",
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.send({
                success: false,
                message: "userid does not exist",
            });
        }
        //console.log(userId);
        const users = await User.find({ _id: { $ne: userId } });
        //console.log(users);
        if (!users) {
            return res.send({
                success: true,
                message: "users does not exist",
            });
        }
        res.send({
            success: true,
            data: users,
        });
    } catch (error) {
        console.log("some error occured while fetching the users");
        res.send({
            success: false,
            message: "some error occured while fetching all other users",
        });
    }
};
export const allUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.send({
                success: false,
                message: "users does not exist",
            });
        }
        res.send({
            success: true,
            users,
        });
    } catch (error) {
        console.log("some error occured while fetching all users");
        res.send({
            success: false,
            message: "some error occured while fetching all the users",
        });
    }
};
export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.params.id;
        const userId = req.body.id;
        if (!loggedInUserId) {
            return res.send({
                success: false,
                message: "user id does not exist",
            });
        }
        if (!userId) {
            return res.send({
                success: false,
                message: "following users id does not exist",
            });
        }
        if (loggedInUserId == userId) {
            return res.send({
                success: false,
                message: "A user can't follow himself.",
            });
        }
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        if (loggedInUser.following.includes(userId)) {
            return res.send({
                success: false,
                message: `${loggedInUser.name} already follows ${user.name}`,
            });
        } else {
            await User.findByIdAndUpdate(loggedInUserId, {
                $push: { following: userId },
            });
            await User.findByIdAndUpdate(userId, {
                $push: { followers: loggedInUserId },
            });
        }

        res.send({
            success: true,
            message: `${loggedInUser.name} just followed ${user.name}`,
        });
    } catch (error) {
        console.log("some error occured while following the user");
        return res.send({
            success: false,
            message: "some error occured while following the user",
        });
    }
};
export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.params.id;
        const userId = req.body.id;
        if (!loggedInUserId) {
            return res.send({
                success: false,
                message: "user id does not exist",
            });
        }
        if (!userId) {
            return res.send({
                success: false,
                message: "following users id does not exist",
            });
        }
        if (loggedInUserId == userId) {
            return res.send({
                success: true,
                message: "A user can't follow/unfollow himself.",
            });
        }
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        if (!loggedInUser.following.includes(userId)) {
            return res.send({
                success: false,
                message: `${loggedInUser.name} already unfollowed ${user.name}`,
            });
        } else {
            await User.findByIdAndUpdate(loggedInUserId, {
                $pull: { following: userId },
            });
            await User.findByIdAndUpdate(userId, {
                $pull: { followers: loggedInUserId },
            });
        }

        res.send({
            success: true,
            message: `${loggedInUser.name} just unfollowed ${user.name}`,
        });
    } catch (error) {
        console.log("some error occured while unfollowing the user");
        return res.send({
            success: false,
            message: "some error occured while unfollowing the user",
        });
    }
};

export const getTweetsByUser = async (req,res) => {
    try {
        const userId=req.query.id;
        // console.log(userId)
        if(!userId) {
            return res.send({
                success:false,
                message:"user does not exist"
            })
        }
        // console.log(userId)
        const tweets=await Tweet.find({'author':userId}).populate("author","name username")
        if(!tweets.length) {
            return res.send({
                success:false,
                message:"No post exists for this user"
            })
        }
        return res.send({
            success:true,
            tweets,
        })
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:error.message,
        })
    }
}


export const getUsersBookmarkedTweet = async (req,res) => {
    try {
        const userId=req.body.id;
        console.log(userId)
        const user=User.findById({id:userId});
        console.log(user)
        return;
        // not completed yet
    } catch (error) {
        console.log("some error occured while fetching bookmarked tweets")
        res.send({
            success:false,
            message:error.message
        })
    }
}
