"use strict";

var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server/server");
var should = chai.should();

chai.use(chaiHttp);

describe("Campground", function() {
  it("should list all Campgrounds", function(done) {
    chai
      .request(server)
      .get("/api/campgrounds")
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.length.should.not.equal(0);
        done();
      });
  });

  it("should post and delete campgrounds successfully", function(done) {
    const campground = {
      name: "mochaTestCammpground",
      location: {
        lat: 0,
        lng: 0
      }
    };

    chai
      .request(server)
      .post("/api/customers/login")
      .send({ username: "andy", password: "andy" })
      .end(function(err, res) {
        const token = res.body.id;
        chai
          .request(server)
          .post("/api/campgrounds?access_token=" + token)
          .send(campground)
          .end(function(err, res) {
            res.should.have.status(200);

            chai
              .request(server)
              .get(
                "/api/campgrounds?filter[where][name][like]=" +
                  campground.name +
                  "&access_token=" +
                  token
              )
              .end(function(err, res) {
                res.should.have.status(200);
                res.body.length.should.equal(1);
                chai
                  .request(server)
                  .delete(
                    "/api/campgrounds/" +
                      res.body[0].id +
                      "?access_token=" +
                      token
                  )
                  .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                  });
              });
          });
      });
  });
});
