
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

const Restaurant = require("../models/restaurant.model");
const Reservation = require("../models/reservation.model");

const test_restaurant = {
    name: "test_restaurant",
    tables: 10,
    location: "Portland, Oregon",
}

const test_reservation = {
    name: "test_reservation",
    start: Date.now(),
    end: Date.now(),
    size: 4,
}

let restaurant_id = null;
let reservation_id = null;

describe("reservation", () => {
    beforeEach(done => {
        // Remove all restaurants from database
        Restaurant.deleteMany({}, (err) => {
            // Remove all reservations from database
            Reservation.deleteMany({}, err => {

                // Create a new restaurant for tests to interact with
                Restaurant.create({
                    ...test_restaurant,
                }, (err, new_restaurant) => {
                    restaurant_id = new_restaurant._id;
                    
                    // Create a new reservation at test_restaurant for tests to interact with
                    Reservation.create({
                        ...test_reservation,
                    }, (err, new_reservation) => {
                        reservation_id = new_reservation._id;
                        done();
                    });
                });
            });
        });
    });

    // Rage quit after running tests
    after(done => {
        process.exit(0);
        done();
    });

    describe("GET restaurant", () => {
        it("it should GET all the reservations for a restaurant", (done) => {
            chai.request(server)
                .get(`/restaurants/${restaurant_id}/reservations`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    ["message", "error", "data"].forEach(prop => {
                        res.body.should.have.property(prop);
                    });

                    res.body.data.should.be.an('array').that.is.not.empty;
                done();
            });
        });
    });

    describe("POST reservation", () => {
        it("it should POST a reservation to a restaurant", (done) => {

            // Create reservation
            chai.request(server)
                .post(`/restaurants/${restaurant_id}/reservations/new`)
                .send(reservation)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    ["message", "error", "data"].forEach(prop => {
                        res.body.should.have.property(prop);
                    });
                    done();
            });
        });
    });

    describe("PUT reservation", () => {
        it("it should PUT to an already created restaurant", done => {
            const updated_reservation = {
                size: 6,
            }
            
            chai.request(server)
                .put(`/restaurants/${restaurant_id}/reservations/${reservation_id}/update`)
                .send(updated_reservation)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    ["message", "error", "data"].forEach(prop => {
                        res.body.should.have.property(prop);
                    });

                    res.body.data.name.should.be(
                        updated_reservation.size,
                    )
                    done();
            });
        });
    });

    describe("DELETE reservation", () => {
        it("it should DELETE a reservation", (done) => {
            chai.request(server)
                .delete(`/restaurants/${restaurant_id}/reservations/${reservation_id}/remove`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    ["message", "error", "data"].forEach(prop => {
                        res.body.should.have.property(prop);
                    });
                    done();
            });
        });
    });
});