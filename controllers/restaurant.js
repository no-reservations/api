const Restaurant = require("../models/restaurant.model");
const sanitize = require("../utils").sanitize;

exports.get_restaurant = async function(req, res) {
    const restaurant_name = req.params.restaurant;
    const sanitized_name = sanitize(restaurant_name);

    try {
        const restaurant = await Restaurant.findOne({ normal_name: sanitized_name });
        
        if(restaurant) {
            res.status(200).json({
                message: `Successfully found ${restaurant_name}.`,
                error: null,
                data: restaurant,
            });
        } else {
            res.status(404).json({
                message: `No restaurants have been added yet.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to get ${restaurant_name}.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.get_restaurants = async function(req, res) {

    try {

        const restaurant = await Restaurant.find();
        
        if(restaurant) {
            res.status(200).json({
                message: `Successfully found all restaurants.`,
                error: null,
                data: restaurant,
            });
        } else {
            res.status(404).json({
                message: `No restaurants have been added yet.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to get restaurants.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.create_restaurant = async function(req, res) {
    const real_name = req.body.name;
    const sanitized_name = sanitize(real_name);

    try {

        const new_restaurant = await Restaurant.create({
            name: real_name,
            normal_name: sanitized_name,
            tables: req.body.tables,
            location: req.body.location,
            tables_reserved: 0,
            current_reservations: 0,
        });
        
        // 201 - Created
        res.status(201).json({
            message: `Successfully created '${real_name}'.`,
            error: null,
            data: new_restaurant,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to create '${real_name}'.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.update_restaurant = async function(req, res) {
    const restaurant_id = req.params.restaurant_id;

    try {
        const updated_restaurant = await Restaurant.findOneAndUpdate(restaurant_id, 
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

        if(updated_restaurant) {
            res.status(200).json({
                message: `Successfully updated ${updated_restaurant.name}.`,
                error: null,
                data: updated_restaurant,
            });
        } else {
            res.status(404).json({
                message: `No restaurant found with id '${restaurant_id}'.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to update restaurant with id '${restaurant_id}'.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.delete_restaurant = async function(req, res) {
    const restaurant_name = req.params.restaurant;
    const sanitized_name = sanitize(restaurant_name);

    try {
        const deleted_restaurant = await Restaurant.findOneAndDelete({ normal_name: sanitized_name });

        if(deleted_restaurant) {
            res.status(200).json({
                message: `Successfully deleted '${restaurant_name}'.`,
                error: null,
                data: deleted_restaurant,
            });
        } else {
            res.status(404).json({
                message: `Couldn't find a restaurant named '${restaurant_name}'.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `There was an error trying to delete '${restaurant_name}'.`,
            error: error.toString(),
            data: null,
        });
    }
}