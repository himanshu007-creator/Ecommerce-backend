const router = require("express").Router();
const User = require("../Models/userModel")
const express = require("express")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken")


router.post("/register", async(req, res) => {
    const user = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.MNDB_USER).toString(),
        role: req.body.role
    })

    try {
        const saveUser = await user.save();
        console.log("user created")
        res.status(200).json(saveUser);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})


router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("wrong credentials")

        const hashPassword = cryptoJs.AES.decrypt(user.password, process.env.MNDB_USER);
        const Origpassword = hashPassword.toString(CryptoJS.enc.Utf8);

        Origpassword !== req.body.password && res.status(401).json("wrong credentials")

        const accessToken = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_TKN, { expiresIn: "2d" })
        const { password, ...others } = user._doc;

        res.status(200).json({ others, accessToken })


    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router