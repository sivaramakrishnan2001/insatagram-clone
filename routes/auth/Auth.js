
import express from "express";
import { Login, SignUp } from "../../controllers/authcontroller/Auth.js";

// ==================================================================

export const Auth = express.Router();


/**
 * @swagger
 * /signup:
 *  post:
 *      description: signup new user
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create
 *          schema:
 *              type: object
 *              required:
 *                - username
 *              properties:
 *                   name:
 *                       type: string
 *                   email:
 *                      type: string
 *                   password:
 *                       type: string
 *      responses:
 *          201:
 *              description: User created
 */

// ==================================================================

/**
 * @swagger
 * /login:
 *  post:
 *      description: Create new user
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create
 *          schema:
 *              type: object
 *              required:
 *                - username
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          201:
 *              description: User created
 */

Auth.post('/signup', SignUp);
Auth.post('/login', Login);






