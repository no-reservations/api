const Restaurant = require("../models/restaurant.model");
const normalize_name = require("../utils").normalize_name;

exports.view = async function(req, res) {
    try {
        let restaurant = null;
        const restaurant_name = normalize_name(req.params.restaurant);

        if(restaurant_name === "all") {
            restaurant = await Restaurant.find();
        } else {
            restaurant = await Restaurant.findOne({ normal_name: restaurant_name });
        }
        
        if(restaurant) {
            res.status(200).json({
                message: `Successfully found ${req.params.restaurant}.`,
                error: null,
                data: restaurant,
            });
        } else {
            res.status(404).json({
                message: `Failed to find ${req.body.name}.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: `Failed to get ${req.body.name}.`,
            error: error,
            data: null,
        });
    }
}

exports.create = async function(req, res) {

    try {
        const normal_name = normalize_name(req.body.name);
        const new_restaurant = await Restaurant.create({
            name: req.body.name,
            normal_name: normal_name,
            tables: req.body.tables,
            tables_reserved: 0,
            current_reservations: 0,
        });
        
        // 201 - Created
        res.status(201).json({
            message: `Successfully created ${req.body.name} as a restaurant.`,
            error: null,
            data: new_restaurant,
        });
    } catch (error) {
        res.status(400).json({
            message: `Failed to create ${req.body.name} as a restaurant.`,
            error: error,
            data: null,
        });
    }
}

exports.delete_one = async function(req, res) {
    const normal_name = normalize_name(req.body.name);

    try {
        // const deleted_restaurant = await Restaurant.findOneAndDelete({ normal_name: normal_name });
        const deleted_restaurant = await Restaurant.findOneAndDelete({ name: "Avanti" });
        console.log(deleted_restaurant)
        if(deleted_restaurant) {
            res.status(200).json({
                message: `Successfully deleted ${req.body.name}.`,
                error: null,
                data: deleted_restaurant,
            });
        } else {
            res.status(404).json({
                message: `Couldn't find ${req.body.name} to delete.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: `Failed to delete ${req.body.name}.`,
            error: error,
            data: null,
        });
    }
}