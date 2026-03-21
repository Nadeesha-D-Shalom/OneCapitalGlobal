import React from "react";

const Company = () => {
    return (
        <div className="pt-20 bg-[#f4f7fb] min-h-screen px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-[#0b1f3a] mb-6">
                    About One Capital Global
                </h1>

                <p className="text-gray-600 mb-8 max-w-3xl">
                    One Capital Global is a leading FMCG import, trading, and distribution company
                    operating across Sri Lanka’s essential commodity markets, built on reliability,
                    efficiency, and data-driven decision making.
                </p>

                {/* Key Strengths */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-xl border">
                        <i className="fa-solid fa-globe text-orange-500 mb-3" />
                        <h3 className="font-semibold">Global Network</h3>
                        <p className="text-sm text-gray-500">
                            Suppliers across Asia, Middle East, and global export hubs.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border">
                        <i className="fa-solid fa-chart-line text-orange-500 mb-3" />
                        <h3 className="font-semibold">Market Intelligence</h3>
                        <p className="text-sm text-gray-500">
                            Real-time data-driven procurement and trading decisions.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border">
                        <i className="fa-solid fa-truck-fast text-orange-500 mb-3" />
                        <h3 className="font-semibold">Efficient Logistics</h3>
                        <p className="text-sm text-gray-500">
                            End-to-end supply chain from import to distribution.
                        </p>
                    </div>

                </div>

                {/* Digital Platform */}
                <div className="bg-white p-6 rounded-xl border">
                    <h2 className="text-xl font-bold mb-3">
                        Digital Commodity Intelligence Platform
                    </h2>

                    <p className="text-gray-500 text-sm">
                        The company is developing a national-level platform providing real-time pricing,
                        supply-demand insights, harvest predictions, and logistics analytics to traders,
                        farmers, and distributors across Sri Lanka.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Company;