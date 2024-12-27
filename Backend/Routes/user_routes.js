const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../Controllers/user_controller");
const authMiddleware = require('../Middleware/Auth_middleware')

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("atleast 3 chatacters or long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("must be atleast 6 characters or long"),
  ],
  userController.registerUser
);


router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Invalid Password"),
],userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser)
module.exports = router;


