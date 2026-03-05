const express = require("express");
const router = express.Router();

const parkingController = require("../controller/parking.controller");

router.post("/", parkingController.createParking);
router.get("/", parkingController.getParkingAll);
router.get("/:id", parkingController.getParkingById);
router.put("/:id", parkingController.updateParking);
router.delete("/:id", parkingController.deleteParking);

module.exports = router;