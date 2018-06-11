"use strict";

const expect = require('expect');

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/server");

chai.use(chaiHttp);

describe("Campground", function () {
  it("should list all Campgrounds", function (done) {
     chai
       .request(server)
       .get("/api/campgrounds")
       .then( (res) => {
         expect(res.status).toBe(200);
          done();
       })
       .catch(function(err) {
         throw err;
       })
  });

   it("should post and delete campgrounds successfully", function (done) {
      const campground = {
        name: "mochaTestCammpground",
        location: {
          lat: 0,
          lng: 0
        }
      };
      const token = "BSnnAXe6qQFr3NeHJty2nTDyJZVumfTj4A6UEuK0sx3pKHesM3FRjkji85BCQgfH";

      chai
        .request(server)
        .post("/api/campgrounds?access_token=" + token)
        .send(campground)
        .end(function (err, res) {
          expect(res.status).toBe(200);

          chai
            .request(server)
            .get(
              "/api/campgrounds?filter[where][name][like]=" +
              campground.name +
              "&access_token=" +
              token
            )
            .end(function (err, res) {
              expect(res.status).toBe(200);
              expect(res.body.length).toBe(1);
              chai
                .request(server)
                .delete(
                  "/api/campgrounds/" +
                  res.body[0].id +
                  "?access_token=" +
                  token
                )
                .end(function (err, res) {
                  expect(res.status).toBe(200)
                  done();
                });
            });
        });
   });

   it("should not accept a name longer than 100 characters", (done) => {
      const campground = {
        name:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        location: {
          lat: 0,
          lng: 0
        }
      };
      const token = "BSnnAXe6qQFr3NeHJty2nTDyJZVumfTj4A6UEuK0sx3pKHesM3FRjkji85BCQgfH";
      chai
        .request(server)
        .post("/api/campgrounds?access_token=" + token)
        .send(campground)
        .end(function (err, res) {
          const message = JSON.parse(res.error.text).error.details.messages.name[0];
          expect(message).toBe('Name is too long');
          done();
        });
   });
 });
