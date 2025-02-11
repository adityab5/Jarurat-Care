import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/config.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
