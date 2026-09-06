import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.pricePerKg * item.cartQuantity,
    0
  );

  const getCropIcon = (cropName) => {
    const crop = cropName.toLowerCase();

    if (crop.includes("tomato")) return "🍅";
    if (crop.includes("onion")) return "🧅";
    if (crop.includes("potato")) return "🥔";
    if (crop.includes("carrot")) return "🥕";
    if (crop.includes("spinach")) return "🥬";
    if (crop.includes("cabbage")) return "🥬";

    return "🌱";
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const orderData = {
        buyerName: "Demo Buyer",
        buyerEmail: "demo@example.com",

        products: cart.map((item) => ({
          productId: item._id,
          cropName: item.cropName,
          farmerName: item.farmerName,
          quantity: item.cartQuantity,
          pricePerKg: item.pricePerKg,
          totalPrice:
            item.pricePerKg * item.cartQuantity,
        })),

        totalAmount: totalPrice,
      };

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      alert("Order placed successfully!");
      navigate("/orders");

    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <button
            onClick={() => navigate("/buyer")}
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
              🌾
            </div>

            <div className="text-left">
              <h1 className="text-xl font-bold text-emerald-950">
                FarmLink AI
              </h1>

              <p className="text-xs text-slate-500">
                Fresh • Direct • Trusted
              </p>
            </div>

          </button>


          <button
            onClick={() => navigate("/buyer")}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            ← Continue Shopping
          </button>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* TITLE */}

        <div>

          <p className="text-sm font-semibold text-emerald-600">
            YOUR SHOPPING CART
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Your Cart 🛒
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Review your fresh produce before placing your order.
          </p>

        </div>


        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="mt-10 rounded-3xl border bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl">
              🛒
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Your cart is empty
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Explore fresh produce directly from farmers and
              add your favorite products to the cart.
            </p>

            <button
              onClick={() => navigate("/buyer")}
              className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-700"
            >
              Browse Fresh Produce 🌱
            </button>

          </div>

        ) : (

          <div className="mt-10 grid gap-8 lg:grid-cols-3">


            {/* ================= CART ITEMS ================= */}

            <section className="space-y-4 lg:col-span-2">

              <div className="rounded-2xl border bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-lg font-bold">
                      Cart Items
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {cart.length} different product(s)
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Direct from Farmers
                  </span>

                </div>

              </div>


              {cart.map((item) => (

                <div
                  key={item._id}
                  className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    {/* CROP ICON */}

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 text-5xl">
                      {getCropIcon(item.cropName)}
                    </div>


                    {/* INFORMATION */}

                    <div className="flex-1">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h3 className="text-xl font-bold text-slate-900">
                            {item.cropName}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Fresh farm produce
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item._id)
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          🗑️ Remove
                        </button>

                      </div>


                      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">

                        <div>
                          <p className="text-xs text-slate-400">
                            Farmer
                          </p>

                          <p className="mt-1 font-medium text-slate-700">
                            👨‍🌾 {item.farmerName}
                          </p>
                        </div>


                        <div>
                          <p className="text-xs text-slate-400">
                            Quantity
                          </p>

                          <p className="mt-1 font-medium text-slate-700">
                            📦 {item.cartQuantity} kg
                          </p>
                        </div>


                        <div>
                          <p className="text-xs text-slate-400">
                            Price
                          </p>

                          <p className="mt-1 font-semibold text-emerald-600">
                            ₹{item.pricePerKg} / kg
                          </p>
                        </div>

                      </div>


                      <div className="mt-4 border-t pt-4">

                        <div className="flex items-center justify-between">

                          <span className="text-sm text-slate-500">
                            Item Total
                          </span>

                          <span className="text-lg font-bold text-slate-900">
                            ₹
                            {item.pricePerKg *
                              item.cartQuantity}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </section>


            {/* ================= ORDER SUMMARY ================= */}

            <aside>

              <div className="sticky top-6 rounded-2xl border bg-white p-6 shadow-md">

                <h3 className="text-xl font-bold text-slate-900">
                  Order Summary
                </h3>


                <div className="mt-6 space-y-4">

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-500">
                      Products
                    </span>

                    <span className="font-medium">
                      {cart.length}
                    </span>

                  </div>


                  <div className="flex justify-between text-sm">

                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-medium">
                      ₹{totalPrice}
                    </span>

                  </div>


                  <div className="flex justify-between text-sm">

                    <span className="text-slate-500">
                      Delivery
                    </span>

                    <span className="font-semibold text-emerald-600">
                      Calculated later
                    </span>

                  </div>

                </div>


                <div className="my-6 border-t"></div>


                <div className="flex items-center justify-between">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-emerald-600">
                    ₹{totalPrice}
                  </span>

                </div>


                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.98]"
                >
                  Place Order →
                </button>


                <button
                  onClick={() => navigate("/buyer")}
                  className="mt-3 w-full rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Continue Shopping
                </button>


                <div className="mt-6 rounded-xl bg-emerald-50 p-4">

                  <p className="text-sm font-semibold text-emerald-800">
                    🌱 Why FarmLink?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Your purchase directly supports farmers
                    by reducing unnecessary intermediaries.
                  </p>

                </div>

              </div>

            </aside>

          </div>

        )}

      </main>

    </div>
  );
}

export default Cart;