const THRESHOLD_AMOUNT = 0.1; // Set threshold for large transactions
const RECENT_TX_WINDOW = 10000; // 5 minutes (in milliseconds)
const UNUSUAL_HOURS = [0, 15]; // Midnight to 6 AM
const transactionHistory = {}; // Stores transaction data

function shouldTrigger2FA(sender, recipient, amount, timestamp) {
    const txTime = new Date(timestamp).getHours();

    // **Condition 1: Large transaction amount**
    if (amount >= THRESHOLD_AMOUNT) {
        return "Large transaction amount detected.";
    }

    // **Condition 2: First-time recipient**
    if (!transactionHistory[sender]) {
        transactionHistory[sender] = new Set();
    }
    if (!transactionHistory[sender].has(recipient)) {
        transactionHistory[sender].add(recipient);
        return "First-time transaction with recipient.";
    }

    // **Condition 3: Multiple rapid transactions**
    if (!transactionHistory[sender].timestamps) {
        transactionHistory[sender].timestamps = [];
    }
    transactionHistory[sender].timestamps.push(timestamp);
    transactionHistory[sender].timestamps = transactionHistory[sender].timestamps.filter(
        (t) => timestamp - t <= RECENT_TX_WINDOW
    );
    if (transactionHistory[sender].timestamps.length >= 2) {
        return "Multiple rapid transactions detected.";
    }

    // **Condition 4: Unusual transaction hours**
    if (txTime >= UNUSUAL_HOURS[0] && txTime <= UNUSUAL_HOURS[1]) {
        return "Transaction occurring at unusual hours.";
    }

    return null; // No 2FA trigger needed
}

module.exports = { shouldTrigger2FA };

