
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


PostRouter.get('/allpost', GetAllPost);
PostRouter.get('/post/userPost/:userId', GetUserPost);

PostRouter.post('/createPost', VerifyToken, CreatePost);
PostRouter.post('/post/unsave', VerifyToken, UnSave);
PostRouter.post('/post/save', VerifyToken, Save);

PostRouter.put('/post/like', VerifyToken, Like);
PostRouter.put('/post/unlike', VerifyToken, UnLike);
PostRouter.put('/post/comment', VerifyToken, Comment);

PostRouter.delete('/post/delete', VerifyToken, DeletePost);


