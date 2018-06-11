"use strict";

const expect = require('expect');

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/server");

const reservationController = require("../server/models/reservation");

chai.use(chaiHttp);

describe("Reservations", () => {
    fit("should not post a reservation and send email", (done) => {
        chai.request(server).post("/api/customers/login").send({"username":"user1", "password": "user1"}).then( res => {
            const token = res.body.id;
            console.log("TOKEN: " + token)
            const reservation = {
                "startDate": "3018-06-11T18:27:21.473Z",
                "endDate": "3018-06-12T18:27:21.473Z",
                "campgroundId": "5b1971c9da73af3958a54ea7",
                "customerId": res.userId
              } 

              chai.request(server).post("/api/reservations").send(reservation).set("access_token", token).then( res => {
                expect(res.status).toBe(500);
                done();
            })
        })
    })
})