const express = require("express");
const router = express.Router();
const middleware = require("../../middlewares/auth");
const controller = require("./user.controller");

const { signIn, signOut, signUp, showUserInfo, updateUserInfo } = controller;

router.post("/sign_in", signIn);
router.get("/sign_out", signOut);
router.post("/sign_up", signUp);
router.get("/user_info", showUserInfo);
router.put("/user_info", updateUserInfo);

module.exports = router;
