import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function BuyerMarketplace() {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Get unique crop names for filter
  const cropNames = [
    "All",
    ...new Set(products.map((product) => product.cropName)),
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.cropName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.farmerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCrop =
      selectedCrop === "All" ||
      product.cropName === selectedCrop;

    return matchesSearch && matchesCrop;
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}

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


          {/* Navigation */}

          <div className="hidden items-center gap-3 sm:flex">

            <button
              onClick={() => navigate("/orders")}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              📦 My Orders
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              🛒 Cart

              {cart.length > 0 && (
                <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-emerald-700">
                  {cart.length}
                </span>
              )}
            </button>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* HERO */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-700 p-8 text-white shadow-lg lg:p-10">

          <div className="max-w-2xl">

            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Direct from Farmers
            </span>

            <h2 className="mt-5 text-3xl font-bold lg:text-4xl">
              Fresh Produce.
              <br />
              Directly From Farmers. 🌱
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-100 lg:text-base">
              Discover fresh agricultural produce directly from
              farmers and support a fairer, more transparent food
              supply chain.
            </p>

          </div>

        </section>


        {/* ================= SEARCH & FILTER ================= */}

        <section className="mt-8">

          <div className="flex flex-col gap-4 lg:flex-row">

            {/* Search */}

            <div className="relative flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search crops, farmers or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

            </div>


            {/* Crop Filter */}

            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium outline-none focus:border-emerald-500"
            >

              {cropNames.map((crop) => (
                <option key={crop} value={crop}>
                  {crop === "All"
                    ? "🌱 All Crops"
                    : crop}
                </option>
              ))}

            </select>

          </div>

        </section>


        {/* ================= MARKETPLACE HEADER ================= */}

        <section className="mt-10">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-sm font-semibold text-emerald-600">
                MARKETPLACE
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Fresh Produce
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredProducts.length} products available
              </p>

            </div>

            <div className="hidden text-sm text-slate-500 sm:block">
              🛒 {cart.length} item(s) in cart
            </div>

          </div>


          {/* ================= PRODUCTS ================= */}

          {filteredProducts.length === 0 ? (

            <div className="mt-6 rounded-2xl border bg-white p-12 text-center shadow-sm">

              <div className="text-5xl">
                🌱
              </div>

              <h3 className="mt-4 text-lg font-bold">
                No products found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or crop filter.
              </p>

            </div>

          ) : (

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => (

                <div
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Product visual */}

                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">

                    <span className="text-6xl transition duration-200 group-hover:scale-110">
                      {product.cropName.toLowerCase().includes("tomato")
                        ? "🍅"
                        : product.cropName.toLowerCase().includes("onion")
                        ? "🧅"
                        : product.cropName.toLowerCase().includes("potato")
                        ? "🥔"
                        : product.cropName.toLowerCase().includes("carrot")
                        ? "🥕"
                        : product.cropName.toLowerCase().includes("spinach")
                        ? "🥬"
                        : product.cropName.toLowerCase().includes("cabbage")
                        ? "🥬"
                        : "🌱"}
                    </span>

                  </div>


                  {/* Product information */}

                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h3 className="text-lg font-bold text-slate-900">
                          {product.cropName}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Fresh farm produce
                        </p>

                      </div>

                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Available
                      </span>

                    </div>


                    <div className="mt-5 space-y-2 text-sm text-slate-600">

                      <p>
                        👨‍🌾{" "}
                        <span className="font-medium">
                          {product.farmerName}
                        </span>
                      </p>

                      <p>
                        📍 {product.location}
                      </p>

                      <p>
                        📦 {product.quantity} {product.unit} available
                      </p>

                    </div>


                    {/* Price */}

                    <div className="mt-5 border-t border-slate-100 pt-4">

                      <div className="flex items-end justify-between">

                        <div>

                          <p className="text-xs text-slate-500">
                            Price
                          </p>

                          <p className="text-2xl font-bold text-emerald-600">
                            ₹{product.pricePerKg}
                            <span className="ml-1 text-xs font-medium text-slate-500">
                              / kg
                            </span>
                          </p>

                        </div>

                      </div>


                      {/* Add to Cart */}

                      <button
                        onClick={() => {
                          addToCart(product);
                          alert(
                            `${product.cropName} added to cart!`
                          );
                        }}
                        className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
                      >
                        🛒 Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* ================= MOBILE NAVIGATION ================= */}

      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-2xl border bg-white p-2 shadow-xl sm:hidden">

        <button
          onClick={() => navigate("/orders")}
          className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600"
        >
          📦 Orders
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
        >
          🛒 Cart ({cart.length})
        </button>

      </div>

    </div>
  );
}

export default BuyerMarketplace;