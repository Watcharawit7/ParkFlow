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
  totalDays: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["PARKING", "FINISHED"],
    default: "PARKING",
  },
});

const Parking = mongoose.model("Parking", schema);

module.exports = Parking;