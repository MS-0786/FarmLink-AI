// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

const driverIcon = L.divIcon({
  html: "🚚",
  className: "",
  iconSize: [35, 35],
  iconAnchor: [17, 17],
});

const pickupIcon = L.divIcon({
  html: "🟢",
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const buyerIcon = L.divIcon({
  html: "🔴",
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

  function DriverLocationMarker({ orderId }) {
  // console.log("DriverLocationMarker orderId:", orderId);
  const [position, setPosition] = useState([28.6139, 77.2090]);

  useEffect(() => {

    if (!orderId) return;
    console.log("Starting GPS for order:", orderId);
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (location) => {
  const { latitude, longitude } = location.coords;

  console.log("Driver GPS:", latitude, longitude);

  setPosition([latitude, longitude]);

  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}/location`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update driver location"
      );
    }

    console.log("Location saved to database:", data);
  } catch (error) {
    console.error("Error saving driver location:", error);
  }
},
      (error) => {
        console.error("GPS Error:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 30000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
    }, [orderId]);

  return (
    <Marker position={position} icon={driverIcon}>
      <Popup>🚚 Driver's Current Location</Popup>
    </Marker>
  );
}

function DriverDashboard() {
 const navigate = useNavigate();

const [order, setOrder] = useState(null);
const [deliveryStatus, setDeliveryStatus] = useState("Pending");
useEffect(() => {
  const fetchOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      if (data.length > 0) {
        setOrder(data[0]);
        setDeliveryStatus(data[0].status);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  fetchOrder();
}, []);
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
                Driver Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/buyer")}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
          >
            ← Marketplace
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}
        <section>
          <p className="text-sm font-semibold text-emerald-600">
            DELIVERY PARTNER
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Driver Dashboard 🚚
          </h2>

          <p className="mt-2 text-slate-500">
            Manage your assigned deliveries and track your delivery progress.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Today's Deliveries
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              5
            </p>

            <p className="mt-2 text-xs text-emerald-600">
              ↑ 2 from yesterday
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              3
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Deliveries completed
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              1
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Currently delivering
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Earnings
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              ₹850
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Today's earnings
            </p>
          </div>

        </section>

        {/* Current Delivery */}
        <section className="mt-8">

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-semibold text-emerald-600">
                  CURRENT DELIVERY
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
  {order?.products?.[0]?.cropName || "Loading..."} Delivery 🌾
</h3>

                <p className="mt-1 text-sm text-slate-500">
  Order #{order ? order._id.slice(-8).toUpperCase() : "Loading..."}
</p>
              </div>

                <span
  className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
    deliveryStatus === "Delivered"
      ? "bg-green-100 text-green-700"
      : deliveryStatus === "In Transit"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {deliveryStatus === "Delivered"
    ? "✓ Delivered"
    : deliveryStatus === "In Transit"
    ? "🚚 In Transit"
    : "⏳ Pending"}
</span>

            </div>
            {/* Live Map */}
<div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

  <MapContainer
    center={[28.6139, 77.2090]}
    zoom={11}
    scrollWheelZoom={true}
    className="h-[400px] w-full"
  >

    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* Driver */}
      <DriverLocationMarker orderId={order?._id} />

    {/* Pickup */}
    <Marker
      position={[28.6500, 77.2300]}
      icon={pickupIcon}
    >
      <Popup>
        🟢 Pickup Location
        <br />
        Farmer's Farm
      </Popup>
    </Marker>

    {/* Buyer */}
    <Marker
      position={[28.5700, 77.3200]}
      icon={buyerIcon}
    >
      <Popup>
        🔴 Delivery Location
        <br />
        Buyer
      </Popup>
    </Marker>

    {/* Route */}
    <Polyline
      positions={[
        [28.6139, 77.2090],
        [28.6500, 77.2300],
        [28.5700, 77.3200],
      ]}
    />

  </MapContainer>

</div>

            {/* Route */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-xs font-semibold text-emerald-600">
                  PICKUP
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  Farmer's Farm
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Delhi
                </p>
              </div>

              <div className="flex items-center justify-center text-3xl">
                →
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-xs font-semibold text-blue-600">
                  DELIVERY
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  Buyer Location
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  New Delhi
                </p>
              </div>

            </div>

            {/* Delivery info */}
            <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-3">

              <div>
                <p className="text-xs text-slate-400">
                  Distance
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  12.5 km
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Estimated Time
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  28 min
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Delivery Amount
                </p>

                <p className="mt-1 font-bold text-emerald-600">
                  ₹250
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

             {deliveryStatus === "Pending" && (
  <button
    onClick={async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${order._id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "In Transit",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update status");
    }

    setDeliveryStatus("In Transit");

    alert("Delivery started successfully!");
  } catch (error) {
    console.error("Error updating delivery status:", error);
    alert("Failed to start delivery");
  }
}}
    className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
  >
    🚚 Start Delivery
  </button>
)}

{deliveryStatus === "In Transit" && (
  <button
    // onClick={() => setDeliveryStatus("Delivered")}
    onClick={async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${order._id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Delivered",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update status");
    }

    setDeliveryStatus("Delivered");

    alert("Delivery marked as delivered!");
  } catch (error) {
    console.error("Error updating delivery status:", error);
    alert("Failed to mark delivery as delivered");
  }
}}
    className="flex-1 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
  >
    ✓ Mark Delivered
  </button>
)}

{deliveryStatus === "Delivered" && (
  <div className="flex-1 rounded-xl bg-green-100 px-5 py-3 text-center font-semibold text-green-700">
    ✓ Delivery Completed
  </div>
)}

            </div>

          </div>

        </section>

        {/* Assigned Deliveries */}
        <section className="mt-8">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-sm font-semibold text-emerald-600">
                DELIVERY QUEUE
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                Assigned Deliveries
              </h3>
            </div>

            <span className="text-sm text-slate-500">
              2 pending
            </span>

          </div>

          <div className="mt-5 space-y-4">

            {/* Delivery 1 */}
            <div className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                  🥔
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">
                    Potato — 100 kg
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    Pickup: Gurgaon → Delhi
                  </p>
                </div>

              </div>

              <span className="w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                Pending
              </span>

            </div>

            {/* Delivery 2 */}
            <div className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                  🧅
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">
                    Onion — 75 kg
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    Pickup: Noida → Delhi
                  </p>
                </div>

              </div>

              <span className="w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                Pending
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default DriverDashboard;