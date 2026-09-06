import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import Register from "./pages/auth/Register";
import BuyerMarketplace from "./pages/buyer/BuyerMarketplace";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/buyer/Cart";
import Orders from "./pages/buyer/Orders";
import DriverDashboard from "./pages/driver/DriverDashboard";
function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/buyer" element={<BuyerMarketplace />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;