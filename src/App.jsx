import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Chatbot from "./components/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/reports" element={<ReportList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>

      <Footer />
      <Chatbot/>
    </Router>
  );
}

export default App;
