const express = require("express");
const router = express.Router();

const parkingZoneController = require("../controller/parkingzone.controller");

router.post("/", parkingZoneController.createParkingZone);
router.get("/", parkingZoneController.getParkingZoneAll);
router.get("/:id", parkingZoneController.getParkingZoneById);
router.put("/:id", parkingZoneController.updateParkingZone);
router.delete("/:id", parkingZoneController.deleteParkingZone);

module.exports = router;