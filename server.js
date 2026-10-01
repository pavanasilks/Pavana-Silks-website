const express = require('express');
const path = require('path');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for New Arrivals page
app.get('/new-arrivals', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'new-arrivals.html'));
});

// Route for Returns & Replacements
app.get('/return', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'return.html'));
});

// Route for My Orders
app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

// Route for Bestsellers page
app.get('/bestsellers', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bestsellers.html'));
});

// Route for Traditional page
app.get('/traditional', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'traditional.html'));
});

// Route for Limited page
app.get('/limited', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'limited.html'));
});

// Route for Checkout page
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create an order
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).json({ error: 'Some error occurred' });

    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to verify payment signature
app.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Create the expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment verified successfully
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get Razorpay Key ID
app.get('/get-razorpay-key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// Catch-all route to serve index.html for any other requests (SPA friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
