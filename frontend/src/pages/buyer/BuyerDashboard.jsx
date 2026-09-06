import { useEffect, useState } from "react";

function BuyerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        alert(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
      alert("Server se connect nahi ho pa raha");
    } finally {
      setLoading(false);
    }
  };

 const handleBuy = async (product) => {
  const quantity = prompt(
    `Kitne kg ${product.cropName} kharidna hai?\nAvailable: ${product.quantity} kg`
  );

  if (!quantity) return;

  const selectedQuantity = Number(quantity);

  if (
    isNaN(selectedQuantity) ||
    selectedQuantity <= 0 ||
    selectedQuantity > product.quantity
  ) {
    alert("Please enter a valid quantity.");
    return;
  }

  const totalPrice = selectedQuantity * product.pricePerKg;

  const confirmOrder = window.confirm(
    `${product.cropName}\n\n` +
    `Quantity: ${selectedQuantity} kg\n` +
    `Price: ₹${product.pricePerKg}/kg\n` +
    `Total: ₹${totalPrice}\n\n` +
    `Order place karein?`
  );

  if (!confirmOrder) return;

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: currentUser.id,
        buyerName: currentUser.name,

        farmerId: product.farmerId,
        farmerName: product.farmerName,

        productId: product._id,
        cropName: product.cropName,

        quantity: selectedQuantity,
        pricePerKg: product.pricePerKg,
        totalPrice: totalPrice,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully! 🎉");
    } else {
      alert(data.message || "Order failed");
    }
  } catch (error) {
    console.error("ORDER ERROR:", error);
    alert("Server se connect nahi ho pa raha.");
  }
};
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Buyer Dashboard</h1>

      <p>
        Welcome, <strong>{currentUser?.name}</strong>
      </p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h2>Available Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <h3>{product.cropName}</h3>

              <p>
                <strong>Farmer:</strong> {product.farmerName}
              </p>

              <p>
                <strong>Quantity:</strong> {product.quantity}{" "}
                {product.unit}
              </p>

              <p>
                <strong>Price:</strong> ₹{product.pricePerKg}/kg
              </p>

              <p>
                <strong>Location:</strong> {product.location}
              </p>

              <button
                 onClick={() => handleBuy(product)}
                 className="mt-4 w-full bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                 🛒 Buy Now
             </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard;