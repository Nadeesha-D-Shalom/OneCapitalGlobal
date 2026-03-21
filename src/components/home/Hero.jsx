import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white bg-[#0a1624] flex items-center">

      {/* Dotted Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff15 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1624] via-[#0f2740] to-[#07101a]" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-500 opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-400 opacity-5 blur-2xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">

        <div className="max-w-2xl">

          {/* Tag */}
          <div
            className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full"
            style={{ animation: "fadeUp 0.5s ease both" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
            Sri Lanka · Live Market Intelligence
          </div>

          {/* Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ animation: "fadeUp 0.5s ease 0.1s both" }}
          >
            Global Commodity Trading &{" "}
            <span className="text-orange-500">
              Integrated Logistics
            </span>
          </h1>

          {/* Description */}
          <p
            className="mt-5 text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl"
            style={{ animation: "fadeUp 0.5s ease 0.2s both" }}
          >
            Monitor market prices, track supply-demand shifts, and optimize logistics
            with a unified data platform built for importers, distributors, and traders.
          </p>

          {/* CTA Buttons */}
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            style={{ animation: "fadeUp 0.5s ease 0.3s both" }}
          >
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-400 transition shadow-lg shadow-orange-500/20">
              View Market Data
              <i className="fa-solid fa-arrow-right text-xs" />
            </button>

            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition backdrop-blur-sm">
              Explore Platform
              <i className="fa-solid fa-up-right-from-square text-xs" />
            </button>
          </div>

          {/* Stats Row */}
          <div
            className="mt-12 flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8"
            style={{ animation: "fadeUp 0.5s ease 0.4s both" }}
          >
            {[
              { value: "20+", label: "Countries Sourced" },
              { value: "150+", label: "Global Partners" },
              { value: "200+", label: "Distribution Routes" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-xl sm:text-2xl font-extrabold text-orange-400">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
};

export default React.memo(Hero);