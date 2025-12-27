require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.get("/", (req, res) => {
      res.send("Backend is running");
    });

    const User = require("./models/User");
    const Booking = require("./models/booking");
    const CustomizeTrip = require("./models/customizeTrip");

    app.post("/signup", async (req, res) => {
      try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        await new User({ username, email, password }).save();
        res.json({ message: "Signup successful" });
      } catch {
        res.status(500).json({ message: "Signup failed" });
      }
    });

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.json({ message: "Invalid email or password" });
      }
      res.json({ message: "Login successful" });
    });

    app.post("/book", async (req, res) => {
      await new Booking(req.body).save();
      res.json({ message: "Booking saved successfully" });
    });

    app.post("/custom-trip", async (req, res) => {
      await new CustomizeTrip(req.body).save();
      res.json({ message: "Customized trip saved successfully" });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
