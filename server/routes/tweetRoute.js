import express from 'express'
import { isAuthenticated } from "../Auth/auth.js";
import { createTweet, deleteTweet, findAll, updateTweeet,likeOrDislike, allTweets, allFollowingTweets } from '../controllers/tweet.js';
const router=express.Router();

  
router.get("/api/v1/tweet/",isAuthenticated,findAll);
router.post("/api/v1/tweet/create",isAuthenticated,createTweet);
router.get("/api/v1/tweet/delete/:id",isAuthenticated,deleteTweet);
router.patch("/api/v1/tweet/update/:id",isAuthenticated,updateTweeet);
router.post("/api/v1/tweet/like/:id",isAuthenticated,likeOrDislike);
router.get("/api/v1/tweet/alltweets/:id",isAuthenticated,allTweets);
router.get("/api/v1/tweet/allfollowingtweets/:id",isAuthenticated,allFollowingTweets);
export default router;
