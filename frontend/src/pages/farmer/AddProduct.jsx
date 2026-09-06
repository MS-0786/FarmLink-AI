import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    unit: "kg",
    location: "",
    pricePerKg: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const productData = {
        farmerId: user?.id,
        farmerName: user?.name || "Farmer",
        cropName: formData.cropName,
        quantity: Number(formData.quantity),
        unit: formData.unit,
        location: formData.location,
        pricePerKg: Number(formData.pricePerKg),
        image: formData.image,
      };

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      alert("Product added successfully! 🌾");

      navigate("/farmer");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-green-700">
              FarmLink AI 🌾
            </h1>

            <p className="text-sm text-gray-500">
              Add New Product
            </p>
          </div>

          <button
            onClick={() => navigate("/farmer")}
            className="text-gray-600 hover:text-green-700 font-medium"
          >
            ← Back to Dashboard
          </button>

        </div>
      </nav>

      {/* Form */}
      <main className="max-w-4xl mx-auto p-6">

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Add Your Product
          </h2>

          <p className="text-gray-500 mt-1 mb-8">
            List your agricultural product for direct buyers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Crop Name */}
            <div>
              <label className="font-medium text-gray-700">
                Crop / Product Name
              </label>

              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                placeholder="e.g. Tomato"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Quantity + Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="font-medium text-gray-700">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  min="1"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Unit
                </label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="quintal">Quintal</option>
                  <option value="ton">Ton</option>
                </select>
              </div>

            </div>

            {/* Price */}
            <div>
              <label className="font-medium text-gray-700">
                Price per Kg (₹)
              </label>

              <input
                type="number"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
                placeholder="e.g. 30"
                min="1"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Location */}
            <div>
              <label className="font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Patna, Bihar"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="font-medium text-gray-700">
                Product Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Optional image URL"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              <p className="text-sm text-gray-400 mt-1">
                Image upload hum baad me add karenge.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                type="button"
                onClick={() => navigate("/farmer")}
                className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition disabled:bg-green-300"
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AddProduct;