import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Keys } from "../../config/Keys.js";



export const SignUp = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.send("fill all fiels")
        }
        
        const exists = await User.findOne({ email: req.body.email });

        if (exists) {
            return res.status(405).send("user already exists : ");
        }
        const hashpassword = await bcrypt.hash(req.body.password, 12);

        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashpassword
        }).save();

        res.status(201).send({ status: true, data: user });

    } catch (error) {
        res.status(500).send({ "error": error })
    }
}

export const Login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        const password = await bcrypt.compare(req.body.password, user.password);

        if (!password) return res.status(400).send("Invalid Email or password");

        const token = jwt.sign({ ...user }, Keys.TOKEN_KEY);
        res.status(200).send({status: true, data: { token: token,user: user}});

    } catch (error) {
        res.status(500).send("internal error login");
    }
}