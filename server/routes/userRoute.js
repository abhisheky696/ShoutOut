import express from 'express'
import { bookmarks, getProfile, getAllUsers, login, logout, root, signup, allUsers, follow, unfollow, getTweetsByUser, getUsersBookmarkedTweet } from '../controllers/user.js'
import { isAuthenticated } from '../Auth/auth.js';
const router=express.Router()
router.post("/api/v1/user/signup",signup);
router.get("/api/v1/user/getallusers/:id",isAuthenticated,getAllUsers);
router.post("/api/v1/user/login",login);
router.get("/api/v1/user/logout",isAuthenticated,logout);
router.patch("/api/v1/user/bookmark/:id", isAuthenticated,bookmarks);
router.get("/api/v1/user/profile/:id",isAuthenticated,getProfile);
router.get("/api/v1/user/allusers/:id",isAuthenticated,getAllUsers);
router.post("/api/v1/user/follow/:id",isAuthenticated,follow);
router.post("/api/v1/user/unfollow/:id",isAuthenticated,unfollow);
router.get("/api/v1/user/posts",isAuthenticated,getTweetsByUser);
router.get("/api/v1/user/bookmarktweets",isAuthenticated,getUsersBookmarkedTweet);

export default router;

