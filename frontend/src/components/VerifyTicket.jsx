import { useState, useRef, useEffect } from "react";
import { apiUrl } from "../config/api";
import { BrowserMultiFormatReader } from "@zxing/library";

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #111;
    font-family: 'DM Sans', sans-serif;
  }

  .verify-btn {
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
    padding: 12px 24px;
    cursor: pointer;
    justify-content: center;
    transition: border-color 0.15s, background 0.15s;
  }
  .verify-btn:hover:not(:disabled) {
    border-color: #f4efe4;
    background: rgba(244,239,228,0.05);
  }
  .verify-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

  #video-preview {
    width: 100%;
    max-width: 500px;
    height: auto;
    border: 2px solid #2a2a2a;
    background: #000;
  }
`;

const mono = { fontFamily: "'Share Tech Mono', monospace" };

function DataRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #1e1e1e", padding: "7px 0" }}>
      <span style={{ ...mono, fontSize: "9px", letterSpacing: "0.16em", color: "#555", textTransform: "uppercase" }}>{label}</span>
      <span style={{ ...mono, fontSize: "11px", color: "#888", wordBreak: "break-all" }}>{value}</span>
    </div>
  );
}

function VerifyTicket() {
  const [verificationData, setVerificationData] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [manualId, setManualId] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [scanning, setScanning] = useState(false);
  
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    setScanning(true);

    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);

        // Initialize ZXing code reader
        const codeReader = new BrowserMultiFormatReader();
        codeReaderRef.current = codeReader;

        // Start continuous scanning
        codeReader.decodeFromVideoElement(videoRef.current, (result, err) => {
          if (result) {
            const qrText = result.getText();
            console.log("QR Code detected:", qrText);
            handleQRScan(qrText);
            stopCamera();
          }
          if (err && err.name !== 'NotFoundException') {
            console.error("Scan error:", err);
          }
        });
      }
    } catch (err) {
      console.error("Camera error:", err);
      let errorMessage = "Failed to access camera. ";
      
      if (err.name === "NotAllowedError") {
        errorMessage += "Please allow camera permissions in your browser settings.";
      } else if (err.name === "NotFoundError") {
        errorMessage += "No camera found on this device.";
      } else if (err.name === "NotReadableError") {
        errorMessage += "Camera is already in use by another application.";
      } else {
        errorMessage += "Please check your camera settings and try again.";
      }
      
      setCameraError(errorMessage);
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    
    setCameraActive(false);
    setScanning(false);
  };

  const handleQRScan = (qrText) => {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(qrText);
      if (parsed.registrationId) {
        verifyRegistration(parsed.registrationId);
        return;
      }
    } catch {
      // If not JSON, treat as plain registration ID
      verifyRegistration(qrText);
    }
  };

  const verifyRegistration = async (registrationId) => {
    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch(apiUrl("/api/verify-registration"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      const result = await response.json();

      if (result.valid) {
        setVerificationData(result.data);
      } else {
        setError(result.message || "Registration not found");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Failed to verify registration. Please check your connection.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      verifyRegistration(manualId.trim());
    }
  };

  const resetVerification = () => {
    setVerificationData(null);
    setError(null);
    setManualId("");
    stopCamera();
  };

  return (
    <>
      <style>{fontImport}</style>

      <div style={{ minHeight: "100vh", background: "#111", padding: "48px 24px", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Page header ── */}
        <div style={{ maxWidth: "820px", margin: "0 auto 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #222", paddingBottom: "20px", marginBottom: "20px" }}>
            <div>
              <p style={{ ...mono, fontSize: "9px", letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", marginBottom: "8px" }}>
                Verification · Ticket Scanner
              </p>
              <h1 style={{ ...mono, fontSize: "clamp(22px, 4vw, 34px)", color: "#f4efe4", lineHeight: 1.1, fontWeight: 400 }}>
                Registration<br />Verification
              </h1>
            </div>
            <span className="tag">2AI-2026</span>
          </div>
          <p style={{ fontSize: "12px", color: "#555", letterSpacing: "0.03em", lineHeight: 1.6 }}>
            Scan QR code with camera or enter Registration ID manually to verify tickets.
          </p>
        </div>

        {/* ── Main Content ── */}
        {!verificationData && !error && (
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            
            {/* Camera Scanner */}
            <div style={{ border: "1px solid #222", background: "#161616", padding: "32px", marginBottom: "20px" }}>
              <div style={{ marginBottom: "24px" }}>
                <span style={{ ...mono, fontSize: "11px", letterSpacing: "0.18em", color: "#f4efe4", textTransform: "uppercase" }}>
                  Scan QR Code
                </span>
              </div>

              {/* Camera Error */}
              {cameraError && (
                <div style={{ 
                  background: "#1a1a0a", 
                  border: "1px solid #3a2a0a", 
                  padding: "16px", 
                  marginBottom: "20px",
                  borderLeft: "3px solid #7a5a2a"
                }}>
                  <p style={{ fontSize: "11px", color: "#9a7a5a", lineHeight: 1.6 }}>
                    ⚠ {cameraError}
                  </p>
                </div>
              )}

              {/* Video Preview */}
              {cameraActive && (
                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                  <video
                    ref={videoRef}
                    id="video-preview"
                    autoPlay
                    playsInline
                    muted
                  />
                  <p style={{ fontSize: "10px", color: "#555", marginTop: "12px", ...mono, letterSpacing: "0.12em" }}>
                    {scanning ? "SCANNING... POINT CAMERA AT QR CODE" : "CAMERA ACTIVE"}
                  </p>
                </div>
              )}

              {/* Camera Controls */}
              <div style={{ display: "flex", gap: "12px" }}>
                {!cameraActive ? (
                  <button
                    onClick={startCamera}
                    className="verify-btn"
                    style={{ flex: 1 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    Start Camera
                  </button>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="verify-btn"
                    style={{ flex: 1 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="6" width="12" height="12"/>
                    </svg>
                    Stop Camera
                  </button>
                )}
              </div>
            </div>

            {/* Manual Entry Card */}
            <div style={{ border: "1px solid #1e1e1e", padding: "32px" }}>
              <div style={{ marginBottom: "24px" }}>
                <span style={{ ...mono, fontSize: "11px", letterSpacing: "0.18em", color: "#888", textTransform: "uppercase" }}>
                  Or Enter Registration ID
                </span>
              </div>

              <form onSubmit={handleManualVerify}>
                <div style={{ marginBottom: "20px" }}>
                  <input
                    type="text"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="e.g., 2AI-2026-ABCD1234"
                    style={{
                      width: "100%",
                      background: "#0a0a0a",
                      border: "1px solid #2a2a2a",
                      color: "#f4efe4",
                      padding: "14px 16px",
                      ...mono,
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                      outline: "none",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#444"}
                    onBlur={(e) => e.target.style.borderColor = "#2a2a2a"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || !manualId.trim()}
                  className="verify-btn"
                  style={{ width: "100%" }}
                >
                  {isVerifying ? (
                    <>
                      <svg style={{ animation: "spin 1s linear infinite" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                      </svg>
                      Verify Registration
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Verification Success ── */}
        {verificationData && (
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ border: "2px solid #2a7a2a", background: "#0a1a0a", padding: "32px", marginBottom: "20px" }}>
              
              {/* Success Header */}
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <div style={{ 
                  width: "60px", height: "60px", 
                  border: "2px solid #2a7a2a", 
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a9a4a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 style={{ ...mono, fontSize: "18px", color: "#4a9a4a", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Valid Registration
                </h2>
                <p style={{ fontSize: "11px", color: "#555" }}>
                  Ticket verified successfully
                </p>
              </div>

              {/* Registration Details */}
              <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", padding: "24px", marginBottom: "24px" }}>
                <DataRow label="Reg ID" value={verificationData.registrationId} />
                <DataRow label="Name" value={verificationData.fullName} />
                <DataRow label="Email" value={verificationData.email} />
                <DataRow label="Type" value={verificationData.participantType} />
                <DataRow label="Affiliation" value={verificationData.affiliation} />
                <DataRow label="Designation" value={verificationData.designation} />
                {verificationData.paperId && (
                  <>
                    <DataRow label="Paper ID" value={verificationData.paperId} />
                    <div style={{ borderBottom: "1px solid #1e1e1e", padding: "7px 0" }}>
                      <span style={{ ...mono, fontSize: "9px", letterSpacing: "0.16em", color: "#555", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Paper Title</span>
                      <span style={{ fontSize: "11px", color: "#888" }}>{verificationData.paperTitle}</span>
                    </div>
                  </>
                )}
                <DataRow label="Registered" value={new Date(verificationData.registeredAt).toLocaleDateString()} />
              </div>

              <button onClick={resetVerification} className="verify-btn" style={{ width: "100%" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
                Verify Another Ticket
              </button>
            </div>
          </div>
        )}

        {/* ── Verification Error ── */}
        {error && (
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ border: "2px solid #7a2a2a", background: "#1a0a0a", padding: "32px", marginBottom: "20px" }}>
              
              {/* Error Header */}
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ 
                  width: "60px", height: "60px", 
                  border: "2px solid #7a2a2a", 
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9a4a4a" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </div>
                <h2 style={{ ...mono, fontSize: "18px", color: "#9a4a4a", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Invalid Registration
                </h2>
                <p style={{ fontSize: "11px", color: "#666", marginTop: "12px" }}>
                  {error}
                </p>
              </div>

              <button onClick={resetVerification} className="verify-btn" style={{ width: "100%" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default VerifyTicket;
