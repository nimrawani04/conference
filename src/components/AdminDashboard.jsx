import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import RegistrationTicket from "./RegistrationTicket";
import { invokeEdge } from "../lib/supabaseFunctions";
import { clearAdminToken, getAdminToken } from "../lib/adminSession";
import { startGatewayCheckout } from "./PaymentGateway";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return String(iso);
  }
}

function formatFee(usd, inr) {
  const u = usd != null && usd !== "" ? Number(usd) : null;
  const i = inr != null && inr !== "" ? Number(inr) : null;
  const parts = [];
  if (u != null && !Number.isNaN(u)) parts.push(`$${u}`);
  if (i != null && !Number.isNaN(i) && i > 0) parts.push(`₹${i}`);
  return parts.length ? parts.join(" / ") : "—";
}

/** Map DB row from admin-registrations to RegistrationTicket props */
function rowToTicketData(r) {
  const usd = Number(r.total_fee_usd);
  const inr = Number(r.total_fee_inr);
  return {
    registrationId: r.registration_id,
    fullName: r.full_name,
    email: r.email || "",
    affiliation: r.affiliation || "",
    designation: r.designation || "",
    country: r.country || "",
    participantType: r.participant_type || "Participant",
    paperId: r.paper_id || "",
    paperTitle: r.paper_title || "",
    numAuthors: r.num_authors != null && r.num_authors !== "" ? String(r.num_authors) : "",
    attendWorkshop: r.attend_workshop || "",
    attendanceMode: r.attendance_mode || "",
    modeOfPayment: r.mode_of_payment || "",
    transactionId: r.transaction_id || "",
    totalFeeUSD: Number.isFinite(usd) ? usd : 0,
    totalFeeINR: Number.isFinite(inr) ? inr : 0,
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");
  const [username, setUsername] = useState("");
  const [regs, setRegs] = useState([]);
  const [regsLoading, setRegsLoading] = useState(false);
  const [regsError, setRegsError] = useState("");
  const [query, setQuery] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [deleteBusyId, setDeleteBusyId] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [editForm, setEditForm] = useState(null);
  const [editSaving, setEditSaving] = useState(false);
  const [testPayBusy, setTestPayBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getAdminToken();
      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }
      try {
        const result = await invokeEdge("admin-verify", { token });
        if (cancelled) return;
        if (result?.valid) {
          setUsername(result.username || "");
          setStatus("ok");
        } else {
          clearAdminToken();
          navigate("/admin/login", { replace: true });
        }
      } catch {
        if (!cancelled) {
          clearAdminToken();
          navigate("/admin/login", { replace: true });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (status !== "ok") return;
    let cancelled = false;
    (async () => {
      const token = getAdminToken();
      if (!token) return;
      setRegsLoading(true);
      setRegsError("");
      try {
        const result = await invokeEdge("admin-registrations", { token });
        if (cancelled) return;
        if (result?.success && Array.isArray(result.registrations)) {
          setRegs(result.registrations);
        } else {
          setRegsError(result?.msg || "Could not load registrations");
        }
      } catch (e) {
        if (!cancelled) setRegsError(e?.message || "Could not load registrations");
      } finally {
        if (!cancelled) setRegsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return regs;
    return regs.filter((r) => {
      const blob = [
        r.registration_id,
        r.full_name,
        r.email,
        r.participant_type,
        r.paper_id,
        r.transaction_id,
        r.attendance_mode,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [regs, query]);

  const logout = () => {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  };

  const openEdit = (r) => {
    setActionMsg("");
    setEditForm({
      registration_id: r.registration_id,
      full_name: r.full_name ?? "",
      email: r.email ?? "",
      affiliation: r.affiliation ?? "",
      designation: r.designation ?? "",
      country: r.country ?? "",
      contact_number: r.contact_number ?? "",
      participant_type: r.participant_type ?? "",
      paper_id: r.paper_id ?? "",
      paper_title: r.paper_title ?? "",
      num_authors:
        r.num_authors != null && r.num_authors !== "" ? String(r.num_authors) : "",
      sub_category: r.sub_category ?? "",
      region: r.region ?? "",
      attendance_mode: r.attendance_mode ?? "",
      attend_workshop: r.attend_workshop ?? "",
      total_fee_usd:
        r.total_fee_usd != null && r.total_fee_usd !== "" ? String(r.total_fee_usd) : "",
      total_fee_inr:
        r.total_fee_inr != null && r.total_fee_inr !== "" ? String(r.total_fee_inr) : "",
      mode_of_payment: r.mode_of_payment ?? "",
      transaction_id: r.transaction_id ?? "",
      date_of_payment: r.date_of_payment ? String(r.date_of_payment).slice(0, 10) : "",
      payment_verified: !!r.payment_verified,
    });
  };

  const saveEdit = async () => {
    if (!editForm) return;
    setActionMsg("");
    const token = getAdminToken();
    if (!token) return;
    setEditSaving(true);
    try {
      const result = await invokeEdge("admin-update-registration", {
        token,
        registration_id: editForm.registration_id,
        full_name: editForm.full_name,
        email: editForm.email,
        affiliation: editForm.affiliation,
        designation: editForm.designation,
        country: editForm.country,
        contact_number: editForm.contact_number,
        participant_type: editForm.participant_type,
        paper_id: editForm.paper_id,
        paper_title: editForm.paper_title,
        num_authors: editForm.num_authors,
        sub_category: editForm.sub_category,
        region: editForm.region,
        attendance_mode: editForm.attendance_mode,
        attend_workshop: editForm.attend_workshop,
        total_fee_usd: editForm.total_fee_usd,
        total_fee_inr: editForm.total_fee_inr,
        mode_of_payment: editForm.mode_of_payment,
        transaction_id: editForm.transaction_id,
        date_of_payment: editForm.date_of_payment,
        payment_verified: editForm.payment_verified,
      });
      if (result?.success && result.registration) {
        const updated = result.registration;
        setRegs((prev) =>
          prev.map((x) =>
            x.registration_id === updated.registration_id ? { ...x, ...updated } : x,
          ),
        );
        setTicketData((cur) => {
          if (!cur || cur.registrationId !== updated.registration_id) return cur;
          return rowToTicketData(updated);
        });
        setEditForm(null);
      } else {
        setActionMsg(result?.msg || "Could not save changes");
      }
    } catch (e) {
      setActionMsg(e?.message || "Could not save changes");
    } finally {
      setEditSaving(false);
    }
  };

  const deleteRegistration = async (r) => {
    const ok = window.confirm(
      `Delete registration ${r.registration_id} for ${r.full_name}? This cannot be undone.`,
    );
    if (!ok) return;
    setActionMsg("");
    const token = getAdminToken();
    if (!token) return;
    setDeleteBusyId(r.registration_id);
    try {
      const result = await invokeEdge("admin-delete-registration", {
        token,
        registration_id: r.registration_id,
      });
      if (result?.success) {
        setRegs((prev) => prev.filter((x) => x.registration_id !== r.registration_id));
        setTicketData((cur) => (cur?.registrationId === r.registration_id ? null : cur));
      } else {
        setActionMsg(result?.msg || "Could not delete registration");
      }
    } catch (e) {
      setActionMsg(e?.message || "Could not delete registration");
    } finally {
      setDeleteBusyId("");
    }
  };

  const startOneRupeeTestPayment = async () => {
    setActionMsg("");
    setTestPayBusy(true);
    try {
      const stamp = Date.now();
      const testRegistrationData = {
        fullName: "Nimra Wani",
        affiliation: "2AI Admin QA",
        designation: "QA Engineer",
        country: "India",
        email: `mb4milad.bhattt@gmail.com`,
        contactNumber: "9999999999",
        participantType: "Test",
        paperId: `TEST-${String(stamp).slice(-6)}`,
        paperTitle: "Admin Payment Flow Test",
        numAuthors: "1",
        subCategory: "Test",
        region: "South Asian",
        attendWorkshop: "No",
        totalFeeUsd: "0",
        totalFeeInr: "1",
        modeOfPayment: "ICICI Eazypay",
        declaration: true,
      };

      sessionStorage.setItem("pendingRegistration", JSON.stringify(testRegistrationData));
      await startGatewayCheckout({
        amount: 1,
        currency: "INR",
        registrationData: testRegistrationData,
      });
    } catch (e) {
      setActionMsg(e?.message || "Could not start ₹1 test payment");
      setTestPayBusy(false);
    }
  };

  if (status === "checking") {
    return (
      <PageLayout title="Admin" subtitle="">
        <p className="text-center text-gray-600 py-12">Verifying session…</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Admin" subtitle="2AI Conference">
      {ticketData && (
        <RegistrationTicket registrationData={ticketData} onClose={() => setTicketData(null)} />
      )}
      {editForm && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-edit-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 border-0 cursor-default"
            aria-label="Close edit dialog"
            onClick={() => !editSaving && setEditForm(null)}
          />
          <div className="relative bg-white rounded-t-2xl sm:rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 shrink-0">
              <h2 id="admin-edit-title" className="text-lg font-bold text-gray-900">
                Edit registration
              </h2>
              <button
                type="button"
                disabled={editSaving}
                onClick={() => setEditForm(null)}
                className="text-gray-500 hover:text-gray-800 p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 space-y-4">
              <p className="text-xs text-gray-500 font-mono">
                ID: <span className="text-[#2c5aa0]">{editForm.registration_id}</span>
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold text-gray-600">Full name *</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.full_name}
                    onChange={(e) => setEditForm((f) => ({ ...f, full_name: e.target.value }))}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold text-gray-600">Affiliation *</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.affiliation}
                    onChange={(e) => setEditForm((f) => ({ ...f, affiliation: e.target.value }))}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold text-gray-600">Email</span>
                  <input
                    type="email"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.email}
                    onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Designation</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.designation}
                    onChange={(e) => setEditForm((f) => ({ ...f, designation: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Country</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.country}
                    onChange={(e) => setEditForm((f) => ({ ...f, country: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Contact number</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.contact_number}
                    onChange={(e) => setEditForm((f) => ({ ...f, contact_number: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Participant type</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.participant_type}
                    onChange={(e) => setEditForm((f) => ({ ...f, participant_type: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Paper ID</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.paper_id}
                    onChange={(e) => setEditForm((f) => ({ ...f, paper_id: e.target.value }))}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold text-gray-600">Paper title</span>
                  <textarea
                    rows={2}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none resize-y"
                    value={editForm.paper_title}
                    onChange={(e) => setEditForm((f) => ({ ...f, paper_title: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Number of authors</span>
                  <input
                    inputMode="numeric"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.num_authors}
                    onChange={(e) => setEditForm((f) => ({ ...f, num_authors: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Sub-category</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.sub_category}
                    onChange={(e) => setEditForm((f) => ({ ...f, sub_category: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Region</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.region}
                    onChange={(e) => setEditForm((f) => ({ ...f, region: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Attend workshop</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.attend_workshop}
                    onChange={(e) => setEditForm((f) => ({ ...f, attend_workshop: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Attendance mode</span>
                  <select
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.attendance_mode}
                    onChange={(e) => setEditForm((f) => ({ ...f, attendance_mode: e.target.value }))}
                  >
                    <option value="">Select mode</option>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Fee (USD)</span>
                  <input
                    inputMode="decimal"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.total_fee_usd}
                    onChange={(e) => setEditForm((f) => ({ ...f, total_fee_usd: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Fee (INR)</span>
                  <input
                    inputMode="decimal"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.total_fee_inr}
                    onChange={(e) => setEditForm((f) => ({ ...f, total_fee_inr: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Mode of payment</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.mode_of_payment}
                    onChange={(e) => setEditForm((f) => ({ ...f, mode_of_payment: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Transaction ID</span>
                  <input
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.transaction_id}
                    onChange={(e) => setEditForm((f) => ({ ...f, transaction_id: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-600">Date of payment</span>
                  <input
                    type="date"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
                    value={editForm.date_of_payment}
                    onChange={(e) => setEditForm((f) => ({ ...f, date_of_payment: e.target.value }))}
                  />
                </label>
                <label className="flex items-center gap-2 sm:col-span-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#2c5aa0] focus:ring-[#2c5aa0]"
                    checked={editForm.payment_verified}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, payment_verified: e.target.checked }))
                    }
                  />
                  <span className="text-sm font-medium text-gray-800">Payment verified</span>
                </label>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-gray-100 flex flex-wrap justify-end gap-2 shrink-0 bg-gray-50/80">
              <button
                type="button"
                disabled={editSaving}
                onClick={() => setEditForm(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-medium text-sm hover:bg-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={editSaving}
                onClick={saveEdit}
                className="px-4 py-2 rounded-lg bg-[#2c5aa0] text-white font-medium text-sm hover:bg-[#234a85] disabled:opacity-50"
              >
                {editSaving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto space-y-8 px-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-700">
              Signed in as{" "}
              <span className="font-mono font-semibold text-[#2c5aa0]">{username || "admin"}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {regsLoading ? "Loading registrations…" : `${regs.length} registration(s) loaded`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={testPayBusy}
              onClick={startOneRupeeTestPayment}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-50 transition text-sm"
            >
              {testPayBusy ? "Starting test payment…" : "Test payment (₹1)"}
            </button>
            <Link
              to="/verify-ticket"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#2c5aa0] text-white font-medium hover:bg-[#234a85] transition text-sm"
            >
              Verify ticket / QR
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-50 transition text-sm"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-gray-800">All registrations</h2>
            <input
              type="search"
              placeholder="Filter by name, ID, email, paper ID…"
              className="w-full sm:max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c5aa0] focus:border-[#2c5aa0] outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {regsError && (
            <div className="p-4 text-sm text-red-700 bg-red-50 border-b border-red-100">{regsError}</div>
          )}
          {actionMsg && (
            <div className="p-4 text-sm text-red-700 bg-red-50 border-b border-red-100">{actionMsg}</div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1024px]">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-3 py-3 whitespace-nowrap">Registration ID</th>
                  <th className="px-3 py-3 whitespace-nowrap">Name</th>
                  <th className="px-3 py-3 whitespace-nowrap">Email</th>
                  <th className="px-3 py-3 whitespace-nowrap">Type</th>
                  <th className="px-3 py-3 whitespace-nowrap">Attendance</th>
                  <th className="px-3 py-3 whitespace-nowrap">Fee</th>
                  <th className="px-3 py-3 whitespace-nowrap">Paid</th>
                  <th className="px-3 py-3 whitespace-nowrap">Registered</th>
                  <th className="px-3 py-3 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 && !regsLoading ? (
                  <tr>
                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                      {regs.length === 0 ? "No registrations yet." : "No rows match your filter."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.registration_id} className="hover:bg-gray-50/80">
                      <td className="px-3 py-2.5 font-mono text-xs text-[#2c5aa0]">
                        {r.registration_id}
                      </td>
                      <td className="px-3 py-2.5 text-gray-900">{r.full_name}</td>
                      <td className="px-3 py-2.5 text-gray-600 max-w-[200px] truncate" title={r.email}>
                        {r.email}
                      </td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                        {r.participant_type || "—"}
                      </td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                        {r.attendance_mode || "—"}
                      </td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                        {formatFee(r.total_fee_usd, r.total_fee_inr)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        {r.payment_verified ? (
                          <span className="text-green-700 font-medium">Yes</span>
                        ) : (
                          <span className="text-amber-700">Pending</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap text-xs">
                        {formatDate(r.created_at)}
                      </td>
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">
                        <div className="inline-flex flex-wrap items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEdit(r)}
                            className="px-2.5 py-1 rounded-md text-xs font-medium border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 transition"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setTicketData(rowToTicketData(r))}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#2c5aa0] text-white hover:bg-[#234a85] transition"
                          >
                            Show ticket
                          </button>
                          <button
                            type="button"
                            disabled={deleteBusyId === r.registration_id}
                            onClick={() => deleteRegistration(r)}
                            className="px-2.5 py-1 rounded-md text-xs font-medium border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition"
                          >
                            {deleteBusyId === r.registration_id ? "Deleting…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          <Link to="/" className="hover:text-[#2c5aa0]">
            ← Home
          </Link>
        </p>
      </div>
    </PageLayout>
  );
}
