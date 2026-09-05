function Features() {
  const features = [
    {
      icon: "💰",
      title: "AI Price Advisor",
      description:
        "Get intelligent price recommendations based on demand, supply, and market conditions.",
    },
    {
      icon: "📈",
      title: "Demand Forecasting",
      description:
        "Predict future demand for crops and make better production and selling decisions.",
    },
    {
      icon: "🛒",
      title: "Direct Marketplace",
      description:
        "Connect farmers directly with consumers and bulk buyers without unnecessary intermediaries.",
    },
    {
      icon: "🚚",
      title: "Smart Logistics",
      description:
        "Reduce transportation costs by planning efficient deliveries and connecting nearby farmers.",
    },
  ]

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-green-600">
            OUR FEATURES
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Everything Farmers Need
          </h2>

          <p className="mt-4 text-gray-600">
            FarmLink AI combines marketplace technology, artificial
            intelligence, and logistics to improve the agricultural supply chain.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Features