function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <h1 className="text-2xl font-bold text-green-700">
            FarmLink AI
          </h1>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-gray-700 hover:text-green-700">
            Home
          </a>

          <a href="#" className="text-gray-700 hover:text-green-700">
            Marketplace
          </a>

          <a href="#" className="text-gray-700 hover:text-green-700">
            About
          </a>
        </div>

        {/* Login button */}
        <button className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700">
          Login
        </button>

      </div>
    </nav>
  )
}

export default Navbar