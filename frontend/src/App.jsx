import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import SpecialSessions from "./components/SpecialSessions"
import Sponsors from "./components/Sponsors";
import TicketTest from "./components/TicketTest";
import VerifyTicket from "./components/VerifyTicket";
import PaymentCallback from "./components/PaymentCallback";
import RegistrationSuccess from "./components/RegistrationSuccess";

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/call-for-papers" element={<CallForPapers />} />
        <Route path="/committee/SteeringCommitte" element={<SteeringCommitte />} />
        <Route path="/committee/OrganizingCommitte" element={<OrganizingCommitte />} />
        <Route path="/sessions/workshops" element={<Workshops />} />
        <Route path="/sessions/specialSessions" element={<SpecialSessions />} />
        <Route path="/KeyNotes" element={<KeyNotes />} />
        <Route path="/ticket-test" element={<TicketTest />} />
        <Route path="/verify-ticket" element={<VerifyTicket />} />
        <Route path="/payment-callback" element={<PaymentCallback />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;