require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


require("./db");


const User = require("./models/User");
const Booking = require("./models/booking");
const CustomizeTrip = require("./models/customizeTrip");


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});


app.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});

app.post("/custom-trip", async (req, res) => {
  try {
    const trip = new CustomizeTrip(req.body);
    await trip.save();
    res.json({ message: "Customized trip saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Customized trip failed" });
  }
});
module.exports = app;


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

