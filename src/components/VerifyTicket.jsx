import { useState, useRef, useEffect, useCallback } from "react";
import { invokeEdge } from "../lib/supabaseFunctions";
import { Html5Qrcode } from "html5-qrcode";

const QR_READER_ELEMENT_ID = "verify-ticket-html5-qr-reader";

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

  const html5QrRef = useRef(null);
  const handleQRScanRef = useRef(() => {});

  const disposeScanner = useCallback(async () => {
    const scanner = html5QrRef.current;
    html5QrRef.current = null;
    if (!scanner) return;
    try {
      if (scanner.isScanning) {
        await scanner.stop();
      }
      scanner.clear();
    } catch (e) {
      console.warn("Scanner dispose:", e);
    }
  }, []);

  /** html5-qrcode works reliably on mobile; ZXing decodeFromVideoElement often never decodes on iOS/Android. */
  useEffect(() => {
    if (!cameraActive) return;

    let cancelled = false;

    const scanConfig = {
      fps: 10,
      aspectRatio: 1,
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const edge = Math.min(viewfinderWidth, viewfinderHeight);
        const size = Math.max(140, Math.floor(edge * 0.72));
        return { width: size, height: size };
      },
      videoConstraints: {
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    };

    const startScanner = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError(
          "Camera API not supported in this browser. Use Chrome, Safari, or Firefox, or enter the ID below.",
        );
        setCameraActive(false);
        return;
      }

      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (cancelled) return;

      const el = document.getElementById(QR_READER_ELEMENT_ID);
      if (!el) {
        setCameraError("Scanner could not start. Try again.");
        setCameraActive(false);
        return;
      }

      const scanner = new Html5Qrcode(QR_READER_ELEMENT_ID, {
        verbose: false,
        useBarCodeDetectorIfSupported: true,
      });
      html5QrRef.current = scanner;

      const onSuccess = async (decodedText) => {
        if (cancelled) return;
        await disposeScanner();
        setCameraActive(false);
        setScanning(false);
        handleQRScanRef.current(decodedText);
      };

      const onError = () => {
        /* no QR in frame — expected every frame */
      };

      try {
        await scanner.start(
          { facingMode: "environment" },
          scanConfig,
          onSuccess,
          onError,
        );
        if (cancelled) {
          await disposeScanner();
          return;
        }
        setScanning(true);
        setCameraError(null);
      } catch (firstErr) {
        console.warn("Camera start (environment):", firstErr);
        try {
          try {
            scanner.clear();
          } catch {
            /* ignore */
          }
          const cameras = await Html5Qrcode.getCameras();
          if (cancelled || cameras.length === 0) throw firstErr;
          const back =
            cameras.find((c) => /back|rear|environment|wide/i.test(c.label)) ??
            cameras[cameras.length - 1];
          await scanner.start(back.id, scanConfig, onSuccess, onError);
          if (cancelled) {
            await disposeScanner();
            return;
          }
          setScanning(true);
          setCameraError(null);
        } catch (e) {
          console.error("Camera error:", e);
          html5QrRef.current = null;
          let errorMessage = "Failed to access camera. ";
          if (e?.name === "NotAllowedError") {
            errorMessage += "Allow camera in browser settings.";
          } else if (e?.name === "NotFoundError") {
            errorMessage += "No camera found.";
          } else if (e?.name === "NotReadableError") {
            errorMessage += "Camera may be in use by another app.";
          } else {
            errorMessage += e?.message || "Try again or use manual entry below.";
          }
          setCameraError(errorMessage);
          setCameraActive(false);
          setScanning(false);
        }
      }
    };

    void startScanner();

    return () => {
      cancelled = true;
      void disposeScanner();
      setScanning(false);
    };
  }, [cameraActive, disposeScanner]);

  const startCamera = () => {
    setCameraError(null);
    setScanning(false);
    setCameraActive(true);
  };

  const stopCamera = () => {
    void disposeScanner();
    setCameraActive(false);
    setScanning(false);
  };

  const verifyRegistration = useCallback(async (registrationId) => {
    setIsVerifying(true);
    setError(null);

    try {
      const result = await invokeEdge("verify-registration", { registrationId });

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
  }, []);

  const handleQRScan = useCallback(
    (qrText) => {
      try {
        const parsed = JSON.parse(qrText);
        if (parsed.registrationId) {
          verifyRegistration(parsed.registrationId);
          return;
        }
      } catch {
        verifyRegistration(qrText.trim());
      }
    },
    [verifyRegistration],
  );

  handleQRScanRef.current = handleQRScan;

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
      <style>{`
        #verify-ticket-html5-qr-reader {
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
        }
        
        #verify-ticket-html5-qr-reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          display: block !important;
          border-radius: 8px;
        }
        
        #verify-ticket-html5-qr-reader__dashboard_section {
          display: none !important;
        }
        
        #verify-ticket-html5-qr-reader__scan_region {
          width: 100% !important;
          height: 100% !important;
        }
        
        #verify-ticket-html5-qr-reader__dashboard_section_csr {
          display: none !important;
        }
      `}</style>

      <div style={{ minHeight: "calc(100vh - 400px)", background: "#111", padding: "48px 24px 80px", fontFamily: "'DM Sans', sans-serif" }}>

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
              <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...mono, fontSize: "11px", letterSpacing: "0.18em", color: "#f4efe4", textTransform: "uppercase" }}>
                  Scan QR Code
                </span>
                {cameraActive && (
                  <span style={{ 
                    ...mono, 
                    fontSize: "9px", 
                    letterSpacing: "0.12em", 
                    color: "#4a9a4a", 
                    background: "#0a1a0a",
                    padding: "4px 12px",
                    border: "1px solid #2a7a2a",
                    textTransform: "uppercase"
                  }}>
                    ● LIVE
                  </span>
                )}
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

              {/* 1:1 scanner viewport (html5-qrcode draws video + shaded region like native QR apps) */}
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <div
                  style={{
                    width: "min(100%, 92vw)",
                    maxWidth: 420,
                    aspectRatio: "1",
                    margin: "0 auto",
                    position: "relative",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "2px solid #333",
                    background: "#000",
                    display: cameraActive ? "block" : "none",
                  }}
                >
                  <div
                    id={QR_READER_ELEMENT_ID}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      minHeight: 300,
                      position: "relative"
                    }}
                  />
                </div>
                {cameraActive && (
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#666",
                      marginTop: "14px",
                      ...mono,
                      letterSpacing: "0.1em",
                      lineHeight: 1.5,
                      maxWidth: 360,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {scanning
                      ? "Fit the QR inside the green square. Hold 15–25 cm away; avoid glare."
                      : "Starting camera…"}
                  </p>
                )}
              </div>

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
                <DataRow label="Attendance" value={verificationData.attendanceMode || "—"} />
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
