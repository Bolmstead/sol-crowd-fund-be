// Import necessary modules
const express = require("express");
const { Connection, clusterApiUrl, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Solana cluster
const connection = new Connection(clusterApiUrl(process.env.ENVIRONMENT));

console.log("🚨🚨🚨 Connecting to:: ", process.env.ENVIRONMENT);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Solana Express App!");
});

// Route to check Solana wallet balance
app.get("/balance/:walletAddress", async (req, res) => {
  const walletAddress = req.params.walletAddress;

  try {
    const publicKey = new PublicKey(walletAddress);
    console.log("🚀 ~ app.get ~ publicKey:", publicKey);
    const balance = await connection.getBalance(publicKey);
    console.log("🚀 ~ app.get ~ balance:", balance, " Lamports");
    console.log("🚀 ~ app.get ~ balance:", balance / 1e9, " SOL");

    res.json({ wallet: walletAddress, balance: balance / 1e9 + " SOL" });
  } catch (error) {
    res.status(400).json({ error: "Invalid wallet address or request failed" });
  }
});

// Another sample route
app.get("/hello", (req, res) => {
  res.send("Hello from Solana Express App!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
