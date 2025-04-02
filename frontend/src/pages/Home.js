import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import OTPModal from "../components/OTPModal";

const Home = () => {
    const [otpData, setOtpData] = useState(null);

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 2 }}>2FA Wallet Security</Typography>
            <TransactionForm onTrigger2FA={(data) => setOtpData(data)} />
            <OTPModal open={!!otpData} onClose={() => setOtpData(null)} otpData={otpData} />
        </Container>
    );
};

export default Home;

