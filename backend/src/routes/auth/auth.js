const express = require("express");
const path = require("path");
require('dotenv').config();

const router = express.Router();
const db = require('../../config/db.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


router.post("/register", (req, res) => {
    const { firstname, name, email, password } = req.body;

    if (!firstname || !name || !email || !password) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ msg: "Internal server error" });

        if (result.length > 0) {
            return res.status(409).json({ msg: "Account already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        db.query(
            "INSERT INTO user (firstname, name, email, password) VALUES (?, ?, ?, ?)",
            [firstname, name, email, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json({ msg: "Internal server error" });

                const token = jwt.sign(
                    { id: result.insertId, email },
                    process.env.SECRET,
                    { expiresIn: "12d" }
                );

                return res.status(201).json({ token });
            }
        );
    });
});


router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
        if (err) {console.error("SQL Error:", err);};

        if (result.length === 0) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        const user = result[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: "12d" }
        );

        return res.status(200).json({ token });
    });
});

module.exports = router;
