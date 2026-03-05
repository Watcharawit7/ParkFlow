const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  zoneName: {
    type: String,
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ParkingZone = mongoose.model("ParkingZone", schema);

module.exports = ParkingZone;