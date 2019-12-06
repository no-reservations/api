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

    describe("/GET restaurant", () => {
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

    describe("/POST restaurant", () => {
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

    describe("/PUT restaurant", () => {
        it("it should PUT a restaurant", (done) => {
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
})