require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./db");

const User = require("./models/User");
const Booking = require("./models/booking");
const CustomizeTrip = require("./models/cutomizeTrip");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
});

app.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({ message: "Booking saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
});

app.post("/custom-trip", async (req, res) => {
  try {
    const trip = new CustomizeTrip(req.body);
    await trip.save();

    res.status(201).json({ message: "Customized trip saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Customized trip failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running on Vercel");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
