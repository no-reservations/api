const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const SALT_ROUNDS = 10;

exports.create_user = async function(req, res) {
    try {

        const password_hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        console.log(
            password_hash,
        )

        const new_user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password_hash,
            phone_number: req.body.phone_number,
        });

        res.status(201).json({
            message: "Successfully created user",
            error: null,
            data: new_user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.toString(),
            data: null,
        });
    }
}