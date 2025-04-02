import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { ethers } from "ethers";

const TransactionForm = () => {
    const [amount, setAmount] = useState("");
    const [sender, setSender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // Step 1: Transaction, Step 2: OTP
    const [responseMessage, setResponseMessage] = useState("");
    const [transactionData, setTransactionData] = useState(null);

    // Handle transaction submission
    const handleTransactionSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch user's MetaMask wallet address
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            setSender(userAddress); // Set sender address dynamically

            
            const response = await axios.post("http://localhost:3000/check-transaction", {
                amount,
                sender: userAddress,
                recipient,
                timestamp: Date.now(),
            });

            if (response.data.message.includes("2FA")) {
                setResponseMessage(response.data.message);
                setTransactionData({ amount, sender: userAddress, recipient });
                setStep(2); 
            } else {
                setResponseMessage("Transaction approved, sending...");
                sendTransaction(amount, recipient, signer);
            }
        } catch (error) {
            console.error("Transaction check failed:", error);
            setResponseMessage("Error verifying transaction.");
        }
    };

    // Handle OTP verification
    const handleOtpSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/verify-otp", {
                sender,
                otp,
            });

            if (response.data.success) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                sendTransaction(transactionData.amount, transactionData.recipient, signer);
            } else {
                setResponseMessage("Invalid OTP. Transaction rejected.");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            setResponseMessage("Error verifying OTP.");
        }
    };

    // Function to send transaction via MetaMask
    const sendTransaction = async (amount, recipient, signer) => {
        try {
            const tx = await signer.sendTransaction({
                to: recipient,
                value: ethers.utils.parseEther(amount.toString()),
            });
            setResponseMessage(`Transaction sent! Hash: ${tx.hash}`);
        } catch (error) {
            console.error("Transaction failed:", error);
            setResponseMessage("Transaction failed.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
            <Typography variant="h4" gutterBottom>2FA Transaction Checker</Typography>

            {step === 1 ? (
                <form onSubmit={handleTransactionSubmit}>
                    <TextField
                        label="Amount (ETH)"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                    />
                    <TextField
                        label="Recipient Address"
                        fullWidth
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Check & Send
                    </Button>
                </form>
            ) : (
                <Box>
                    <Typography variant="body1">Enter the OTP sent to your email:</Typography>
                    <TextField
                        label="OTP"
                        fullWidth
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                    />
                    <Button onClick={handleOtpSubmit} variant="contained" color="secondary" fullWidth>
                        Verify & Send
                    </Button>
                </Box>
            )}

            {responseMessage && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body1" color="error">{responseMessage}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default TransactionForm;
