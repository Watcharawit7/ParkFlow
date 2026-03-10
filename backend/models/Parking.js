const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSlot",
    required: true,
  },
  license_plate: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    default: Date.now,
  },
  checkOut: {
    type: Date,
    default: null,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalCredits: {
    type: Number,
    default: 0,
  },
  totalDays: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["PARKING", "FINISHED"],
    default: "null",
  },
});

const Parking = mongoose.model("Parking", schema);

module.exports = Parking;