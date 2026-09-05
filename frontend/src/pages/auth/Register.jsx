import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">
            FarmLink AI 🌾
          </h1>

          <p className="mt-2 text-gray-600">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label className="font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Role */}
          <div>
            <label className="font-medium text-gray-700">
              Register as
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 active:scale-95"
          >
            Register
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-green-600 hover:text-green-700"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;