process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Restaurant = require("../models/restaurant.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("reservation", () => {
    beforeEach(done => {
        Restaurant.remove({}, (err) => { 
           done();
        });        
    });

    // Rage quit after running tests
    after(done => {
        process.exit(0);
    });

    describe("GET restaurant", () => {
        it("it should GET all the reservations for a restaurant", (done) => {
            chai.request(server)
                .get("/restaurants/all")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");
                done();
            });
        });
    });

    describe("POST reservation", () => {
        let restaurant_id = null;
        let reservation_id = null;
        it("it should POST a reservation to a restaurant", (done) => {
            const restaurant = {
                name: "test_restaurant",
                normal_name: "test-restaurant",
                tables: 10,
                location: "Portland, Oregon",
            }

            const reservation = {
                name: "test_reservation",
                start: Date.Now(),
                end: Date.now(),
                size: 4,
            }
            // Create restaurant
            chai.request(server)
                .post("/restaurants/all")
                .send(restaurant)
                .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a("object");
                        res.body.should.have.property("message");
                        res.body.should.have.property("error");
                        res.body.should.have.property("data");
                        restaurant_id = res.body.data[0]._id;
                    done();
            });

            // Create reservation
            chai.request(server)
                .post(`/restaurants/${restaurant_id}/reservations/new`)
                .send(reservation)
                .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a("object");
                        res.body.should.have.property("message");
                        res.body.should.have.property("error");
                        res.body.should.have.property("data");
                    done();
            });
        });
    });

    describe("PUT reservation", () => {
        let restaurant_id = null;
        let reservation_id = null;
        it("it should POST a new restaurant for PUT", done => {
            const restaurant = {
                name: "test_restaurant",
                normal_name: "test-restaurant",
                tables: 10,
                location: "Portland, Oregon",
            }

            const reservation = {
                name: "test_reservation",
                start: Date.Now(),
                end: Date.now(),
                size: 4,
            }

            // Create restaurant
            chai.request(server)
                .post("/restaurants/new")
                .send(restaurant)
                .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a("object");
                        res.body.should.have.property("message");
                        res.body.should.have.property("error");
                        res.body.should.have.property("data");
                        restaurant_id = res.body.data[0]._id;
                    done();
            });

            // Create initial reservation
            chai.request(server)
                .post(`/restaurants/${restaurant_id}/reservations/new`)
                .send(reservation)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");
                    restaurant_id = res.body.restaurant._id;
                    reservation_id = res.body._id;
                    done();
            });
        });
        it("it should PUT to an already created restaurant", done => {
            const updated_reservation = {
                size: 6,
            }
            console.log(
                `/restaurants/${restaurant_id}/reservations/${reservation_id}`
            );
            
            chai.request(server)
                .put(`/restaurants/${restaurant_id}/reservations/${reservation_id}/update`)
                .send(updated_reservation)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");
                    console.dir(
                        res.body._id
                    )
                    res.body.data.name.should.be(
                        updated_reservation.size,
                        6
                    )
                    done();
            });
        });
    });

    describe("DELETE reservation", () => {
        let restaurant_id = null;
        let reservtion_id = null;
        it("it should POST a new restaurant for DELETE", done => {
            const restaurant = {
                name: "test_restaurant",
                normal_name: "test-restaurant",
                tables: 10,
                location: "Portland, Oregon",
            }

            const reservation = {
                name: "test_reservation",
                start: Date.Now(),
                end: Date.now(),
                size: 4,
            }
            // Create restaurant
            chai.request(server)
                .post("/restaurants/new")
                .send(restaurant)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");

                    restaurant_id = res.body.restaurants._id;
                    done();
            });

            // Create reservation
            chai.request(server)
                .post(`/restaurants/${restaurant_id}/reservations/new`)
                .send(reservation)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");
                    restaurant_id = res.body.restaurant._id;
                    reservation_id = res.body._id;
                    done();
            });
        });
        it("it should DELETE a reservation", (done) => {

            chai.request(server)
                .delete(`/restaurants/${restaurant_id}/reservations/${reservation_id}/remove`)
                // .send(restaurant)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");
                    done();
            });
        });
    });
})