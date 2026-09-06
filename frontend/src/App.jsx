import AddProduct from "./pages/farmer/AddProduct";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/farmer/add-product" element={<AddProduct />} />

        <Route path="/buyer" element={<BuyerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;