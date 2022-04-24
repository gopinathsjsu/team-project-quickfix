var express = require('express');
var router = express.Router();
const hotelController = require("../controllers/hotelController")
// const userController = require("../controllers/userController");
// const {auth} = require('../Utils/passport');
// const { checkAuth } = require("../Utils/passport");

// auth();
router.get("/", function (res, res) {
    res.send("Hello from Indeed backend!");
});

router.get("/getHotelById", hotelController.getHotelById);
module.exports = router;