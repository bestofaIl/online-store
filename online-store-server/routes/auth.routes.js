const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/token.service");
const { check, validationResult } = require("express-validator");

router.post("/signUp",[
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
        const isUserExists = await User.findOne({email});
        if (isUserExists) {
            return res.status(400).json({
                error: {
                    message: "EMAIL_EXISTS",
                    code: 400
                }
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`,
            ...req.body,
            password: hashedPassword
        })

        const tokens = tokenService.generate({ _id: newUser._id });
        await tokenService.save(newUser._id, tokens.refreshToken);

        res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
        res.status(500).json({
            message: "Error on server, try later!",
            error: e
        })
    }
    }
])

router.post("/signInWithPassword", [
    check("email", "Check your email").isEmail(),
    check("password", "Check your password").isLength({min: 8}),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "Invalid data",
                        code: 400
                    }
                })
            }
            const { email, password } = req.body;

            const existingUser = await User.findOne({email});
            if (!existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL DOESN'T EXISTS",
                        code: 400
                    }
                })
            }

            const isEqualPassword = await bcrypt.compare(password, existingUser.password);

            if (!isEqualPassword) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400
                    }
                })
            }

            const tokens = tokenService.generate({_id: existingUser._id});
            await tokenService.save(existingUser._id, tokens.refreshToken);

            res.status(200).send({
                ...tokens,
                userId: existingUser._id
            })

        } catch (e) {
            res.status(500).json({
                message: "Error on server, try later!"
            })
        }
    }
])

function isTokenInvalid(data, token) {
    return !data || !token || data._id !== token?.user?.toString();
}

router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;
        const data = tokenService.validateRefresh(refreshToken);

        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            res.status(401).json({
                message: "Unauthorized"
            })
        }

        const tokens = tokenService.generate({
            _id: data._id
        });

        await tokenService.save(data._id, tokens.refreshToken);

        res.status(200).send({...tokens, userId: data._id});
    } catch (e) {
        res.status(500).json({
            message: "Error on server, try later!"
        })
    }
})

module.exports = router;