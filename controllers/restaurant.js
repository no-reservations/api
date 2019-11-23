const Restaurant = require("../models/restaurant.model");

exports.create = async function(req, res) {
    restaurant = new Restaurant({
        name: req.body.name,
        tables: req.body.tables,
        tables_reserved: 0,
        current_reservations: 0,
    });

    try {
        const new_restaurant = await restaurant.save();
        res.status(400).json({
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