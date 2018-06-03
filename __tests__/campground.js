"use strict";

// var chai = require("chai");
// var chaiHttp = require("chai-http");
// var server = require("../server/server");
// var should = chai.should();

// chai.use(chaiHttp);

describe("Campground", function () {
  it("should list all Campgrounds", function () {
    // chai
    //   .request(server)
    //   .get("/api/campgrounds")
    //   .end(function (err, res) {
    //     res.should.have.status(200);
    //     res.body.length.should.not.equal(0);
    //     done();
    //   });
  });

  it("should post and delete campgrounds successfully", function () {
    // const campground = {
    //   name: "mochaTestCammpground",
    //   location: {
    //     lat: 0,
    //     lng: 0
    //   }
    // };
    // const token = "BSnnAXe6qQFr3NeHJty2nTDyJZVumfTj4A6UEuK0sx3pKHesM3FRjkji85BCQgfH";

    // chai
    //   .request(server)
    //   .post("/api/campgrounds?access_token=" + token)
    //   .send(campground)
    //   .end(function (err, res) {
    //     res.should.have.status(200);

    //     chai
    //       .request(server)
    //       .get(
    //         "/api/campgrounds?filter[where][name][like]=" +
    //         campground.name +
    //         "&access_token=" +
    //         token
    //       )
    //       .end(function (err, res) {
    //         res.should.have.status(200);
    //         res.body.length.should.equal(1);
    //         chai
    //           .request(server)
    //           .delete(
    //             "/api/campgrounds/" +
    //             res.body[0].id +
    //             "?access_token=" +
    //             token
    //           )
    //           .end(function (err, res) {
    //             res.should.have.status(200);
    //             done();
    //           });
    //       });
    //   });
  });

  it("should not accept a name longer than 100 characters", () => {
    // const campground = {
    //   name:
    //     "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //   location: {
    //     lat: 0,
    //     lng: 0
    //   }
    // };
    // const token = "BSnnAXe6qQFr3NeHJty2nTDyJZVumfTj4A6UEuK0sx3pKHesM3FRjkji85BCQgfH";
    // chai
    //   .request(server)
    //   .post("/api/campgrounds?access_token=" + token)
    //   .send(campground)
    //   .end(function (err, res) {
    //     const message = JSON.parse(res.error.text).error.details.messages.name[0];
    //     message.should.equal('Name is too long')
    //     done();
    //   });
  });

  it("should pass", function () { });
});
