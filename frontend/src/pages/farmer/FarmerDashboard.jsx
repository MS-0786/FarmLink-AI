import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FarmerDashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const navigate = useNavigate();

  // Load logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch farmer's products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch farmer's orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      const currentUser = JSON.parse(storedUser);

      const response = await fetch(
        `http://localhost:5000/api/products?farmerId=${currentUser.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders for current farmer
  const fetchOrders = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setOrdersLoading(false);
        return;
      }

      const currentUser = JSON.parse(storedUser);

      const response = await fetch(
        `http://localhost:5000/api/orders/farmer/${currentUser.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Calculate total earnings
  const totalEarnings = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-700">
            FarmLink AI 🌾
          </h1>

          <p className="text-sm text-gray-500">
            Farmer Dashboard
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name || "Farmer"} 👋
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your products and sell directly to buyers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Total Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500">
              Total Products
            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              {products.length}
            </h3>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500">
              Total Orders
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {orders.length}
            </h3>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="text-gray-500">
              Total Earnings
            </p>

            <h3 className="text-3xl font-bold text-orange-600 mt-2">
              ₹{totalEarnings}
            </h3>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/farmer/add-product")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              + Add Product
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("orders-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View Orders
            </button>

          </div>

        </div>

        {/* Orders Section */}
        <div
          id="orders-section"
          className="bg-white rounded-2xl shadow-sm border p-6 mb-8"
        >

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Recent Orders
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Orders received from buyers
            </p>
          </div>

          {/* Loading Orders */}
          {ordersLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Loading orders...
              </p>
            </div>
          )}

          {/* No Orders */}
          {!ordersLoading && orders.length === 0 && (
            <div className="text-center py-8">

              <div className="text-5xl mb-4">
                📦
              </div>

              <h4 className="text-lg font-semibold text-gray-700">
                No orders yet
              </h4>

              <p className="text-gray-500 mt-2">
                Orders from buyers will appear here.
              </p>

            </div>
          )}

          {/* Orders List */}
          {!ordersLoading && orders.length > 0 && (
            <div className="space-y-4">

              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-xl p-5 hover:shadow-md transition"
                >

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                    {/* Order Information */}
                    <div>

                      <h4 className="text-lg font-bold text-gray-800">
                        {order.cropName}
                      </h4>

                      <p className="text-gray-600 mt-1">
                        Buyer:{" "}
                        <strong>
                          {order.buyerName}
                        </strong>
                      </p>

                      <p className="text-gray-600">
                        Quantity: {order.quantity} kg
                      </p>

                      <p className="text-gray-600">
                        Price: ₹{order.pricePerKg}/kg
                      </p>

                    </div>

                    {/* Order Price & Status */}
                    <div className="text-left md:text-right">

                      <p className="text-xl font-bold text-green-700">
                        ₹{order.totalPrice}
                      </p>

                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                        {order.status}
                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* My Products */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              My Products
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Products listed for buyers
            </p>
          </div>

          {/* Loading Products */}
          {loading && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Loading products...
              </p>
            </div>
          )}

          {/* No Products */}
          {!loading && products.length === 0 && (
            <div className="text-center py-12">

              <div className="text-5xl mb-4">
                🌱
              </div>

              <h4 className="text-lg font-semibold text-gray-700">
                No products added yet
              </h4>

              <p className="text-gray-500 mt-2">
                Add your first product and start selling directly.
              </p>

              <button
                onClick={() => navigate("/farmer/add-product")}
                className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Add Your First Product
              </button>

            </div>
          )}

          {/* Products */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-xl p-5 hover:shadow-md transition"
                >

                  {/* Image */}
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.cropName}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 bg-green-50 rounded-lg flex items-center justify-center text-5xl mb-4">
                      🌾
                    </div>
                  )}

                  <h4 className="text-xl font-bold text-gray-800">
                    {product.cropName}
                  </h4>

                  <p className="text-gray-500 mt-2">
                    Quantity: {product.quantity} {product.unit}
                  </p>

                  <p className="text-green-700 font-bold text-lg mt-2">
                    ₹{product.pricePerKg} / kg
                  </p>

                  <p className="text-gray-500 mt-2">
                    📍 {product.location}
                  </p>

                  <p className="text-sm text-gray-400 mt-3">
                    Farmer: {product.farmerName}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default FarmerDashboard;