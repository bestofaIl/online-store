const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

router.post("signUp",[
    check("email", "Check your email").isEmail(),
    check("password", "Check your password").isLength({min: 8}),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: "INVALID_DATA",
                    code: 400
                }
            })
        }
        const {email, password} = req.body;
        const isUserExists = User.findOne({email});
        if (isUserExists) {
            return res.status(400).json({
                error: {
                    message: "EMAIL_EXISTS",
                    code: 400
                }
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = User.create({
            ...req.body,
            image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`,
            password: hashedPassword
        })
    } catch (e) {

    }
    }
])