import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { Follow, GetProfile, GetUser, GetUsers, RemoveFollower, UnFollow, UpdateProfile } from "../../controllers/userscontroller/UserController.js";
export const UserRouter = express.Router();

// =====================================================================

/**
 * @swagger
 * tags:
 *   name: USER APIS
 *   description: User operations
 */

// =====================================================================

/**
 * @swagger
 * /users:
 *  get:
 *     summary: get all users
 *     description: get all users
 *     tags: [USER APIS]
 *     responses:
 *          201:
 *              description: get all users
 */

// =====================================================================

/**
 * 
 * @swagger
 * /user/{userId}:
 *  get:
 *      summary: get user details
 *      description: get user details
 *      tags: [USER APIS]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of user to delete
 *      responses:
 *          200:
 *              description: get user details
 */

// =====================================================================
// /user/follow


/**
 * @swagger
 * /user/follow:
 *   put:
 *     summary: follow user
 *     description: follow user
 *     tags: [USER APIS]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         required: true
 *         description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// =====================================================================

/**
 * @swagger
 * /user/unfollow:
 *   put:
 *     summary: unfollow user
 *     description: unfollow user
 *     tags: [USER APIS]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         required: true
 *         description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */


// =====================================================================

/**
 * @swagger
 * /user/removefollower:
 *   put:
 *     summary: removefollower user
 *     description: removefollower user
 *     tags: [USER APIS]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         required: true
 *         description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * 
 * @swagger
 * /user/getprofile/{id}:
 *  get:
 *      summary: get user details
 *      description: get user details
 *      tags: [USER APIS]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id 
 *      responses:
 *          200:
 *              description: get user details
 */

// ==================================================================

/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     summary: update user Profile
 *     description: update user Profile
 *     tags: [USER APIS]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             profile:
 *               type: string
 *         required: true
 *         description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================
// ==================================================================


UserRouter.get("/users", GetUsers);
UserRouter.get("/user/:id", GetUser);
UserRouter.put('/user/follow', VerifyToken, Follow);
UserRouter.put("/user/unfollow", VerifyToken, UnFollow);
UserRouter.put('/user/removefollower', VerifyToken, RemoveFollower);
UserRouter.get('/user/getprofile/:id', GetProfile);
UserRouter.put('/user/updateProfile', VerifyToken, UpdateProfile);



