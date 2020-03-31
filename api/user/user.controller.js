const users = [
  { email: "oyg0420@gmail.com", password: "OOOooo123!@#" },
  { email: "oyg0421@gmail.com", password: "123123123" },
  { email: "oyg0000@gmail.com", password: "123123123" }
];

const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

const signIn = (req, res) => {
  const { email, password } = req.body;

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

  const registerdUser = users.filter(user => {
    return user.email === email && user.password === password;
  });

  if (registerdUser.length > 0) {
    return res.json({
      success: true,
      message: "Success SignIn",
      user: registerdUser
    });
  }

  return res.status(410).json({
    success: false,
    message: "User not found"
  });
};

const signOut = (req, res) => {};

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
