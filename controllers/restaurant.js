const Restaurant = require("../models/restaurant.model");
const Reservation = require("../models/reservation.model");
const sanitize = require("../utils").sanitize;

exports.view = async function(req, res) {
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

exports.get_reservations = async function(req, res) {
    const restaurant_name = req.params.restaurant;
    const sanitized_name = sanitize(restaurant_name);

    try {
        restaurant = await Restaurant.findOne({ normal_name: sanitized_name });

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
    const real_name = req.body.name;
    const sanitized_name = sanitize(real_name);

    try {

        const new_restaurant = await Restaurant.create({
            name: real_name,
            normal_name: sanitized_name,
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

exports.create_reservation = async function(req, res) {
    const real_name = req.params.restaurant;
    const sanitized_name = sanitize(real_name);

    try {
        restaurant = await Restaurant.find({ normal_name: sanitized_name });

        const new_reservation = await Reservation.create({
            start: req.body.start,
            end: req.body.end,
            restaurant: restaurant,
            size: req.body.size,
        });

        res.status(201).json({
            message: `Successfully created reservation.`,
            error: null,
            data: new_reservation,
        })
    } catch (error) {
        res.status(500).json({
            message: `Failed to create reservation.`,
            error: error,
            data: null,
        })
    }

}

exports.delete_one = async function(req, res) {
    // Get name from url param
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