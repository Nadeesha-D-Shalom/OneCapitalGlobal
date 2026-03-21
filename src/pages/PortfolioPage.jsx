import React from "react";

const PortfolioPage = () => {
  return (
    <div className="pt-20 bg-white min-h-screen px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#0b1f3a] mb-6">
          Operations & Portfolio
        </h1>

        <p className="text-gray-600 max-w-3xl mb-10">
          One Capital Global operates a vertically integrated supply chain from procurement
          to distribution, handling large-scale imports across multiple commodity categories.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[#f4f7fb] p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Global Sourcing</h3>
            <p className="text-sm text-gray-500">
              China, India, Pakistan, UAE and global agricultural hubs.
            </p>
          </div>

          <div className="bg-[#f4f7fb] p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Distribution Reach</h3>
            <p className="text-sm text-gray-500">
              Strong presence in Colombo, Pettah, Dambulla markets.
            </p>
          </div>

          <div className="bg-[#f4f7fb] p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Trading Models</h3>
            <p className="text-sm text-gray-500">
              Commission imports, forward contracts, seasonal stockholding.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PortfolioPage;

