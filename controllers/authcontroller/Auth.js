import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const SignUp = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.send("fill all fiels")
        }
        const { email, name, password } = req.body;
        serverLog("SignUp", { email, name, password });

        const exists = await User.findOne({ email: req.body.email });

        if (exists) {
            return res.status(405).send("user already exists : ");
        }
        const hashpassword = await bcrypt.hash(req.body.password, 12);
        serverLog("hashpassword", hashpassword);

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
    const { email, password } = req.body
    serverLog("Login",{ email, password});

    try {
        const user = await User.findOne({ email: req.body.email });
        const password = await bcrypt.compare(req.body.password, user.password);

        if (!user) res.status(400).send("Invalid Email  req.body.email");
        if (!password) res.status(400).send("Invalid Email or password");

        const token = jwt.sign({ ...user }, process.env.TOKEN_KEY);
        res.status(200).send({ status: true, data: { token: token, user: user } });

    } catch (error) {
        res.status(500).send("internal error login");
    }
}


export const FirebaseAuthentication = async (req, res) => {

    const { name, email, number } = req.body;
    serverLog("FirebaseAuthentication", {name, email, number});

    if (!name || !email) {
        return res.send("fill all fiels");
    }

    try {
        const exists = await User.findOne({ email: email });

        if (exists) {

            const token = jwt.sign({ ...exists }, process.env.TOKEN_KEY);

            if (!exists.number && number) {
                const doc = await User.findOneAndUpdate({ email: email }, {
                    number: number
                }, {
                    new: true
                });

                return res.status(200).send({ status: true, data: { token: token, user: doc } });

            }
            return res.status(200).send({ status: true, data: { token: token, user: exists } });
        }

        const user = await User.create({
            name: name,
            email: email,
            number: number,
            userid: "" + new Date().getTime() + Math.floor(Math.random() * 100000),
            password: ""
        });

        const token = jwt.sign({ ...user }, process.env.TOKEN_KEY);

        res.status(201).send({ status: true, data: { token: token, user: user } });

    } catch (error) {
        res.status(500).send("internal error login");
    }
}