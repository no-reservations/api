const Restaurant = require("../models/restaurant.model");
const sanitize = require("../utils").sanitize;

exports.get_restaurant = async function(req, res) {
    const restaurant_name = req.params.restaurant;
    const sanitized_name = sanitize(restaurant_name);

    try {
        let restaurant = null;

        if(restaurant_name === "all") {
            restaurant = await Restaurant.find();
        } else {
            restaurant = await Restaurant.findOne({ normal_name: sanitized_name });
        }
        
        if(restaurant) {
            message = restaurant_name === "all" && !restaurant.length ? `No restaurants have been added yet.` :
                `Successfully found ${restaurant_name}.`
            res.status(200).json({
                message: message,
                error: null,
                data: restaurant,
            });
        } else {
            res.status(404).json({
                message: `Failed to find a restaurant named '${restaurant_name}'.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to get ${restaurant_name}.`,
            error: error,
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
            error: error,
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
            error: error,
            data: null,
        });
    }
}