import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASS || "your-app-password",
  },
});

// Send registration confirmation email with ticket
router.post("/send-ticket", async (req, res) => {
  const { registrationData, qrCode } = req.body;

  try {
    // Create email HTML with ticket
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2c5aa0; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .ticket { background: white; padding: 20px; margin: 20px 0; border: 2px solid #2c5aa0; }
          .qr-code { text-align: center; margin: 20px 0; }
          .qr-code img { max-width: 200px; }
          .details { margin: 15px 0; }
          .details strong { display: inline-block; width: 150px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎫 Registration Confirmed!</h1>
            <p>2nd International Conference on Advances in AI</p>
          </div>
          
          <div class="content">
            <h2>Dear ${registrationData.fullName},</h2>
            <p>Thank you for registering for the 2AI Conference 2026! Your registration has been confirmed.</p>
            
            <div class="ticket">
              <h3 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
                Registration Details
              </h3>
              
              <div class="details">
                <p><strong>Registration ID:</strong> ${registrationData.registrationId}</p>
                <p><strong>Name:</strong> ${registrationData.fullName}</p>
                <p><strong>Email:</strong> ${registrationData.email}</p>
                <p><strong>Affiliation:</strong> ${registrationData.affiliation}</p>
                <p><strong>Designation:</strong> ${registrationData.designation}</p>
                <p><strong>Type:</strong> ${registrationData.participantType}</p>
                ${registrationData.paperId ? `
                  <p><strong>Paper ID:</strong> ${registrationData.paperId}</p>
                  <p><strong>Paper Title:</strong> ${registrationData.paperTitle}</p>
                ` : ''}
                <p><strong>Fee Paid:</strong> $${registrationData.totalFeeUSD}${registrationData.totalFeeINR > 0 ? ` / ₹${registrationData.totalFeeINR}` : ''}</p>
              </div>

              <div class="qr-code">
                <p><strong>Your QR Code Ticket:</strong></p>
                <img src="${qrCode}" alt="QR Code" />
                <p style="font-size: 12px; color: #666;">Scan this QR code at the venue for verification</p>
              </div>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <h4 style="margin-top: 0;">Conference Details:</h4>
              <p><strong>Dates:</strong> 18-20 June 2026</p>
              <p><strong>Venue:</strong> Central University of Kashmir, Ganderbal</p>
              <p style="margin-bottom: 0;"><strong>Workshop:</strong> ${registrationData.attendWorkshop === 'Yes' ? '17th June 2026 (Pre-Conference)' : 'Not attending'}</p>
            </div>

            <p>Please save this email and bring a printed or digital copy of your QR code ticket to the conference.</p>
            
            <p>If you have any questions, please contact us at <a href="mailto:info@2aiconference.com">info@2aiconference.com</a></p>
            
            <p>We look forward to seeing you at the conference!</p>
            
            <p>Best regards,<br>
            <strong>2AI Conference Organizing Committee</strong></p>
          </div>
          
          <div class="footer">
            <p>2nd International Conference on Advances in AI (2AI-2026)</p>
            <p>Central University of Kashmir | 18-20 June 2026</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    const mailOptions = {
      from: `"2AI Conference" <${process.env.SMTP_USER || "noreply@2aiconference.com"}>`,
      to: registrationData.email,
      subject: `Registration Confirmed - 2AI Conference 2026 | ${registrationData.registrationId}`,
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

// Test email configuration
router.get("/test-email", async (req, res) => {
  try {
    await transporter.verify();
    res.json({ success: true, message: "Email configuration is working" });
  } catch (error) {
    console.error("Email configuration error:", error);
    res.status(500).json({ error: "Email configuration failed", details: error.message });
  }
});

export default router;
