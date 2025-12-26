const mongoose = require("mongoose");

const customizeTripSchema = new mongoose.Schema({
  destination: String,
  tripDays: Number,
  groupSize: Number,
  tripType: String,

  fullName: String,
  cnic: String,
  totalPersons: Number,

  totalBudget: Number,
  mealsRequired: String,
  tourGuide: String,

  paymentMethod: String,
  phone: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("customizeTrip", customizeTripSchema);


