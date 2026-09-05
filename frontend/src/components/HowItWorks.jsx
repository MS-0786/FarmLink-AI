function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "🌾",
      title: "Farmer Lists Produce",
      description:
        "Farmers add their crops, quantity, location, and expected price to the marketplace.",
    },
    {
      number: "02",
      icon: "🤖",
      title: "AI Analyzes the Market",
      description:
        "Our AI analyzes demand and market data to suggest a suitable selling price.",
    },
    {
      number: "03",
      icon: "🛒",
      title: "Buyer Places an Order",
      description:
        "Consumers and bulk buyers discover available produce and place orders directly.",
    },
    {
      number: "04",
      icon: "🚚",
      title: "Produce Gets Delivered",
      description:
        "The delivery process is organized through smart logistics and driver tracking.",
    },
  ]

  return (
    <section className="bg-green-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-green-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            From Farm to Buyer
          </h2>

          <p className="mt-4 text-gray-600">
            A simple digital supply chain that connects farmers directly
            with buyers.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">

              {/* Number */}
              <div className="text-sm font-bold text-green-600">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-3xl shadow-sm">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks