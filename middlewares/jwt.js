"use strict";

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config").JWT_SECRET_KEY;

exports.token = async function verifyToken(req, res, next) {
    let token = req.body.token;
    if(!token) {
        res.status(401).json({
            message: 'No token provided.',
            error: null,
            data: null
        });
    }

    try {
        const token = await jwt.verify(token, JWT_SECRET_KEY);
        // We're clearly not auth'd to be here
        // Should also check to see if token out of date, given by wrong user, etc.,
        if(!token) {
            res.status(400).json({
                message: "Invalid token provided.",
                error: null,
                data: null,
            });
        }
        // Bind token to req object
        req.token = token;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Failed to authenticate with provided token.",
            error: null,
            data: null,
        });
    }
}