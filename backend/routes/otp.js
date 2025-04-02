const express = require("express");
const router = express.Router();
const { generateOTP, verifyOTP } = require("../services/otpService");

// Generate OTP
router.post("/generate", (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).json({ error: "User is required" });

  const otp = generateOTP(user);
  res.json({ message: "OTP sent", otp });
});

// Verify OTP
router.post("/verify", (req, res) => {
  const { user, otp } = req.body;
  if (!user || !otp) return res.status(400).json({ error: "Missing data" });

  const isValid = verifyOTP(user, otp);
  if (!isValid) return res.status(401).json({ error: "Invalid OTP" });

  res.json({ status: "OTP verified" });
});

module.exports = router;

