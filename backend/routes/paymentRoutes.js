import express from "express";
import crypto from "crypto";

const router = express.Router();

// Qfix Payment Configuration
const QFIX_MERCHANT_ID = process.env.QFIX_MERCHANT_ID || "your_merchant_id";
const QFIX_SECRET_KEY = process.env.QFIX_SECRET_KEY || "your_secret_key";
const QFIX_PAYMENT_URL = process.env.QFIX_PAYMENT_URL || "https://payment.qfix.com/pay";

// Create payment order
router.post("/create-payment-order", (req, res) => {
  const { amount, currency, registrationData } = req.body;

  try {
    // Generate unique order ID
    const orderId = `2AI-ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Create payment payload
    const paymentData = {
      merchantId: QFIX_MERCHANT_ID,
      orderId: orderId,
      amount: amount,
      currency: currency || "INR",
      customerName: registrationData.fullName,
      customerEmail: registrationData.email,
      customerPhone: registrationData.contactNumber,
      returnUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-callback`,
      callbackUrl: `${process.env.BACKEND_URL || "http://localhost:5000"}/api/payment-callback`,
    };

    // Generate signature (checksum) for Qfix
    const signatureString = `${paymentData.merchantId}|${paymentData.orderId}|${paymentData.amount}|${paymentData.currency}|${QFIX_SECRET_KEY}`;
    const signature = crypto.createHash("sha256").update(signatureString).digest("hex");

    paymentData.signature = signature;

    res.json({
      success: true,
      orderId: orderId,
      paymentUrl: QFIX_PAYMENT_URL,
      paymentData: paymentData,
    });
  } catch (error) {
    console.error("Payment order creation error:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
});

// Payment callback handler
router.post("/payment-callback", (req, res) => {
  const { orderId, status, transactionId, signature } = req.body;

  try {
    // Verify signature
    const signatureString = `${orderId}|${status}|${transactionId}|${QFIX_SECRET_KEY}`;
    const expectedSignature = crypto.createHash("sha256").update(signatureString).digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Payment verification successful
    res.json({
      success: true,
      orderId: orderId,
      status: status,
      transactionId: transactionId,
    });
  } catch (error) {
    console.error("Payment callback error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

// Verify payment status
router.post("/verify-payment", (req, res) => {
  const { orderId, transactionId, signature } = req.body;

  try {
    // Verify signature
    const signatureString = `${orderId}|${transactionId}|${QFIX_SECRET_KEY}`;
    const expectedSignature = crypto.createHash("sha256").update(signatureString).digest("hex");

    if (signature === expectedSignature) {
      res.json({ success: true, verified: true });
    } else {
      res.json({ success: false, verified: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

export default router;
