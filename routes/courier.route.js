const express = require("express");
const { calculateCharge } = require("../controllers/courier.controller");

const courierRouter = express.Router();

courierRouter.post("/charges", calculateCharge);

module.exports = courierRouter;
