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

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .cert-btn {
      font-size: 9px;
      gap: 5px;
    }
    .cert-btn .btn-icon {
      width: 24px !important;
      height: 24px !important;
    }
    .cert-btn svg {
      width: 12px !important;
      height: 12px !important;
    }
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
        zIndex: 50, padding: "8px",
        ...sans,
        overflowY: "auto",
      }}>
        <div className="cert-in registration-ticket-frame" style={{
          display: "flex", flexDirection: "column",
          maxWidth: "920px", width: "100%",
          boxShadow: "0 32px 100px rgba(0,0,0,0.6)",
          margin: "auto",
        }}>

          {/* ── Action bar ── */}
          <div className="no-print" style={{
            display: "flex", 
            flexDirection: window.innerWidth < 480 ? "column" : "row",
            justifyContent: "space-between", 
            alignItems: "center",
            background: "#111", 
            padding: window.innerWidth < 480 ? "10px 12px" : "12px 20px", 
            borderRadius: "6px 6px 0 0",
            borderBottom: "1px solid #2a2a2a",
            gap: window.innerWidth < 480 ? "10px" : "0",
          }}>
            {/* Left — reg ID in mono */}
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: window.innerWidth < 480 ? "9px" : "11px", 
              letterSpacing: "0.18em", 
              color: "#555",
            }}>
              {regId}
            </span>

            {/* Right — two flat icon+label buttons */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: window.innerWidth < 480 ? "12px" : "24px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>

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
            padding: window.innerWidth < 640 ? "20px 16px" : window.innerWidth < 768 ? "28px 24px" : "36px 44px 32px",
            position: "relative", overflow: "hidden",
          }}>

            {/* dot-grid texture */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />

            {/* ── Row 1: meta ── */}
            <div style={{ 
              display: "flex", 
              flexDirection: window.innerWidth < 640 ? "column" : "row",
              justifyContent: "space-between", 
              alignItems: window.innerWidth < 640 ? "flex-start" : "center", 
              marginBottom: "14px", 
              position: "relative",
              gap: window.innerWidth < 640 ? "8px" : "0",
            }}>
              <span style={{ 
                fontSize: window.innerWidth < 640 ? "8px" : "10px", 
                fontWeight: 700, 
                letterSpacing: "0.22em", 
                color: "#555", 
                textTransform: "uppercase" 
              }}>
                Registration Confirmation
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/CUKLogo.png" alt="CUK" style={{ 
                  height: window.innerWidth < 640 ? "20px" : "26px", 
                  objectFit: "contain" 
                }}
                  onError={e => e.target.style.display = "none"} />
                <span style={{ 
                  fontSize: window.innerWidth < 640 ? "8px" : "10px", 
                  fontWeight: 700, 
                  letterSpacing: "0.22em", 
                  color: "#555", 
                  textTransform: "uppercase" 
                }}>
                  2AI Conference
                </span>
              </div>
            </div>

            {/* ── Rule ── */}
            <hr style={{ border: "none", borderTop: "1px solid #bbb", margin: "0 0 24px" }} />

            {/* ══ MAIN HORIZONTAL LAYOUT ══ */}
            <div style={{ 
              display: "flex", 
              flexDirection: window.innerWidth < 768 ? "column" : "row",
              gap: window.innerWidth < 768 ? "20px" : "36px", 
              alignItems: "stretch", 
              position: "relative" 
            }}>

              {/* LEFT COLUMN — big pixel title + conf details */}
              <div style={{
                flex: window.innerWidth < 768 ? "1" : "0 0 230px",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                borderRight: window.innerWidth < 768 ? "none" : "1.5px solid #aaa",
                borderBottom: window.innerWidth < 768 ? "1.5px solid #aaa" : "none",
                paddingRight: window.innerWidth < 768 ? "0" : "36px",
                paddingBottom: window.innerWidth < 768 ? "20px" : "0",
              }}>
                <div style={{
                  ...mono,
                  fontSize: window.innerWidth < 480 ? "18px" : window.innerWidth < 640 ? "22px" : window.innerWidth < 768 ? "26px" : "32px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#111",
                  margin: window.innerWidth < 768 ? "0 0 16px" : "0 0 24px",
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
                <div style={{ 
                  display: "flex", 
                  flexDirection: window.innerWidth < 480 ? "column" : "row",
                  flexWrap: "wrap",
                  gap: "10px" 
                }}>
                  {[
                    { label: "Dates", value: "18–20 June 2026" },
                    { label: "Venue", value: "CUK, Ganderbal" },
                    { label: "Fee", value: fee },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ 
                      borderLeft: "2px solid #999", 
                      paddingLeft: "10px",
                      flex: window.innerWidth < 480 ? "1" : "0 0 auto",
                    }}>
                      <p style={{ 
                        fontSize: window.innerWidth < 640 ? "7.5px" : "8.5px", 
                        fontWeight: 700, 
                        letterSpacing: "0.18em", 
                        color: "#888", 
                        margin: "0 0 2px", 
                        textTransform: "uppercase" 
                      }}>{label}</p>
                      <p style={{ 
                        ...mono, 
                        fontSize: window.innerWidth < 640 ? "9px" : "11px", 
                        color: "#222", 
                        margin: 0 
                      }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                {/* Presented-to box */}
                <div style={{ border: "1.5px solid #222", marginBottom: window.innerWidth < 640 ? "16px" : "20px" }}>
                  {/* header strip */}
                  <div style={{
                    borderBottom: "1.5px solid #222",
                    padding: window.innerWidth < 640 ? "6px 12px" : "7px 20px",
                    display: "flex", alignItems: "center", gap: window.innerWidth < 640 ? "8px" : "12px",
                    background: "rgba(0,0,0,0.04)",
                  }}>
                    <div style={{ flex: 1, height: "1px", background: "#666" }} />
                    <span style={{ 
                      fontSize: window.innerWidth < 640 ? "7.5px" : "9.5px", 
                      fontWeight: 700, 
                      letterSpacing: "0.22em", 
                      color: "#555", 
                      textTransform: "uppercase", 
                      whiteSpace: "nowrap" 
                    }}>
                      Proudly Presented To
                    </span>
                    <div style={{ flex: 1, height: "1px", background: "#666" }} />
                  </div>

                  {/* logo + name */}
                  <div style={{ 
                    display: "flex", 
                    flexDirection: window.innerWidth < 480 ? "column" : "row",
                    alignItems: "center" 
                  }}>
                    <div style={{
                      borderRight: window.innerWidth < 480 ? "none" : "1.5px solid #222",
                      borderBottom: window.innerWidth < 480 ? "1.5px solid #222" : "none",
                      padding: window.innerWidth < 640 ? "12px 16px" : "16px 20px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      minWidth: window.innerWidth < 480 ? "100%" : "86px",
                    }}>
                      <img src="/logo.png" alt="2AI" style={{ 
                        height: window.innerWidth < 640 ? "32px" : "42px", 
                        objectFit: "contain" 
                      }}
                        onError={e => { e.target.style.display = "none"; }} />
                    </div>
                    <div style={{ 
                      padding: window.innerWidth < 640 ? "12px 16px" : "16px 20px",
                      width: window.innerWidth < 480 ? "100%" : "auto",
                      textAlign: window.innerWidth < 480 ? "center" : "left",
                    }}>
                      <h2 style={{
                        ...mono,
                        fontSize: window.innerWidth < 480 ? "14px" : window.innerWidth < 640 ? "16px" : "clamp(15px, 2.6vw, 24px)",
                        fontWeight: 400, color: "#111",
                        margin: 0, textTransform: "uppercase", letterSpacing: "0.04em",
                        wordBreak: "break-word",
                      }}>
                        {registrationData.fullName}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* 2×2 details grid */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: window.innerWidth < 640 ? "1fr" : "1fr 1fr", 
                  gap: window.innerWidth < 640 ? "10px" : "10px 28px", 
                  marginBottom: window.innerWidth < 640 ? "16px" : "20px" 
                }}>
                  {[
                    ["Affiliation", registrationData.affiliation],
                    ["Designation", registrationData.designation],
                    ["Registration Type", registrationData.participantType],
                    ["Attendance Mode", registrationData.attendanceMode || "Offline"],
                    ["Registration ID", regId],
                  ].map(([label, value]) => (
                    <div key={label} style={{ borderBottom: "1px solid #ccc", paddingBottom: "7px" }}>
                      <p style={{ 
                        fontSize: window.innerWidth < 640 ? "7.5px" : "8.5px", 
                        fontWeight: 700, 
                        letterSpacing: "0.18em", 
                        color: "#888", 
                        margin: "0 0 2px", 
                        textTransform: "uppercase" 
                      }}>{label}</p>
                      <p style={{ 
                        fontSize: window.innerWidth < 640 ? "10px" : "12px", 
                        color: "#222", 
                        margin: 0, 
                        wordBreak: "break-word",
                        ...(label === "Registration ID" ? mono : {}) 
                      }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Paper details (authors only) */}
                {registrationData.participantType === "Author" && registrationData.paperId && (
                  <div style={{
                    border: "1px dashed #aaa", 
                    padding: window.innerWidth < 640 ? "8px 10px" : "10px 14px",
                    background: "rgba(255,255,255,0.35)", 
                    marginBottom: window.innerWidth < 640 ? "16px" : "20px",
                  }}>
                    <p style={{ 
                      fontSize: window.innerWidth < 640 ? "7.5px" : "8.5px", 
                      fontWeight: 700, 
                      letterSpacing: "0.18em", 
                      color: "#888", 
                      margin: "0 0 8px", 
                      textTransform: "uppercase" 
                    }}>Paper Details</p>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: window.innerWidth < 480 ? "1fr" : "1fr 1fr", 
                      gap: window.innerWidth < 480 ? "6px" : "6px 20px" 
                    }}>
                      {[["Paper ID", registrationData.paperId], ["Authors", registrationData.numAuthors]].map(([l, v]) => (
                        <div key={l}>
                          <p style={{ 
                            fontSize: window.innerWidth < 640 ? "7px" : "8px", 
                            fontWeight: 700, 
                            letterSpacing: "0.14em", 
                            color: "#aaa", 
                            margin: "0 0 1px", 
                            textTransform: "uppercase" 
                          }}>{l}</p>
                          <p style={{ 
                            ...mono, 
                            fontSize: window.innerWidth < 640 ? "9px" : "11px", 
                            color: "#222", 
                            margin: 0 
                          }}>{v}</p>
                        </div>
                      ))}
                      <div style={{ gridColumn: window.innerWidth < 480 ? "span 1" : "span 2" }}>
                        <p style={{ 
                          fontSize: window.innerWidth < 640 ? "7px" : "8px", 
                          fontWeight: 700, 
                          letterSpacing: "0.14em", 
                          color: "#aaa", 
                          margin: "0 0 1px", 
                          textTransform: "uppercase" 
                        }}>Title</p>
                        <p style={{ 
                          fontSize: window.innerWidth < 640 ? "9px" : "11px", 
                          color: "#222", 
                          margin: 0,
                          wordBreak: "break-word",
                        }}>{registrationData.paperTitle}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom: congrats | QR | signature */}
                <div style={{ 
                  borderTop: "1px solid #bbb", 
                  paddingTop: "14px", 
                  display: "flex", 
                  flexDirection: window.innerWidth < 640 ? "column" : "row",
                  justifyContent: "space-between", 
                  alignItems: window.innerWidth < 640 ? "center" : "flex-end", 
                  gap: window.innerWidth < 640 ? "12px" : "16px",
                  textAlign: window.innerWidth < 640 ? "center" : "left",
                }}>
                  {/* Congrats text */}
                  <div style={{ flex: 1, order: window.innerWidth < 640 ? 2 : 1 }}>
                    <p style={{ 
                      fontSize: window.innerWidth < 640 ? "7.5px" : "9px", 
                      fontWeight: 700, 
                      letterSpacing: "0.2em", 
                      color: "#555", 
                      margin: "0 0 2px", 
                      textTransform: "uppercase" 
                    }}>
                      Congratulations &amp; Thank You
                    </p>
                    <p style={{ 
                      fontSize: window.innerWidth < 640 ? "7.5px" : "9px", 
                      color: "#999", 
                      margin: 0 
                    }}>
                      for registering for the 2AI Conference 2026
                    </p>
                  </div>

                  {/* QR — large enough for phone cameras to resolve modules (~1:1 scan box) */}
                  {qrCodeUrl && (
                    <div style={{
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center", 
                      gap: "4px",
                      borderLeft: window.innerWidth < 640 ? "none" : "1px solid #ccc", 
                      borderRight: window.innerWidth < 640 ? "none" : "1px solid #ccc",
                      borderTop: window.innerWidth < 640 ? "1px solid #ccc" : "none",
                      borderBottom: window.innerWidth < 640 ? "1px solid #ccc" : "none",
                      padding: window.innerWidth < 640 ? "12px 0" : "0 12px",
                      order: window.innerWidth < 640 ? 1 : 2,
                    }}>
                      <img src={qrCodeUrl} alt="QR" style={{ 
                        width: window.innerWidth < 640 ? "80px" : "100px", 
                        height: window.innerWidth < 640 ? "80px" : "100px", 
                        display: "block" 
                      }} />
                      <p style={{ 
                        ...mono, 
                        fontSize: window.innerWidth < 640 ? "6px" : "7px", 
                        letterSpacing: "0.16em", 
                        color: "#aaa", 
                        textTransform: "uppercase", 
                        margin: 0 
                      }}>
                        Scan to Verify
                      </p>
                    </div>
                  )}

                  {/* Signature */}
                  <div style={{ 
                    textAlign: window.innerWidth < 640 ? "center" : "right", 
                    flex: 1,
                    order: 3,
                  }}>
                    <p style={{ 
                      fontFamily: "cursive", 
                      fontSize: window.innerWidth < 640 ? "14px" : "17px", 
                      color: "#222", 
                      margin: "0 0 2px", 
                      lineHeight: 1.2 
                    }}>
                      Organizing Committee
                    </p>
                    <p style={{ 
                      fontSize: window.innerWidth < 640 ? "7px" : "8.5px", 
                      fontWeight: 700, 
                      letterSpacing: "0.16em", 
                      color: "#888", 
                      margin: 0, 
                      textTransform: "uppercase" 
                    }}>
                      2AI Conference 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* fine print */}
            <hr style={{ 
              border: "none", 
              borderTop: "1px solid #ccc", 
              margin: window.innerWidth < 640 ? "16px 0 8px" : "20px 0 10px", 
              position: "relative" 
            }} />
            <p style={{ 
              fontSize: window.innerWidth < 640 ? "7.5px" : "9.5px", 
              color: "#999", 
              textAlign: "center", 
              margin: 0, 
              position: "relative",
              lineHeight: 1.4,
            }}>
              Official registration confirmation · 2nd International Conference on Advances in AI (2AI-2026) ·{" "}
              <a href="mailto:info@2aiconference.com" style={{ color: "#777" }}>info@2aiconference.com</a>
            </p>
          </div>

          {/* ── Bottom bar ── */}
          <div className="no-print" style={{
            background: "#111", 
            padding: window.innerWidth < 480 ? "10px 12px" : "10px 20px",
            display: "flex", 
            flexDirection: window.innerWidth < 480 ? "column" : "row",
            justifyContent: "space-between", 
            alignItems: "center",
            borderRadius: "0 0 6px 6px",
            borderTop: "1px solid #1e1e1e",
            gap: window.innerWidth < 480 ? "10px" : "0",
          }}>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: window.innerWidth < 480 ? "8px" : "10px", 
              color: "#444", 
              letterSpacing: "0.14em",
              textAlign: "center",
            }}>
              A copy will be sent to your email
            </span>
            <button onClick={onClose} style={{
              background: "transparent",
              color: "#f4efe4",
              border: "1.5px solid #333",
              padding: window.innerWidth < 480 ? "8px 24px" : "6px 22px",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: window.innerWidth < 480 ? "10px" : "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
              width: window.innerWidth < 480 ? "100%" : "auto",
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