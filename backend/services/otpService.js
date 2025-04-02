const otpStore = {};

function generateOTP(user) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[user] = otp;
    console.log(`OTP for ${user}: ${otp}`);
    return otp;
}

function verifyOTP(user, otp) {
    return otpStore[user] === otp;
}

// **Send OTP when 2FA is triggered**
function trigger2FA(user, tx, reason, res) {
    const otp = generateOTP(user);
    return res.json({
        status: "2FA required",
        message: reason,
        otp, // ⚠️ Remove this in production (send via SMS/email instead)
    });
}

module.exports = { generateOTP, verifyOTP, trigger2FA };
