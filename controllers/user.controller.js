const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const SALT_ROUNDS = 10;

exports.get_user = async function(req, res) {
    const user_id = req.params.user_id;

    try {
        const user = await User.findById(user_id);

        if(user) {
            res.status(200).json({
                message: "Successfully found user.",
                error: null,
                data: user,
            });
        } else {
            res.status(404).json({
                message: `No user found with id '${user_id}'.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(404).json({
            message: `Failed to get user with id '${user_id}'.`,
            error: error.toString(),
            data: null,
        });
    }
}

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

exports.update_user = async function(req, res) {
    const user_id = req.params.user_id;

    try {
        const new_user = await User.findByIdAndUpdate(user_id,
            {
                ...req.body,
                updated_at: Date.now(),
            }, 
            {
                // Return the new document
                new: true,
                // Run the schema validators upon update; i.e. ensures values within min/max, required field isn't deleted
                runValidators: true,
            }
        )

        if(new_user) {
            res.status(200).json({
                message: `Successfully updated user.`,
                error: null,
                data: new_user,
            });
        } else {
            res.status(404).json({
                message: `No user found with id '${user_id}'`,
                error: null,
                data: null,
            })
        }
    } catch (error) {
        res.status(404).json({
            message: `Failed to update user with id '${user_id}'.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.delete_user = async function(req, res) {
    const user_id = req.params.user_id;

    try {
        const deleted_user = await User.findByIdAndDelete(user_id);

        if(deleted_user) {
            res.status(200).json({
                message: `Successfully deleted user.`,
                error: null,
                data: deleted_user,
            });
        } else {
            res.status(404).json({
                message: `Couldn't find user with id '${user_id}'`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(404).json({
            message: `Failed to delete user with id '${user_id}'.`,
            error: error.toString(),
            data: null,
        });
    }
}