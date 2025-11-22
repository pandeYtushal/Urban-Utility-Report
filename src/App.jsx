import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ReportForm from "./components/ReportForm";
import ReportsList from "./components/ReportList"; 
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useUser } from "./context/UserContext";
import Chatbot from "./components/Chatbot";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { user } = useUser();

  return (
    <Router>
      {user && <Navbar />}

      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />}/>
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />}/>
        <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/report" element={<ProtectedRoute><ReportForm /></ProtectedRoute>}/>
        <Route path="/reports" element={ <ProtectedRoute> <ReportsList /> </ProtectedRoute>}/>
        <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="/edit-profile"element={<ProtectedRoute><EditProfile /></ProtectedRoute>}/>
      </Routes>


      <Chatbot />

      
      {user && <Footer />}
    </Router>
  );
}
