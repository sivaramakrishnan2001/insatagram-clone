import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { Follow, GetProfile, GetUser, GetUsers, RemoveFollower, UnFollow, UpdateProfile } from "../../controllers/userscontroller/UserController.js";
export const UserRouter = express.Router();

// =====================================================================
// =====================================================================

UserRouter.get("/users", GetUsers);
UserRouter.get("/user/:id", GetUser);
UserRouter.put('/user/follow', VerifyToken, Follow);
UserRouter.put("/user/unfollow", VerifyToken, UnFollow);
UserRouter.put('/user/removefollower', VerifyToken, RemoveFollower);
UserRouter.get('/user/getprofile/:id', VerifyToken, GetProfile);
UserRouter.put('/user/updateProfile', VerifyToken, UpdateProfile);



