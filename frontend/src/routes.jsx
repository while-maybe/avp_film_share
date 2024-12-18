import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VideoList from "./pages/VideoList";
import Authorboard from "./pages/Authorboard";
import SignUp from "./pages/SignUp";
import NewVideo from "./pages/NewVideo";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/authorboard/:author" element={<Authorboard />} />
        <Route path="/videos" element={<VideoList />} />
        <Route path="/new" element={<NewVideo />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
