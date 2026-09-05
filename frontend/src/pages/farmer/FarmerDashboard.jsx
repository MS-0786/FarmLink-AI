// import { useState } from "react";
import { useEffect, useState } from "react";

function FarmerDashboard() {
  const [formData, setFormData] = useState({
    farmerName: "",
    cropName: "",
    quantity: "",
    unit: "kg",
    location: "",
    pricePerKg: "",
  });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  

  try {
    
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        quantity: Number(formData.quantity),
        pricePerKg: Number(formData.pricePerKg),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add product");
    }
    alert("Product added successfully!");

  const productsResponse = await fetch(
  "http://localhost:5000/api/products"
);

const productsData = await productsResponse.json();

setProducts(productsData);
  } catch (error) {
    console.error(error);
    alert("Failed to add product");
  }
};
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Farmer Dashboard 🌾
        </h1>

        <p className="mt-2 text-gray-600">
          List your produce directly for buyers.
        </p>

       <form
  onSubmit={handleSubmit}
  className="mt-8 rounded-2xl bg-white p-8 shadow-md"
>
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label>Farmer Name</label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label>Crop Name</label>
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label>Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="quintal">Quintal</option>
                <option value="ton">Ton</option>
              </select>
            </div>

            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label>Price per kg (₹)</label>
              <input
                type="number"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 active:scale-95"
          >
            Add Product
          </button>
        </form>
                {/* Products from MongoDB */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Listed Products
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {product.cropName}
                </h3>

                <p className="mt-2 text-gray-600">
                  Farmer: {product.farmerName}
                </p>

                <p className="text-gray-600">
                  Quantity: {product.quantity} {product.unit}
                </p>

                <p className="text-gray-600">
                  Location: {product.location}
                </p>

                <p className="mt-3 text-lg font-bold text-green-600">
                  ₹{product.pricePerKg} / kg
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;