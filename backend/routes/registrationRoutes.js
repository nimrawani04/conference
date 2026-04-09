import express from "express";
import multer from "multer";
import db from "../db.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("paymentProof"), (req, res) => {
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
  } = req.body;

  const paymentProofPath = file ? file.path : null;

  const query = `
    INSERT INTO registrations (
      full_name, affiliation, designation, country, email, contact_number, 
      participant_type, paper_id, paper_title, num_authors, sub_category, 
      region, attend_workshop, total_fee_usd, total_fee_inr, mode_of_payment, 
      transaction_id, date_of_payment, payment_proof_path, declaration
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Provide NULL for empty numeric fields to match schema types nicely
  const parseNumOrNull = (val) => val === '' || val === undefined ? null : Number(val);

  const values = [
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
    declaration === "true" || declaration === true ? 1 : 0
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Database insert error:", err);
      // Optional: Add some handling if table doesn't exist, log clearly.
      return res.status(500).json({ error: "Database error. Did you run the CREATE TABLE script?", details: err.message });
    }
    res.json({ success: true, message: "Registration successful!", id: results.insertId });
  });
});

export default router;
