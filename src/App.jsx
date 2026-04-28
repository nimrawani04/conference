import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Committee from "./components/Committe";
import Schedule from "./components/Schedule";
import Workshops from "./components/Workshops";
import KeyNotes from "./components/KeyNotes";
import Registration from "./components/Registration";
import Contact from "./components/Contact";
import CallForPapers from "./components/CallForPapers";
import SteeringCommitte from "./components/SteeringCommitte";
import OrganizingCommitte from "./components/OrganizingCommitte";
import TechnicalCommittee from "./components/TechnicalCommitte";
import SpecialSessions from "./components/SpecialSessions"
import Sponsors from "./components/Sponsors";
import VerifyTicket from "./components/VerifyTicket";
import PaymentCallback from "./components/PaymentCallback";
import RegistrationSuccess from "./components/RegistrationSuccess";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import TestRegistration from "./components/TestRegistration";
import ConferenceRulesAndPolicies from "./components/ConferenceRulesAndPolicies";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent";
import OptionalScripts from "./components/OptionalScripts";

const testRegistrationEnabled =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_TEST_REGISTRATION === "true";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/rules-and-policies" element={<ConferenceRulesAndPolicies />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/call-for-papers" element={<CallForPapers />} />
        <Route path="/committee/SteeringCommitte" element={<SteeringCommitte />} />
        <Route path="/committee/OrganizingCommitte" element={<OrganizingCommitte />} />
        <Route path="/committee/TechnicalCommitte" element={<TechnicalCommittee />} />
        <Route path="/sessions/workshop" element={<Workshops />} />
        <Route path="/sessions/workshops" element={<Navigate to="/sessions/workshop" replace />} />
        <Route path="/sessions/specialSessions" element={<SpecialSessions />} />
        <Route path="/KeyNotes" element={<KeyNotes />} />
        <Route path="/verify-ticket" element={<VerifyTicket />} />
        <Route path="/payment-callback" element={<PaymentCallback />} />
        <Route path="/payment_callback" element={<PaymentCallback />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/test-registration"
          element={
            testRegistrationEnabled ? <TestRegistration /> : <Navigate to="/" replace />
          }
        />
      </Routes>
      <OptionalScripts />
      <CookieConsent />
      <Footer />
    </Router>
  );
}

export default App;