
import express from "express";
import { Login, SignUp } from "../../controllers/authcontroller/Auth.js";

// ==================================================================

export const Auth = express.Router();
Auth.post('/signup', SignUp);
Auth.post('/login', Login);






