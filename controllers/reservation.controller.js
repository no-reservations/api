"use strict";

const Reservation = require("../models/reservation.model");
const Restaurant = require("../models/restaurant.model");
const sanitize = require("../utils").sanitize;

exports.get_reservations = async function(req, res) {
    const restaurant_id = req.params.restaurant_id;

    try {
        const restaurant = await Restaurant
            .findById({ _id: restaurant_id })
            .populate("reservations")
            .exec();

        if(restaurant) {
            const reservations = restaurant.reservations;
            const message = !reservations.length ? `No reservations have been made yet.`: `Successfully found all reservations.`;
                 
            res.status(200).json({
                message: message,
                error: null,
                data: reservations,
            });
        } else {
            res.status(404).json({
                message: `Could not find restaurant with id '${restaurant_id}'.`,
                error: null,
                data: null,
            });
        }

    } catch (error) {
        res.status(500).json({
            message: `Failed to get reservations for restaurant with id '${restaurant_id}'.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.get_reservation = async function(req, res) {
    const reservation_id = req.params.reservation_id;

    try {
        const reservation = await Reservation.findById(reservation_id);

        if(reservation) {
            res.status(200).json({
                message: `Successfully found reservation with id '${reservation_id}'`,
                error: null,
                data: reservation,
            });
        } else {
            res.status(404).json({
                message: `No reservation with id '${reservation_id}'.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to find reservation with id '${reservation_id}'.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.create_reservation = async function(req, res) {
    const restaurant_id = req.params.restaurant_id;

    try {
        const restaurant = await Restaurant.findById({ _id: restaurant_id });

        const new_reservation = await Reservation.create({
            name: req.body.name,
            start: req.body.start,
            end: req.body.end,
            restaurant: restaurant_id, //restaurant._id,
            party_size: req.body.party_size,
        });

        restaurant.reservations.push(new_reservation);
        restaurant.tables_reserved += 1;
        await restaurant.save();

        res.status(201).json({
            message: `Successfully created reservation.`,
            error: null,
            data: new_reservation,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to create reservation.`,
            error: error.toString(),
            data: null,
        });
    }
}

exports.update_reservation = async function(req, res) {
    const restaurant_id = req.params.restaurant_id;
    const reservation_id = req.params.reservation_id;

    try {
        const restaurant = await Restaurant.findById(restaurant_id);

        const updated_reservation = await Reservation.findByIdAndUpdate(reservation_id, 
            {
                ...req.body,
                updated_on: Date.now(),
            },
            {
                // Return the new document
                new: true,
                // Run the schema validators upon update; i.e. ensures values within min/max, required field isn't deleted
                runValidators: true,
            }
        )

        if(updated_reservation) {
            res.status(200).json({
                message: `Successfully updated reservation for ${restaurant.name}.`,
                error: null,
                data: updated_reservation,
            });
        } else {
            res.status(404).json({
                message: `No reservation found with id '${reservation_id}'.`,
                error: null,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to update reservation with id '${reservation_id}'.`,
            error: error.toString(),
            data: null,
        });
    }
}