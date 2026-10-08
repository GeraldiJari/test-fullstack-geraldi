const express = require("express");

const authController = require("../controllers/auth.controller");
const {
    registerValidator,
    loginValidator,
} = require("../validators/auth.validator");
const validate = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
    "/register",
    registerValidator,
    validate,
    authController.register
);

router.post(
    "/login",
    loginValidator,
    validate,
    authController.login
);

module.exports = router;