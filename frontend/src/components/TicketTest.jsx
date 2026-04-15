import { useState } from "react";
import RegistrationTicket from "./RegistrationTicket";

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #111;
    font-family: 'DM Sans', sans-serif;
  }

  .test-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid #333;
    background: transparent;
    color: #f4efe4;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    justify-content: center;
    transition: border-color 0.15s, background 0.15s;
  }
  .test-btn:hover {
    border-color: #f4efe4;
    background: rgba(244,239,228,0.05);
  }

  .tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #555;
    padding: 2px 8px;
    border: 1px solid #2a2a2a;
  }
`;

const sampleData = {
  fullName: "Mohammad Mushtaq",
  affiliation: "Central University of Kashmir",
  designation: "PhD Scholar",
  country: "India",
  email: "mushtaq@cukashmir.ac.in",
  contactNumber: "+91 9876 543 210",
  participantType: "Author",
  paperId: "2AI-2026-001",
  paperTitle: "Deep Learning Approaches for Sentiment Analysis in Low-Resource Languages",
  numAuthors: "3",
  subCategory: "UG / PG / PhD Student",
  region: "South Asian",
  attendWorkshop: "Yes",
  modeOfPayment: "Bank Transfer",
  transactionId: "TXN123456789",
  dateOfPayment: "2026-04-10",
  declaration: true,
  totalFeeUSD: 100,
  totalFeeINR: 9000,
  registrationId: "2AI-2026-ABCD1234",
};

const sampleDataNonAuthor = {
  fullName: "Sarah Johnson",
  affiliation: "Massachusetts Institute of Technology",
  designation: "Faculty / Researcher",
  country: "United States",
  email: "sarah.johnson@mit.edu",
  contactNumber: "+1 617 555 0123",
  participantType: "Non-Author",
  paperId: "",
  paperTitle: "",
  numAuthors: "",
  subCategory: "Others",
  region: "Other Countries",
  attendWorkshop: "No",
  modeOfPayment: "Online Payment",
  transactionId: "TXN987654321",
  dateOfPayment: "2026-04-11",
  declaration: true,
  totalFeeUSD: 100,
  totalFeeINR: 0,
  registrationId: "2AI-2026-XYZ5678",
};

const mono = { fontFamily: "'Share Tech Mono', monospace" };

function DataRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #1e1e1e", padding: "7px 0" }}>
      <span style={{ ...mono, fontSize: "9px", letterSpacing: "0.16em", color: "#555", textTransform: "uppercase" }}>{label}</span>
      <span style={{ ...mono, fontSize: "11px", color: "#888" }}>{value}</span>
    </div>
  );
}

export default function TicketTest() {
  const [showTicket, setShowTicket] = useState(false);
  const [currentData, setCurrentData] = useState(sampleData);

  const open = (data) => { setCurrentData(data); setShowTicket(true); };

  return (
    <>
      <style>{fontImport}</style>

      <div className="ticket-test-shell" style={{ minHeight: "100vh", background: "#111", padding: "48px 24px", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Page header ── */}
        <div style={{ maxWidth: "820px", margin: "0 auto 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #222", paddingBottom: "20px", marginBottom: "20px" }}>
            <div>
              <p style={{ ...mono, fontSize: "9px", letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", marginBottom: "8px" }}>
                Dev · Ticket Preview
              </p>
              <h1 style={{ ...mono, fontSize: "clamp(22px, 4vw, 34px)", color: "#f4efe4", lineHeight: 1.1, fontWeight: 400 }}>
                Registration<br />Ticket Tester
              </h1>
            </div>
            <span className="tag">2AI-2026</span>
          </div>
          <p style={{ fontSize: "12px", color: "#555", letterSpacing: "0.03em", lineHeight: 1.6 }}>
            Preview the registration confirmation ticket with sample data before deploying.
          </p>
        </div>

        {/* ── Two sample cards ── */}
        <div style={{ maxWidth: "820px", margin: "0 auto 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

          {[
            { label: "Author", data: sampleData },
            { label: "Non-Author", data: sampleDataNonAuthor },
          ].map(({ label, data }) => (
            <div key={label} style={{ border: "1px solid #222", background: "#161616", padding: "24px" }}>

              {/* card header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ ...mono, fontSize: "11px", letterSpacing: "0.18em", color: "#f4efe4", textTransform: "uppercase" }}>
                  {label}
                </span>
                <span style={{
                  ...mono, fontSize: "9px", letterSpacing: "0.14em",
                  color: label === "Author" ? "#b5a87a" : "#7aabb5",
                  border: `1px solid ${label === "Author" ? "#3a3020" : "#203038"}`,
                  padding: "2px 8px", textTransform: "uppercase",
                }}>
                  {data.participantType}
                </span>
              </div>

              {/* data rows */}
              <div style={{ marginBottom: "22px" }}>
                <DataRow label="Name"   value={data.fullName} />
                <DataRow label="Reg ID" value={data.registrationId} />
                <DataRow label="Fee"    value={`$${data.totalFeeUSD}${data.totalFeeINR ? ` / ₹${data.totalFeeINR}` : ""}`} />
                {data.paperId && <DataRow label="Paper" value={data.paperId} />}
              </div>

              {/* CTA */}
              <button className="test-btn" onClick={() => open(data)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="1" width="10" height="10" rx="0.5"/>
                  <line x1="3.5" y1="4" x2="8.5" y2="4"/>
                  <line x1="3.5" y1="6" x2="8.5" y2="6"/>
                  <line x1="3.5" y1="8" x2="6" y2="8"/>
                </svg>
                View Ticket
              </button>
            </div>
          ))}
        </div>

        {/* ── Feature checklist ── */}
        <div style={{ maxWidth: "820px", margin: "0 auto", border: "1px solid #1e1e1e", padding: "24px" }}>
          <p style={{ ...mono, fontSize: "9px", letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", marginBottom: "16px" }}>
            Checklist
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            {[
              "Professional certificate layout",
              "Monospace typography",
              "Horizontal landscape design",
              "Print optimized (no whitespace)",
              "Unique registration ID",
              "Paper details (authors only)",
              "Clean modern design",
              "No double printing issue",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "10px",
                borderBottom: "1px solid #1a1a1a",
                borderRight: i % 2 === 0 ? "1px solid #1a1a1a" : "none",
                padding: "10px 0 10px",
                paddingLeft: i % 2 !== 0 ? "20px" : "0",
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#555" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1.5,5 4,7.5 8.5,2.5"/>
                </svg>
                <span style={{ fontSize: "11px", color: "#555", letterSpacing: "0.02em" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {showTicket && (
        <RegistrationTicket
          registrationData={currentData}
          onClose={() => setShowTicket(false)}
        />
      )}
    </>
  );
}