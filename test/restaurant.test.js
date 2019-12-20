process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Restaurant = require("../models/restaurant.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

const test_restaurant = {
    name: "test_restaurant",
    tables: 10,
    location: "Portland, Oregon",
}

let restaurant_id = null;

describe("restaurant", () => {
    beforeEach(done => {
        Restaurant.remove({}, (err) => {
            Restaurant.create({
                ...test_restaurant,
            }, (err, new_restaurant) => {
                restaurant_id = new_restaurant._id;
                done();
            });
        });
    });

    // Rage quit after running tests
    after(done => {
        process.exit(0);
        done();
    });

    describe("GET restaurant", () => {
        it("it should successfully GET all restaurants", (done) => {
            chai.request(server)
                .get("/restaurants/all")
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

    describe("POST restaurant", () => {
        it("it should successfully POST a restaurant", (done) => {
            const restaurant = {
                name: "test_restaurant_post",
                tables: 20,
                location: "Portland, Oregon",
            }
            chai.request(server)
                .post("/restaurants/new")
                .send(restaurant)
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

    // TODO: Create restaurant before PUTing to that restaurant
    describe("PUT restaurant", () => {
        it("it should successfully PUT to a restaurant", done => {
            const updated_restuarant = {
                // Should not be "test_restaurant"
                name: "restaurant_test"
            };
            
            chai.request(server)
                .put(`/restaurants/${restaurant_id}/update`)
                .send(updated_restuarant)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    ["message", "error", "data"].forEach(prop => {
                        res.body.should.have.property(prop);
                    });

                    res.body.data.name.should.equal(
                        updated_restuarant.name
                    )
                    done();
            });
        });
    });

    describe("DELETE restaurant", () => {
        it("it should successfully DELETE a restaurant", (done) => {
            chai.request(server)
                .delete(`/restaurants/${restaurant_id}/remove`)
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
})