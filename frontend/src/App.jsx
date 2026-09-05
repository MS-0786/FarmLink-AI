import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;