
import express from "express";
import { Login, SignUp, FirebaseAuthentication } from "../../controllers/authcontroller/Auth.js";

// ==================================================================

export const Auth = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User signup & login operations
 */

// ==================================================================

/**
 * @swagger
 * /signup:
 *  post:
 *      summary: signup new user
 *      description: signup new user
 *      tags: [Authentication]
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
 *      summary: user login 
 *      description: user login 
 *      tags: [Authentication]
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

// ==================================================================

/**
 * @swagger
 * /firebaseAuthentication:
 *  post:
 *      summary: firebase authentication
 *      description: user login 
 *      tags: [Authentication]
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
 *                  number:
 *                      type: string
 *      responses:
 *          201:
 *              description: User created
 */

Auth.post('/signup', SignUp);
Auth.post('/login', Login);
Auth.post('/firebaseAuthentication',FirebaseAuthentication)






