function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-6 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            🌱 AI-Powered Agriculture Platform
          </div>

          <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Connecting Farmers
            <span className="text-green-600"> Directly </span>
            to Buyers
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            FarmLink AI helps farmers get better prices, connects them
            directly with buyers, and uses AI to predict demand and
            optimize agricultural logistics.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-green-700">
              Explore Marketplace
            </button>

            <button className="rounded-lg border border-green-600 px-6 py-3 font-semibold text-green-700 hover:bg-green-50">
              Join as Farmer
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero