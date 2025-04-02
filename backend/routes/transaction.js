const express = require("express");
const router = express.Router();
const { shouldTrigger2FA } = require("../services/transactionService");
const { trigger2FA } = require("../services/otpService");

router.post("/", (req, res) => {
    const { sender, recipient, amount, timestamp } = req.body;
    if (!sender || !recipient || !amount || !timestamp) {
        return res.status(400).json({ error: "Missing transaction details" });
    }

    // **Check if 2FA is needed**
    const reason = shouldTrigger2FA(sender, recipient, amount, timestamp);
    if (reason) {
        return trigger2FA(sender, req.body, reason, res);
    }

    res.json({ status: "Transaction approved" });
});

module.exports = router;
