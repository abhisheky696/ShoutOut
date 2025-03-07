import Tweet from "../models/tweet.js";
import User from "../models/user.js";

export const findAll = async (req, res) => {
    try {
        const allTweet = await Tweet.find({});
        res.send({
            success: true,
            tweet: allTweet,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "some error occured while listing all the users",
        });
    }
};
export const createTweet = async (req, res) => {
    try {
        const id = req.user;
        if (!id) {
            return res.send({
                success: false,
                message: "user does not exist",
            });
        }
        const { content } = req.body;
        if (!content) {
            return res.send({
                message: "all fields are required",
                success: false,
            });
        }
        // console.log(content);
        const newTweet = await Tweet.create({
            author: id,
            content,
        });
        res.send({
            success: true,
            message: "tweet created successfully",
            newTweet,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "some error occured while creating a tweet",
        });
    }
};
export const updateTweeet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.send({
                success: true,
                message: "tweet with this id does not exist",
            });
        }
        const tweet = await Tweet.findById(id);
        if (!tweet) {
            return res.send({
                success: false,
                message: "tweet with this id does not exist",
            });
        }
        const { content } = req.body;
        const newTweet = await Tweet.findByIdAndUpdate(id, {
            content: content,
        });
        res.send({
            success: true,
            message: "tweet updated successfully",
            newTweet,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "some error occured while updating tweet",
        });
    }
};
export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.send({
                success: false,
                messae: "tweet does not exist with this is id",
            });
        }
        const tweet = await Tweet.findById(id);
        if (!tweet) {
            return res.send({
                success: false,
                message: "tweet does not exist with this id",
            });
        }
        const deletedTweet = await Tweet.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "tweet deleted successfully",
            tweet: deleteTweet,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "some error occured while deleting the tweet",
        });
    }
};

export const likeOrDislike = async (req, res) => {
    try {
        const tweetId = req.body.id;
        const userId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        const user = await User.findById(userId);
       // console.log(user)
        if (!tweet) {
            return res.send({
                success: false,
                message: "tweet does not exist with this id",
            });
        }
        if (!user) {
            return res.send({
                success: false,
                message: "user does not exist",
            });
        }
        if (tweet.likes.includes(userId)) {
            await Tweet.findByIdAndUpdate(tweetId, {
                $pull: {
                    likes: userId,
                },
            });
            return res.send({
                success: true,
                message: "user disliked the tweet",
            });
        } else {
            await Tweet.findByIdAndUpdate(tweetId, {
                $push: {
                    likes: userId,
                },
            });
            return res.send({
                success: true,
                message: "user liked the post",
            });
        }
    } catch (error) {
        console.log("some error occured while liking the post");
        res.send({
            success: true,
            message: "some error occured while liking the post",
        });
    }
};

export const allTweets = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }
        const userTweets = await Tweet.find({ author: userId }).populate("author", "name username");
        let followingTweets = [];
        if (user.following && user.following.length > 0) {
            followingTweets = await Tweet.find({ author: { $in: user.following } }).populate("author", "name username");
        }
        const allTweets = [...userTweets, ...followingTweets];
        res.json({
            success: true,
            allTweets,
        });
    } catch (error) {
        console.error("Error fetching tweets:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching tweets.",
        });
    }
};


export const allFollowingTweets = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }
        //const userTweets = await Tweet.find({ author: userId }).populate("author", "name username");
        let followingTweets = [];
        if (user.following && user.following.length > 0) {
            followingTweets = await Tweet.find({ author: { $in: user.following } }).populate("author", "name username");
        }
        const allTweets = [...followingTweets];
        res.json({
            success: true,
            allTweets,
        });
    } catch (error) {
        console.error("Error fetching tweets:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching tweets.",
        });
    }
};
