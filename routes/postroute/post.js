
import express from "express";
// import path from "path";
// import multer from "multer";
import { VerifyToken } from "../../config/VerifyToken.js";
import { Like, CreatePost, UnLike, DeletePost, Comment, Save, UnSave, GetAllPost, GetUserPost } from "../../controllers/postcontroller/Post.js";

// ==================================================================

export const PostRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({ storage, fileFilter });

// ==================================================================

/**
 * @swagger
 * tags:
 *   name: Post APIs
 *   description: User operations
 */

// ==================================================================

/**
 * @swagger
 * /allpost:
 *   get:
 *     summary: Get all allpost
 *     description: allpost
 *     tags: [Post APIs]
 *     consumes:
 *          - application/json
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
 * /post/userPost/{userId}:
 *  get:
 *      summary: Get userPost
 *      description: get user details
 *      tags: [Post APIs]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *          type: string
 *          required: true
 *          description: string id 
 *      responses:
 *          200:
 *              description: get user details
 */

// ==================================================================

/**
 * @swagger
 * /createPost:
 *   post:
 *     summary: Get createPost
 *     description: createPost
 *     tags: [Post APIs]
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
 *             title:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             song:
 *               type: object
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /post/unsave:
 *   post:
 *     description: unsave
 *     tags: [Post APIs]
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
 *             postId:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /post/save:
 *   post:
 *     description: save
 *     tags: [Post APIs]
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
 *             postId:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /post/like:
 *   put:
 *     description: like
 *     tags: [Post APIs]
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
 *             postid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /post/unlike:
 *   put:
 *     description: unlike
 *     tags: [Post APIs]
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
 *             postid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /post/comment:
 *   put:
 *     description: comment
 *     tags: [Post APIs]
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
 *             postid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *               text:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /post/delete:
 *   delete:
 *     description: delete
 *     tags: [Post APIs]
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
 *             postid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================



PostRouter.get('/allpost', GetAllPost);
PostRouter.get('/post/userPost/:userId', GetUserPost);

PostRouter.post('/createPost', VerifyToken, CreatePost);
PostRouter.post('/post/unsave', VerifyToken, UnSave);
PostRouter.post('/post/save', VerifyToken, Save);

PostRouter.put('/post/like', VerifyToken, Like);
PostRouter.put('/post/unlike', VerifyToken, UnLike);
PostRouter.put('/post/comment', VerifyToken, Comment);

PostRouter.delete('/post/delete', VerifyToken, DeletePost);


