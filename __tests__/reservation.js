"use strict";

const expect = require('expect');

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/server");

const reservationController = require("../server/models/reservation");

chai.use(chaiHttp);

describe("Reservations", () => {
    fit("should not post a reservation and send email", (done) => {
        chai.request(server).post("/api/customers/login").send({"username":"user4", "password": "user4"}).then( res => {
            expect(res.status).toBe(200);
            const token = res.body.id;
            console.log("TOKEN: " + token)
            chai.request(server).get("/api/campgrounds").then(res => {
                expect(res.status).toBe(200);
                const campgroundId = res.body[0] ? res.body[0].id:null
                const reservation = {
                    "startDate": "3018-08-28T19:43:37.257Z",
                    "endDate": "3018-08-29T19:43:37.257Z",
                    "campgroundId": campgroundId,
                    "customerId": res.body.userId
                }
                

                chai.request(server).post(`/api/campgrounds/${campgroundId}/reservations`).send(reservation).set("access_token", token).then( res => {
                    expect(res.ok).toBe(true);
                    const reservationId = res.body.id;
                    console.log(reservationId);
                    chai.request(server).delete(`/api/campgrounds/${campgroundId}/reservations/${reservationId}`).set("access_token", token).then(res => {
                        expect(res.ok).toBe(true);
                        chai.request(server).delete(`/api/campgrounds/${campgroundId}/reservations/${reservationId}`).set("access_token", token).then( res => {
                            expect(res.ok).not.toBe(true);
                            done();
                        })
                    })
                })
            })
        })
    })
})