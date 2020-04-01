const app = require("../../index");
const request = require("supertest");
const should = require("should");
const models = require("../../models");

describe("POST /sign_in", () => {
  const users = [
    { email: "oyg0420@gmail.com", password: "OOOooo123!@#" },
    { email: "oyg@gmail.com", password: "123123123123" },
    { email: "0420@gmail.com", password: "OOOooo123!@#" }
  ];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    it("success: true, user: { id, email }, token, message: 'Success login'", done => {
      request(app)
        .post("/sign_in")
        .send({ email: "oyg0420@gmail.com", password: "OOOooo123!@#" })
        .end((err, res) => {
          res.body.success.should.be.true();
          res.body.should.have.property("token");
          res.body.should.have.property("user").which.is.an.Object();
          res.body.message.should.be.equal("Success login");
          done();
        });
    });
  });

  describe("실패시", () => {
    describe("잘못된 이메일 형식", () => {
      it("400으로 응답", done => {
        request(app)
          .post("/sign_in")
          .send({
            email: "oyg0420",
            password: "OOOooo123!@#"
          })
          .expect(400)
          .end(done);
      });
    });

    describe("잘못된 비밀번호 형식", () => {
      it("401으로 응답", done => {
        request(app)
          .post("/sign_in")
          .send({
            email: "oyg0420@gmail.com",
            password: "123123123"
          })
          .expect(401)
          .end(done);
      });
    });

    describe("가입되지 않은 유저", () => {
      it("410으로 응답", done => {
        request(app)
          .post("/sign_in")
          .send({
            email: "oyg1223@gmail.com",
            password: "OOOooo123!@#"
          })
          .expect(410)
          .end(done);
      });
    });
  });
});

describe("GET /sign_out", () => {
  describe("성공시", () => {
    it(`success: true, message: 'Success logout'`, done => {
      request(app)
        .get("/sign_out")
        .end((err, res) => {
          res.body.success.should.be.true();
          res.body.message.should.be.equal("Success logout");
          done();
        });
    });
  });
});
