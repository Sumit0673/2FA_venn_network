const express = require("express");
const app = express();
const PORT = 3000;
const { shouldTrigger2FA } = require("./services/transactionService");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

app.use(express.json());

let pendingTransactions = {};
let otpStore = {};

// Send OTP via email (replace with real email credentials)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sumit.gupta.srpg2211@gmail.com",
        pass: "MasSRPG@sumit.gupta.srpg2211@22",
    },
});

app.post("/check-transaction", (req, res) => {
    const { amount, sender, recipient, timestamp } = req.body;

    const triggerMessage = shouldTrigger2FA(sender, recipient, amount, timestamp);
    if (triggerMessage) {
        
        const otp = crypto.randomInt(100000, 999999).toString();
        otpStore[sender] = otp;
        pendingTransactions[sender] = { amount, recipient };

        transporter.sendMail({
            from: "sumit.gupta.srpg2211@gmail.com",
            to: "gsumitg673@gmail.com",
            subject: "Your OTP for 2FA Transaction",
            text: `Your OTP is: ${otp}`,
        });

        return res.json({ message: "2FA required. OTP sent to email." });
    }
    return res.json({ message: "Transaction approved, no 2FA needed." });
});

// OTP verification route
app.post("/verify-otp", (req, res) => {
    const { sender, otp } = req.body;

    if (otpStore[sender] && otpStore[sender] === otp) {
        delete otpStore[sender];
        res.json({ success: true, transaction: pendingTransactions[sender] });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
