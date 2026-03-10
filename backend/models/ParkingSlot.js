const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  zoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingZone",
    required: true,
  },
  slotNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["AVAILABLE", "OCCUPIED"],
    default: "AVAILABLE",
  },
  currentParkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
  },
});

const ParkingSlot = mongoose.model("ParkingSlot", schema);

module.exports = ParkingSlot;