const Reservation = require("../models/reservation.model");
const Restaurant = require("../models/restaurant.model");
const sanitize = require("../utils").sanitize;

exports.get_reservations = async function(req, res) {
    const restaurant_name = req.params.restaurant;
    const sanitized_name = sanitize(restaurant_name);

    try {
        const restaurant = await Restaurant
            .findOne({ normal_name: sanitized_name })
            .populate("reservations")
            .exec();

        if(restaurant) {
            reservations = restaurant.reservations;

            message = !reservations.length ? `No reservations have been made yet.`: `Successfully found all reservations.`;
                 
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

exports.create_reservation = async function(req, res) {
    const real_name = req.params.restaurant;
    const sanitized_name = sanitize(real_name);

    try {
        const restaurant = await Restaurant.findOne({ normal_name: sanitized_name });
        console.log(restaurant)
        const new_reservation = await Reservation.create({
            start: req.body.start,
            end: req.body.end,
            restaurant: restaurant._id,
            size: req.body.size,
        });

        restaurant.reservations.push(new_reservation);
        await restaurant.save();

        res.status(201).json({
            message: `Successfully created reservation.`,
            error: null,
            data: new_reservation,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to create reservation.`,
            error: error,
            data: null,
        });
    }
}