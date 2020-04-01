const models = require("../../models");
const jwt = require("jsonwebtoken");

const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

const signIn = (req, res) => {
  const { email, password } = req.body;
  const secrete = req.app.get("jwt-secrete");

  const check = user => {
    if (!user) {
      throw new Error("not found user");
    }

    const jsonWebTokenSign = new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id, email: user.email },
        secrete,
        {
          expiresIn: "7d",
          issuer: "pandaman",
          subject: "userInfo"
        },
        (error, token) => {
          if (error) {
            reject(error);
          }
          resolve({ token, user });
        }
      );
    });
    return jsonWebTokenSign;
  };

  if (!email.match(EMAIL_REGEX)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email"
    });
  }

  if (!password.match(PASSWORD_REGEX)) {
    return res.status(401).json({
      success: false,
      message: "Invalid password"
    });
  }

  models.User.findOne({ where: { email, password } })
    .then(check)
    .then(data => {
      return res.json({
        success: true,
        message: "Success login",
        user: { id: data.user.id, email: data.user.email },
        token: data.token
      });
    })
    .catch(err => {
      return res.status(410).json({
        success: false,
        message: err.meesage
      });
    });
};

const signOut = (req, res) => {
  return res.json({
    success: true,
    message: "Success logout"
  });
};

const signUp = (req, res) => {};

const showUserInfo = (req, res) => {};

const updateUserInfo = (req, res) => {};

module.exports = {
  signIn,
  signOut,
  signUp,
  showUserInfo,
  updateUserInfo
};
