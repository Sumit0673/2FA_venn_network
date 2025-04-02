import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";
import { verifyOTP } from "../services/api";

const OTPModal = ({ open, onClose, otpData }) => {
    const [otp, setOtp] = useState("");

    const handleVerify = async () => {
        try {
            const response = await verifyOTP({ user: otpData.sender, otp });
            if (response.data.status === "OTP verified") {
                alert("Transaction Approved!");
                onClose();
            } else {
                alert("Incorrect OTP");
            }
        } catch (error) {
            console.error("OTP Verification Failed:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogContent>
                <TextField
                    label="OTP"
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleVerify} variant="contained" color="primary">Verify</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OTPModal;

