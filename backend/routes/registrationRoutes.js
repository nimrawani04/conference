import express from "express";
import multer from "multer";
import QRCode from "qrcode";
import db from "../db.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("paymentProof"), async (req, res) => {
  const file = req.file;

  const {
    fullName,
    affiliation,
    designation,
    country,
    email,
    contactNumber,
    participantType,
    paperId,
    paperTitle,
    numAuthors,
    subCategory,
    region,
    attendWorkshop,
    totalFeeUsd,
    totalFeeInr,
    modeOfPayment,
    transactionId,
    dateOfPayment,
    declaration,
    paymentVerified, // This will be true after payment gateway success
  } = req.body;

  const paymentProofPath = file ? file.path : null;

  // Generate unique registration ID
  const registrationId = `2AI-2026-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  // Generate QR code
  let qrCodeData = null;
  try {
    const qrData = JSON.stringify({
      registrationId,
      name: fullName,
      email,
      type: participantType,
      conference: "2AI-2026",
      timestamp: new Date().toISOString(),
    });
    
    qrCodeData = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: "#111111",
        light: "#f4efe4",
      },
    });
  } catch (qrErr) {
    console.error("QR Code generation error:", qrErr);
  }

  const query = `
    INSERT INTO registrations (
      registration_id, full_name, affiliation, designation, country, email, contact_number, 
      participant_type, paper_id, paper_title, num_authors, sub_category, 
      region, attend_workshop, total_fee_usd, total_fee_inr, mode_of_payment, 
      transaction_id, date_of_payment, payment_proof_path, declaration, qr_code, payment_verified
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const parseNumOrNull = (val) => val === '' || val === undefined ? null : Number(val);

  const values = [
    registrationId,
    fullName,
    affiliation,
    designation,
    country,
    email,
    contactNumber,
    participantType,
    paperId || null,
    paperTitle || null,
    parseNumOrNull(numAuthors),
    subCategory,
    region,
    attendWorkshop,
    parseNumOrNull(totalFeeUsd),
    parseNumOrNull(totalFeeInr),
    modeOfPayment,
    transactionId,
    dateOfPayment || null,
    paymentProofPath,
    declaration === "true" || declaration === true ? 1 : 0,
    qrCodeData,
    paymentVerified === "true" || paymentVerified === true ? 1 : 0
  ];

  db.query(query, values, async (err, results) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    // Prepare registration data for email
    const registrationData = {
      registrationId,
      fullName,
      email,
      affiliation,
      designation,
      participantType,
      paperId,
      paperTitle,
      totalFeeUSD: parseNumOrNull(totalFeeUsd),
      totalFeeINR: parseNumOrNull(totalFeeInr),
      attendWorkshop,
    };

    // Send email with ticket (don't wait for it to complete)
    if (paymentVerified === "true" || paymentVerified === true) {
      fetch(`${process.env.BACKEND_URL || "http://localhost:5000"}/api/send-ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationData, qrCode: qrCodeData }),
      }).catch(emailErr => {
        console.error("Email sending failed:", emailErr);
      });
    }

    res.json({ 
      success: true, 
      message: "Registration successful!", 
      id: results.insertId,
      registrationId,
      qrCode: qrCodeData
    });
  });
});

// Verify registration by QR code
router.post("/verify-registration", (req, res) => {
  const { registrationId } = req.body;

  if (!registrationId) {
    return res.status(400).json({ error: "Registration ID is required" });
  }

  const query = `
    SELECT 
      registration_id, full_name, email, participant_type, 
      affiliation, designation, paper_id, paper_title,
      created_at
    FROM registrations 
    WHERE registration_id = ?
  `;

  db.query(query, [registrationId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        valid: false, 
        message: "Registration not found" 
      });
    }

    const registration = results[0];
    res.json({
      valid: true,
      message: "Registration verified successfully",
      data: {
        registrationId: registration.registration_id,
        fullName: registration.full_name,
        email: registration.email,
        participantType: registration.participant_type,
        affiliation: registration.affiliation,
        designation: registration.designation,
        paperId: registration.paper_id,
        paperTitle: registration.paper_title,
        registeredAt: registration.created_at,
      }
    });
  });
});

export default router;
