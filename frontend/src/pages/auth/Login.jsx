import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">
            FarmLink AI 🌾
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome back! Login to continue.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label className="font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
         <span
  onClick={() => navigate("/register")}
  className="cursor-pointer font-semibold text-green-600 hover:text-green-700"
>
  Register
</span>
        </p>

      </div>
    </div>
  );
}

export default Login;