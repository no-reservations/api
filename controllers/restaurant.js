const Restaurant = require("../models/restaurant.model");
const Reservation = require("../models/reservation.model");
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

exports.get_reservations = async function(req, res) {
    const restaurant_name = req.params.restaurant;
    const normal_name = normalize_name(restaurant_name);

    try {
        restaurant = await Restaurant.findOne({ normal_name: normal_name });

        if(restaurant) {
            reservations = restaurant.reservations;
            if(!reservations.length) 
                message = `No reservations have been made yet.`;
            res.status(200).json({
                message: message,
                error: null,
                data: reservations,
            });
        } else {
            res.status(404).json({
                message: `No restaurant named '${restaurant_name}'.`,
                error: null,
                data: null,
            });
        }

    } catch (error) {
        res.status(500).json({
            message: `Failed to get reservations for '${restaurant_name}'.`,
            error: error,
            data: null,
        });
    }

}

exports.create = async function(req, res) {

    try {
        const real_name = req.body.name;
        const normal_name = normalize_name(real_name);

        const new_restaurant = await Restaurant.create({
            name: real_name,
            normal_name: normal_name,
            tables: req.body.tables,
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

exports.delete_one = async function(req, res) {
// Get name from url param
    const restaurant_name = req.params.restaurant;
    const normal_name = normalize_name(restaurant_name);

    try {
        const deleted_restaurant = await Restaurant.findOneAndDelete({ normal_name: normal_name });
        console.log(deleted_restaurant)
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