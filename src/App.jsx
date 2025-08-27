import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import Dashboard from "./Components/Dashboard";
import "./index.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home"
import Plans from "./pages/Plans";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chatbot from "./Components/Chatbot";
import About from "./pages/About";

export default function App() {
  return (
    <AuthProvider>
      <div className="main-content">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
        <About/>
        <Chatbot/>
        <Footer/>
      </div>
      
    </AuthProvider>
  );
}
