
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const VerifyToken = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["token"] || req.headers.authorization;
    console.log("token", token);
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const { _doc } = decoded;
        const userdata = await User.findById(_doc._id);
        console.log("userdata",userdata);
        req.user = userdata;

    } catch (err) {
        return res.status(401).send("Invalid Token")
    }

    return next();
}