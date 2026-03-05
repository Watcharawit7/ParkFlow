const express = require("express");
const router = express.Router();

const parkingslotController = require("../controller/parkingslot.controller");

router.post("/", parkingslotController.createParkingSlot);
router.get("/", parkingslotController.getParkingSlotAll);
router.get("/:id", parkingslotController.getParkingSlotById);
router.put("/:id", parkingslotController.updateParkingSlot);
router.delete("/:id", parkingslotController.deleteParkingSlot);

module.exports = router;