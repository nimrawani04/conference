import { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=DM+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap');

  @keyframes certIn {
    from { opacity: 0; scale: 0.97; }
    to   { opacity: 1; scale: 1; }
  }
  .cert-in { animation: certIn 0.35s cubic-bezier(.22,.68,0,1.2) both; }

  .cert-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: none;
    cursor: pointer;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0;
    background: transparent;
    transition: opacity 0.15s;
  }
  .cert-btn:hover { opacity: 0.7; }

  .cert-btn-print {
    color: #f4efe4;
  }
  .cert-btn-print .btn-icon {
    width: 28px; height: 28px;
    border: 1.5px solid #f4efe4;
    display: flex; align-items: center; justify-content: center;
  }

  .cert-btn-close {
    color: #666;
  }
  .cert-btn-close .btn-icon {
    width: 28px; height: 28px;
    border: 1.5px solid #444;
    display: flex; align-items: center; justify-content: center;
  }

  @media print {
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      height: auto !important;
      min-height: 0 !important;
    }
    @page {
      size: landscape;
      margin: 10mm;
    }
    body > *:not(.registration-ticket-backdrop) { visibility: hidden; }
    .no-print { display: none !important; }
    .print-root, .print-root * { visibility: visible; }
    .registration-ticket-backdrop {
      position: static !important;
      inset: auto !important;
      display: block !important;
      height: auto !important;
      min-height: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      z-index: auto !important;
    }
    .registration-ticket-frame {
      box-shadow: none !important;
      max-width: none !important;
    }
    .print-root {
      position: relative !important;
      left: auto !important;
      top: auto !important;
      width: 100% !important;
      height: auto !important;
      page-break-inside: avoid;
      break-inside: avoid;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

export default function RegistrationTicket({ registrationData, onClose }) {
  const ticketRef = useRef(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const regId =
    registrationData.registrationId ||
    "2AI-2026-" + Math.random().toString(36).substring(2, 11).toUpperCase();

  useEffect(() => {
    document.body.classList.add("registration-ticket-printing");
    return () => document.body.classList.remove("registration-ticket-printing");
  }, []);

  useEffect(() => {
    QRCode.toDataURL(JSON.stringify({
      registrationId: regId,
      name: registrationData.fullName,
      email: registrationData.email,
      type: registrationData.participantType,
      conference: "2AI-2026",
    }), {
      width: 280,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#111111", light: "#f4efe4" },
    }).then(setQrCodeUrl).catch(console.error);
  }, [regId, registrationData]);

  const fee = `$${registrationData.totalFeeUSD}${registrationData.totalFeeINR > 0 ? ` / ₹${registrationData.totalFeeINR}` : ""
    }`;

  const mono = { fontFamily: "'Share Tech Mono', monospace" };
  const sans = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <>
      <style>{fontImport}</style>

      {/* Backdrop */}
      <div className="registration-ticket-backdrop" style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.78)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 50, padding: "16px",
        ...sans,
      }}>
        <div className="cert-in registration-ticket-frame" style={{
          display: "flex", flexDirection: "column",
          maxWidth: "920px", width: "100%",
          boxShadow: "0 32px 100px rgba(0,0,0,0.6)",
        }}>

          {/* ── Action bar ── */}
          <div className="no-print" style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#111", padding: "12px 20px", borderRadius: "6px 6px 0 0",
            borderBottom: "1px solid #2a2a2a",
          }}>
            {/* Left — reg ID in mono */}
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "11px", letterSpacing: "0.18em", color: "#555",
            }}>
              {regId}
            </span>

            {/* Right — two flat icon+label buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>

              {/* Print */}
              <button className="cert-btn cert-btn-print" onClick={() => window.print()}>
                <span className="btn-icon">
                  {/* printer SVG */}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#f4efe4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="1" width="10" height="5" rx="0.5" />
                    <path d="M3 11H1.5A.5.5 0 0 1 1 10.5v-5A.5.5 0 0 1 1.5 5h13a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H13" />
                    <rect x="3" y="9" width="10" height="6" rx="0.5" />
                    <line x1="5.5" y1="12" x2="10.5" y2="12" />
                    <line x1="5.5" y1="13.5" x2="8.5" y2="13.5" />
                    <circle cx="13" cy="7.5" r="0.6" fill="#f4efe4" stroke="none" />
                  </svg>
                </span>
                Print
              </button>

              {/* Divider */}
              <div style={{ width: "1px", height: "18px", background: "#2e2e2e" }} />

              {/* Close */}
              <button className="cert-btn cert-btn-close" onClick={onClose}>
                <span className="btn-icon">
                  {/* X SVG */}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#666" strokeWidth="1.4" strokeLinecap="round">
                    <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
                    <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
                  </svg>
                </span>
                Close
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════
               CERTIFICATE — landscape card
          ══════════════════════════════════ */}
          <div ref={ticketRef} className="print-root" style={{
            background: "#f4efe4",
            padding: "36px 44px 32px",
            position: "relative", overflow: "hidden",
          }}>

            {/* dot-grid texture */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />

            {/* ── Row 1: meta ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", position: "relative" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", color: "#555", textTransform: "uppercase" }}>
                Registration Confirmation
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/CUKLogo.png" alt="CUK" style={{ height: "26px", objectFit: "contain" }}
                  onError={e => e.target.style.display = "none"} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", color: "#555", textTransform: "uppercase" }}>
                  2AI Conference
                </span>
              </div>
            </div>

            {/* ── Rule ── */}
            <hr style={{ border: "none", borderTop: "1px solid #bbb", margin: "0 0 24px" }} />

            {/* ══ MAIN HORIZONTAL LAYOUT ══ */}
            <div style={{ display: "flex", gap: "36px", alignItems: "stretch", position: "relative" }}>

              {/* LEFT COLUMN — big pixel title + conf details */}
              <div style={{
                flex: "0 0 230px",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                borderRight: "1.5px solid #aaa", paddingRight: "36px",
              }}>
                <div style={{
                  ...mono,
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#111",
                  margin: "0 0 24px",
                  textTransform: "uppercase",
                  letterSpacing: "0.01em",
                  whiteSpace: "pre-line",
                }}>
                  {`2nd
International
Conference on
Advances
in AI`}
                </div>

                {/* detail pills */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "Dates", value: "18–20 June 2026" },
                    { label: "Venue", value: "CUK, Ganderbal" },
                    { label: "Fee", value: fee },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ borderLeft: "2px solid #999", paddingLeft: "10px" }}>
                      <p style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.18em", color: "#888", margin: "0 0 2px", textTransform: "uppercase" }}>{label}</p>
                      <p style={{ ...mono, fontSize: "11px", color: "#222", margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                {/* Presented-to box */}
                <div style={{ border: "1.5px solid #222", marginBottom: "20px" }}>
                  {/* header strip */}
                  <div style={{
                    borderBottom: "1.5px solid #222",
                    padding: "7px 20px",
                    display: "flex", alignItems: "center", gap: "12px",
                    background: "rgba(0,0,0,0.04)",
                  }}>
                    <div style={{ flex: 1, height: "1px", background: "#666" }} />
                    <span style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      Proudly Presented To
                    </span>
                    <div style={{ flex: 1, height: "1px", background: "#666" }} />
                  </div>

                  {/* logo + name */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      borderRight: "1.5px solid #222",
                      padding: "16px 20px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      minWidth: "86px",
                    }}>
                      <img src="/logo.png" alt="2AI" style={{ height: "42px", objectFit: "contain" }}
                        onError={e => { e.target.style.display = "none"; }} />
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <h2 style={{
                        ...mono,
                        fontSize: "clamp(15px, 2.6vw, 24px)",
                        fontWeight: 400, color: "#111",
                        margin: 0, textTransform: "uppercase", letterSpacing: "0.04em",
                      }}>
                        {registrationData.fullName}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* 2×2 details grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 28px", marginBottom: "20px" }}>
                  {[
                    ["Affiliation", registrationData.affiliation],
                    ["Designation", registrationData.designation],
                    ["Registration Type", registrationData.participantType],
                    ["Attendance Mode", registrationData.attendanceMode || "Offline"],
                    ["Registration ID", regId],
                  ].map(([label, value]) => (
                    <div key={label} style={{ borderBottom: "1px solid #ccc", paddingBottom: "7px" }}>
                      <p style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.18em", color: "#888", margin: "0 0 2px", textTransform: "uppercase" }}>{label}</p>
                      <p style={{ fontSize: "12px", color: "#222", margin: 0, ...(label === "Registration ID" ? mono : {}) }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Paper details (authors only) */}
                {registrationData.participantType === "Author" && registrationData.paperId && (
                  <div style={{
                    border: "1px dashed #aaa", padding: "10px 14px",
                    background: "rgba(255,255,255,0.35)", marginBottom: "20px",
                  }}>
                    <p style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.18em", color: "#888", margin: "0 0 8px", textTransform: "uppercase" }}>Paper Details</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
                      {[["Paper ID", registrationData.paperId], ["Authors", registrationData.numAuthors]].map(([l, v]) => (
                        <div key={l}>
                          <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#aaa", margin: "0 0 1px", textTransform: "uppercase" }}>{l}</p>
                          <p style={{ ...mono, fontSize: "11px", color: "#222", margin: 0 }}>{v}</p>
                        </div>
                      ))}
                      <div style={{ gridColumn: "span 2" }}>
                        <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#aaa", margin: "0 0 1px", textTransform: "uppercase" }}>Title</p>
                        <p style={{ fontSize: "11px", color: "#222", margin: 0 }}>{registrationData.paperTitle}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom: congrats | QR | signature */}
                <div style={{ borderTop: "1px solid #bbb", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                  {/* Congrats text */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", color: "#555", margin: "0 0 2px", textTransform: "uppercase" }}>
                      Congratulations &amp; Thank You
                    </p>
                    <p style={{ fontSize: "9px", color: "#999", margin: 0 }}>
                      for registering for the 2AI Conference 2026
                    </p>
                  </div>

                  {/* QR — large enough for phone cameras to resolve modules (~1:1 scan box) */}
                  {qrCodeUrl && (
                    <div style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                      borderLeft: "1px solid #ccc", borderRight: "1px solid #ccc",
                      padding: "0 12px",
                    }}>
                      <img src={qrCodeUrl} alt="QR" style={{ width: "100px", height: "100px", display: "block" }} />
                      <p style={{ ...mono, fontSize: "7px", letterSpacing: "0.16em", color: "#aaa", textTransform: "uppercase", margin: 0 }}>
                        Scan to Verify
                      </p>
                    </div>
                  )}

                  {/* Signature */}
                  <div style={{ textAlign: "right", flex: 1 }}>
                    <p style={{ fontFamily: "cursive", fontSize: "17px", color: "#222", margin: "0 0 2px", lineHeight: 1.2 }}>
                      Organizing Committee
                    </p>
                    <p style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.16em", color: "#888", margin: 0, textTransform: "uppercase" }}>
                      2AI Conference 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* fine print */}
            <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "20px 0 10px", position: "relative" }} />
            <p style={{ fontSize: "9.5px", color: "#999", textAlign: "center", margin: 0, position: "relative" }}>
              Official registration confirmation · 2nd International Conference on Advances in AI (2AI-2026) ·{" "}
              <a href="mailto:info@2aiconference.com" style={{ color: "#777" }}>info@2aiconference.com</a>
            </p>
          </div>

          {/* ── Bottom bar ── */}
          <div className="no-print" style={{
            background: "#111", padding: "10px 20px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderRadius: "0 0 6px 6px",
            borderTop: "1px solid #1e1e1e",
          }}>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px", color: "#444", letterSpacing: "0.14em",
            }}>
              A copy will be sent to your email
            </span>
            <button onClick={onClose} style={{
              background: "transparent",
              color: "#f4efe4",
              border: "1.5px solid #333",
              padding: "6px 22px",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#f4efe4"; e.target.style.color = "#f4efe4"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#333"; e.target.style.color = "#f4efe4"; }}
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </>
  );
}