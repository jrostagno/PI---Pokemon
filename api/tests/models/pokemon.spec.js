const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });

  describe("Stats", () => {
    it("Should throw an error if hp is not a number", (done) => {
      Pokemon.create({ name: "Pikachu", hp: "asd" })
        .then(() => done(new Error("Hp is not a Number")))
        .catch(() => done());
    });

    it("Should throw an error if Strenght is not a number", (done) => {
      Pokemon.create({ name: "Pikachu", strength: "asd" })
        .then(() => done(new Error("strength is not a Number")))
        .catch(() => done());
    });

    it("Should throw an error if defense is not a number", (done) => {
      Pokemon.create({ name: "Pikachu", defense: "asd" })
        .then(() => done(new Error("defense is not a Number")))
        .catch(() => done());
    });

    it("Should throw an error if speed is not a number", (done) => {
      Pokemon.create({ name: "Pikachu", speed: "asd" })
        .then(() => done(new Error("speed is not a Number")))
        .catch(() => done());
    });

    it("Should throw an error if height is not a number", (done) => {
      Pokemon.create({ name: "Pikachu", height: "asd" })
        .then(() => done(new Error("height is not a Number")))
        .catch(() => done());
    });

    it("Should throw an error if weigth is not a number", (done) => {
      Pokemon.create({ name: "Pikachu", weight: "asd" })
        .then(() => done(new Error("weigth is not a Number")))
        .catch(() => done());
    });
  });
});
