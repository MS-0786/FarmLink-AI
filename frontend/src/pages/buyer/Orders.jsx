import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
const driverIcon = L.divIcon({
  html: "🚚",
  className: "",
  iconSize: [35, 35],
  iconAnchor: [17, 17],
});

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders"
          );
        }

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

      fetchOrders();

const interval = setInterval(fetchOrders, 5000);

return () => {
  clearInterval(interval);
};
}, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b bg-white px-6 py-4">
          <h1 className="text-xl font-bold text-emerald-950">
            FarmLink AI 🌾
          </h1>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <p className="text-slate-500">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
              🌾
            </div>

            <div>
              <h1 className="text-xl font-bold text-emerald-950">
                FarmLink AI
              </h1>

              <p className="text-xs text-slate-500">
                Fresh • Direct • Trusted
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/buyer")}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            🛒 Marketplace
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Page heading */}
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            ORDER HISTORY
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            My Orders 📦
          </h2>

          <p className="mt-2 text-slate-500">
            Track your purchases directly from farmers.
          </p>
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">📦</div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No orders yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Your purchased products will appear here.
            </p>

            <button
              onClick={() => navigate("/buyer")}
              className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Browse Marketplace
            </button>

          </div>
        ) : (
          <div className="mt-8 space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >

                {/* Order header */}
                <div className="flex flex-col gap-4 border-b bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Order ID
                    </p>

                    <h3 className="mt-1 font-bold text-slate-900">
                      #{order._id.slice(-8).toUpperCase()}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Products */}
                <div className="px-6 py-5">

                  <p className="mb-4 text-sm font-semibold text-slate-700">
                    Products
                  </p>

                  <div className="space-y-4">

                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >

                        <div className="flex items-center gap-4">

                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-3xl">
                            🌱
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-900">
                              {product.cropName}
                            </h4>

                            <p className="mt-1 text-sm text-slate-500">
                              👨‍🌾 {product.farmerName}
                            </p>
                          </div>

                        </div>

                        <div className="flex items-center gap-8 text-sm">

                          <div>
                            <p className="text-xs text-slate-400">
                              Quantity
                            </p>

                            <p className="mt-1 font-semibold text-slate-700">
                              {product.quantity} kg
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Price
                            </p>

                            <p className="mt-1 font-semibold text-slate-700">
                              ₹{product.pricePerKg}/kg
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Total
                            </p>

                            <p className="mt-1 font-bold text-emerald-600">
                              ₹{product.totalPrice}
                            </p>
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>
    {/* Live Driver Tracking */}
{order.status === "In Transit" && order.driverLocation && (
  <div className="mt-6 border-t pt-6">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-emerald-600">
          LIVE DELIVERY
        </p>

        <h3 className="mt-1 text-lg font-bold text-slate-900">
          🚚 Track Your Driver
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Driver location updated in real time.
        </p>
      </div>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
        ● In Transit
      </span>
    </div>

    <MapContainer
      center={[
        order.driverLocation.latitude,
        order.driverLocation.longitude,
      ]}
      zoom={15}
      scrollWheelZoom={true}
      className="h-[350px] w-full rounded-2xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          order.driverLocation.latitude,
          order.driverLocation.longitude,
        ]}
        icon={driverIcon}
      >
        <Popup>
          🚚 Driver's Current Location
        </Popup>
      </Marker>
    </MapContainer>
  </div>
)}

                  {/* Total */}
                 

  <div className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <span className="font-semibold text-slate-600">
      Order Total
    </span>

    <p className="text-2xl font-bold text-emerald-600">
      ₹{order.totalAmount}
    </p>
  </div>

  {(order.status === "Pending" ||
    order.status === "Confirmed") && (
    <button
      onClick={async () => {
        const confirmed = window.confirm(
          "Are you sure you want to cancel this order?"
        );

        if (!confirmed) return;

        try {
          const response = await fetch(
            `http://localhost:5000/api/orders/${order._id}/cancel`,
            {
              method: "PATCH",
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message || "Failed to cancel order"
            );
          }

          setOrders((currentOrders) =>
            currentOrders.map((item) =>
              item._id === order._id
                ? { ...item, status: "Cancelled" }
                : item
            )
          );

          alert("Order cancelled successfully!");
        } catch (error) {
          console.error(error);
          alert("Failed to cancel order");
        }
      }}
      className="rounded-xl bg-red-100 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-200"
    >
      ❌ Cancel Order
    </button>
  )}
</div>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Orders;