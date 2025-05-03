const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Add this missing import

// Load environment variables
dotenv.config();

// Import DB connection
const connectDB = require("./config/db");

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: '*' }));
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SGHbw82smqrkO5',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'WdmXPybZUIi2owh08p8gQlLa'
});

// Create order endpoint
app.post('/create-razorpay-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  console.log('Incoming order request:', req.body);
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      payment_capture: 1 // Auto-capture payments
    };

    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      status: order.status,
      key_id: 'rzp_test_SGHbw82smqrkO5',
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to create order' 
    });
  }
});

// Verify payment endpoint
app.post('/verify-razorpay-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Validate required fields
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ 
      status: 'failed', 
      message: 'Missing payment verification data' 
    });
  }

  // Create expected signature
  const generated_signature = crypto
    .createHmac('sha256', razorpay.key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  // Compare signatures
  if (generated_signature === razorpay_signature) {
    res.json({ 
      status: 'success', 
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id
    });
  } else {
    res.status(400).json({ 
      status: 'failed', 
      message: 'Invalid signature' 
    });
  }
});

// Other routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const videoRoutes = require("./routes/videoRoutes");
app.use("/api/videos", videoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Razorpay endpoints:`);
  console.log(`- POST http://localhost:${PORT}/create-razorpay-order`);
  console.log(`- POST http://localhost:${PORT}/verify-razorpay-payment`);
});