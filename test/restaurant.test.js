process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Restaurant = require("../models/restaurant.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("restaurant", () => {
    beforeEach(done => {
        Restaurant.remove({}, (err) => { 
           done();
        });        
    });

    // Quit after running tests
    after(done => {
        process.exit(0);
    });

    describe("GET restaurant", () => {
        it("it should GET all the restaurants", (done) => {
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

    describe("POST restaurant", () => {
        it("it should POST a restaurant", (done) => {
            const restaurant = {
                name: "test_restaurant",
                normal_name: "test-restaurant",
                tables: 10,
                location: "Portland, Oregon",
            }
            chai.request(server)
                .post("/restaurants/new")
                .send(restaurant)
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

    // TODO: Create restaurant before PUTing to that restaurant
    describe("PUT restaurant", () => {
        let restaurant_id = null;
        it("it should POST a new restaurant for PUT", done => {
            const restaurant = {
                name: "test_restaurant",
                normal_name: "test-restaurant",
                tables: 10,
                location: "Portland, Oregon",
            }
            // Create new restaurant
            chai.request(server)
                .post("/restaurants/new")
                .send(restaurant)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");
                    restaurant_id = res.body._id;
                    done();
            });
        });
        it("it should PUT to an already created restaurant", done => {
            const updated_restuarant = {
                // Should not be "test_restaurant"
                name: "restaurant_test"
            }
            console.log(
                `/restaurants/${restaurant_id}/update`
            );
            
            chai.request(server)
                .put(`/restaurants/${restaurant_id}/update`)
                .send(updated_restuarant)
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
                        updated_restuarant.name
                    )
                    done();
            });
        });
    });

    // TODO: Create restaurant before DELETEing to that restaurant
    describe("DELETE restaurant", () => {
        let restaurant_id = null;
        it("it should POST a new restaurant for DELETE", done => {
            const restaurant = {
                name: "test_restaurant",
                normal_name: "test-restaurant",
                tables: 10,
                location: "Portland, Oregon",
            }
            // Create new restaurant
            chai.request(server)
                .post("/restaurants/new")
                .send(restaurant)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    res.body.should.have.property("error");
                    res.body.should.have.property("data");
                    console.dir(
                        res.body._id
                    )
                    restaurant_id = res.body._id;
                    done();
            });
        });
        it("it should DELETE a restaurant", (done) => {
            const restaurant = {
                name: "test_restaurant",
                normal_name: "test-restaurant",
                tables: 10,
                location: "Portland, Oregon",
            }
            chai.request(server)
                .delete(`/restaurants/${restaurant_id}/remove`)
                .send(restaurant)
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