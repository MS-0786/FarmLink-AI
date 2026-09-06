import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FarmerDashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    farmerName: "",
    cropName: "",
    quantity: "",
    unit: "kg",
    location: "",
    pricePerKg: "",
  });

  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [priceRecommendation, setPriceRecommendation] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const getPriceRecommendation = async () => {
  console.log("AI BUTTON CLICKED");

  if (
    !formData.cropName ||
    !formData.location ||
    !formData.quantity ||
    !formData.pricePerKg
  ) {
    alert("Please enter crop, location, quantity and market price first.");
    return;
  }

  try {
    setPriceLoading(true);
    setPriceRecommendation(null);
    console.log("CALLING ML API");
    const response = await fetch(
      "http://localhost:8000/predict-price",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop: formData.cropName,
          location: formData.location,
          quantity: Number(formData.quantity),
          demand: 8,
          market_price: Number(formData.pricePerKg),
        }),
      }
    );

    console.log("ML RESPONSE RECEIVED", response.status);

const data = await response.json();

console.log("ML RESPONSE DATA", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get price recommendation"
      );
    }

    setPriceRecommendation(data.recommended_price);
  } catch (error) {
    console.error("AI Price Error:", error);
    alert("Failed to get AI price recommendation");
  } finally {
    setPriceLoading(false);
  }
};

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


    const handleDeleteProduct = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete product");
    }

    alert("Product deleted successfully!");

    fetchProducts();
  } catch (error) {
    console.error("Delete Product Error:", error);
    alert("Failed to delete product");
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            quantity: Number(formData.quantity),
            pricePerKg: Number(formData.pricePerKg),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add product"
        );
      }

      alert("Product added successfully!");

      setFormData({
        farmerName: "",
        cropName: "",
        quantity: "",
        unit: "kg",
        location: "",
        pricePerKg: "",
      });

      setShowProductForm(false);

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col bg-emerald-950 text-white lg:flex">

        <div className="border-b border-emerald-900 px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🌾</div>

            <div>
              <h1 className="text-xl font-bold">
                FarmLink AI
              </h1>

              <p className="text-xs text-emerald-300">
                Better Farms • Brighter Future
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">

          <button
            className="flex w-full items-center gap-4 rounded-xl bg-emerald-600 px-4 py-3 text-left font-semibold shadow-lg"
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            onClick={() => setShowProductForm(true)}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-emerald-100 transition hover:bg-emerald-900"
          >
            <span>🌱</span>
            My Products
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-emerald-100 transition hover:bg-emerald-900"
          >
            <span>📦</span>
            Orders
          </button>

          <button
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-emerald-100 transition hover:bg-emerald-900"
          >
            <span>💰</span>
            Earnings
          </button>

          <button
            onClick={() =>
              document
                .getElementById("ai-price")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-emerald-100 transition hover:bg-emerald-900"
          >
            <span>🤖</span>
            AI Price Advisor
          </button>

          <button
            onClick={() =>
              document
                .getElementById("demand")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-emerald-100 transition hover:bg-emerald-900"
          >
            <span>📈</span>
            Demand Insights
          </button>

          <button
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-emerald-100 transition hover:bg-emerald-900"
          >
            <span>🚚</span>
            Deliveries
          </button>

          <button
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-emerald-100 transition hover:bg-emerald-900"
          >
            <span>⚙️</span>
            Settings
          </button>

        </nav>

        <div className="m-4 rounded-2xl bg-emerald-900 p-4">
          <p className="text-sm font-semibold">
            🌱 Grow smarter
          </p>

          <p className="mt-1 text-xs text-emerald-300">
            Use AI insights to make better farming decisions.
          </p>
        </div>
      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="lg:ml-64">

        {/* HEADER */}
        <header className="border-b bg-white px-6 py-6 lg:px-10">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-emerald-600">
                FARMER DASHBOARD
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900 lg:text-3xl">
                Good Morning, Farmer! 👋
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Here's what's happening with your farm today.
              </p>
            </div>

            <div className="hidden items-center gap-4 sm:flex">

              <button className="relative rounded-full bg-slate-100 p-3 hover:bg-slate-200">
                🔔
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xl">
                  👨‍🌾
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Farmer
                  </p>

                  <p className="text-xs text-slate-500">
                    Farm Owner
                  </p>
                </div>
              </div>

            </div>
          </div>
        </header>


        <div className="space-y-8 px-6 py-8 lg:px-10">


          {/* ================= STAT CARDS ================= */}

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-emerald-100 p-3 text-2xl">
                  🌱
                </div>

                <span className="text-emerald-600">
                  ↗
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Total Products
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                {products.length}
              </h3>

              <p className="mt-2 text-xs font-medium text-emerald-600">
                Products listed on marketplace
              </p>
            </div>


            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-100 p-3 text-2xl">
                  📦
                </div>

                <span className="text-blue-600">
                  →
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Active Orders
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                —
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                Will connect to orders
              </p>
            </div>


            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-amber-100 p-3 text-2xl">
                  💰
                </div>

                <span className="text-amber-600">
                  ↗
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Total Earnings
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                ₹—
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                Earnings analytics coming soon
              </p>
            </div>


            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-purple-100 p-3 text-2xl">
                  🚚
                </div>

                <span className="text-purple-600">
                  →
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Pending Deliveries
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                —
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                Logistics module coming soon
              </p>
            </div>

          </section>


          {/* ================= AI PRICE ADVISOR ================= */}

          <section
            id="ai-price"
            className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-100 p-8"
          >

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

              <div className="max-w-2xl">

                <div className="flex items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-2xl text-white shadow-lg">
                    🤖
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-emerald-950">
                        AI Smart Price Advisor
                      </h2>

                      <span className="rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                        Powered by AI
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-emerald-800">
                      Make smarter pricing decisions for your produce.
                    </p>
                  </div>

                </div>


                <p className="mt-6 max-w-xl text-slate-600">
                  Get a data-driven selling price based on crop,
                  location, quantity, demand and current market
                  conditions.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      Crop
    </label>
    <input
      type="text"
      name="cropName"
      value={formData.cropName}
      onChange={handleChange}
      placeholder="e.g. Tomato"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      Location
    </label>
    <input
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      placeholder="e.g. Delhi"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      Quantity (kg)
    </label>
    <input
      type="number"
      name="quantity"
      value={formData.quantity}
      onChange={handleChange}
      placeholder="e.g. 500"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      Market Price (₹/kg)
    </label>
    <input
      type="number"
      name="pricePerKg"
      value={formData.pricePerKg}
      onChange={handleChange}
      placeholder="e.g. 26"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
    />
  </div>
</div>
                <button
                 onClick={getPriceRecommendation}
                  className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700"
                >
                  Get Price Recommendation →
                </button>

              </div>


              <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-lg lg:min-w-64">

              <p className="text-sm font-medium text-slate-500">
                AI Price Recommendation
              </p>

                <p className="mt-2 text-sm text-slate-600">
                  Tomato • Delhi
                </p>

                  <p className="mt-4 text-3xl font-bold text-emerald-700">
                  {priceRecommendation !== null
                    ? `₹${priceRecommendation}/kg`
                    : "—"}
                </p>

                <p className="mt-2 text-xs text-emerald-600">
                  Based on current model prediction
                </p>

              </div>

            </div>
          </section>


          {/* ================= LOWER GRID ================= */}

          <div className="grid gap-6 xl:grid-cols-3">


            {/* DEMAND INSIGHTS */}

            <section
              id="demand"
              className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-1"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Demand Insights
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current demand for popular crops
                  </p>
                </div>

                <span className="text-2xl">
                  📈
                </span>

              </div>


              <div className="mt-7 space-y-5">

                {[
                  ["🍅", "Tomato", "High", "w-11/12"],
                  ["🧅", "Onion", "Medium-High", "w-9/12"],
                  ["🥔", "Potato", "Medium", "w-7/12"],
                  ["🥕", "Carrot", "Medium-Low", "w-5/12"],
                  ["🍆", "Brinjal", "Low", "w-4/12"],
                ].map(([icon, name, level, width]) => (

                  <div key={name}>

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {icon}
                        </span>

                        <span className="text-sm font-medium">
                          {name}
                        </span>
                      </div>

                      <span className="text-xs font-medium text-slate-500">
                        {level}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-emerald-500 ${width}`}
                      ></div>
                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* PRODUCTS */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Your Listed Products
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage the produce you're selling
                  </p>
                </div>

                <button
                  onClick={() => setShowProductForm(true)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  + Add Product
                </button>

              </div>


              {products.length === 0 ? (

                <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center">
                  <div className="text-4xl">
                    🌱
                  </div>

                  <p className="mt-3 font-semibold">
                    No products listed yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your first crop to start selling.
                  </p>

                  <button
                    onClick={() => setShowProductForm(true)}
                    className="mt-4 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Add Your First Product
                  </button>
                </div>

              ) : (

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  {products.map((product) => (

                    <div
                      key={product._id}
                      className="rounded-xl border bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
                    >

                      <div className="flex items-start justify-between">

                        <div>

                          <span className="text-3xl">
                            🌱
                          </span>

                          <h3 className="mt-3 text-lg font-bold">
                            {product.cropName}
                          </h3>

                        </div>

                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Listed
                        </span>

                      </div>

                      <div className="mt-4 space-y-2 text-sm text-slate-600">

                        <p>
                          👨‍🌾 {product.farmerName}
                        </p>

                        <p>
                          📦 {product.quantity} {product.unit}
                        </p>

                        <p>
                          📍 {product.location}
                        </p>

                      </div>

                    <div className="mt-5 flex items-center justify-between border-t pt-4">

  <div>
    <span className="text-xl font-bold text-emerald-600">
      ₹{product.pricePerKg}
    </span>

    <span className="ml-1 text-sm text-slate-500">
      / kg
    </span>
  </div>

  <button
    onClick={() => handleDeleteProduct(product._id)}
    className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
  >
    🗑️ Delete
  </button>

</div>

                    </div>

                  ))}

                </div>

              )}

            </section>

          </div>


          {/* ================= QUICK ACTIONS + RECENT ORDERS ================= */}

          <div className="grid gap-6 lg:grid-cols-3">


            {/* QUICK ACTIONS */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                Quick Actions
              </h2>

              <div className="mt-5 space-y-3">

                <button
                  onClick={() => setShowProductForm(true)}
                  className="flex w-full items-center justify-between rounded-xl bg-emerald-50 p-4 text-left transition hover:bg-emerald-100"
                >
                  <span>
                    🌱 <strong className="ml-2">Add New Product</strong>
                  </span>

                  <span>→</span>
                </button>

                <button
                  onClick={() => navigate("/buyer")}
                  className="flex w-full items-center justify-between rounded-xl bg-blue-50 p-4 text-left transition hover:bg-blue-100"
                >
                  <span>
                    🛒 <strong className="ml-2">View Marketplace</strong>
                  </span>

                  <span>→</span>
                </button>

                <button
                  onClick={() => navigate("/orders")}
                  className="flex w-full items-center justify-between rounded-xl bg-purple-50 p-4 text-left transition hover:bg-purple-100"
                >
                  <span>
                    📦 <strong className="ml-2">Check Orders</strong>
                  </span>

                  <span>→</span>
                </button>

              </div>

            </section>


            {/* RECENT ORDERS */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Recent Orders
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your latest customer orders
                  </p>
                </div>

                <button
                  onClick={() => navigate("/orders")}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  View All →
                </button>

              </div>


              <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center">

                <div className="text-4xl">
                  📦
                </div>

                <p className="mt-3 font-semibold">
                  Order analytics coming soon
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Your real orders will appear here once
                  farmer-specific order tracking is connected.
                </p>

              </div>

            </section>

          </div>


        </div>
      </main>


      {/* ================= ADD PRODUCT MODAL ================= */}

      {showProductForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  Add New Product 🌱
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  List your produce for buyers.
                </p>
              </div>

              <button
                onClick={() => setShowProductForm(false)}
                className="rounded-full bg-slate-100 px-3 py-2 text-lg hover:bg-slate-200"
              >
                ✕
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="text-sm font-medium">
                    Farmer Name
                  </label>

                  <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>


                <div>
                  <label className="text-sm font-medium">
                    Crop Name
                  </label>

                  <input
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>


                <div>
                  <label className="text-sm font-medium">
                    Quantity
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>


                <div>
                  <label className="text-sm font-medium">
                    Unit
                  </label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                  >
                    <option value="kg">
                      Kilogram (kg)
                    </option>

                    <option value="quintal">
                      Quintal
                    </option>

                    <option value="ton">
                      Ton
                    </option>
                  </select>
                </div>


                <div>
                  <label className="text-sm font-medium">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>


                <div>
                  <label className="text-sm font-medium">
                    Price per kg (₹)
                  </label>

                  <input
                    type="number"
                    name="pricePerKg"
                    value={formData.pricePerKg}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

              </div>


              <div className="mt-7 flex gap-3">

                <button
                  type="button"
                  onClick={() => setShowProductForm(false)}
                  className="flex-1 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-md hover:bg-emerald-700"
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default FarmerDashboard;