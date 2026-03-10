const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  credits:{
    type: Number,
    default: 0,
  },
  customerType: {
    type: String,
    enum: ["GENERAL", "MEMBER"],
    default: "GENERAL",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customer", schema);

module.exports = Customer;
