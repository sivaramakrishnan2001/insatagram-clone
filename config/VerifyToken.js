
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Keys } from "./Keys.js";

export const VerifyToken = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {

        const decoded = jwt.verify(token, Keys.TOKEN_KEY);

        const { _doc } = decoded;
        const userdata = await User.findById(_doc._id);

        req.user = userdata;

    } catch (err) {
        return res.status(401).send("Invalid Token")
    }

    return next();
}