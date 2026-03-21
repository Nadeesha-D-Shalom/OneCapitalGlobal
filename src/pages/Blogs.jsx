import React from "react";

const blogs = [
  {
    title: "Understanding Commodity Price Fluctuations",
    desc: "A deep dive into how global supply chains and seasonal demand impact commodity pricing.",
    date: "March 2026",
    icon: "fa-chart-line"
  },
  {
    title: "Import Strategies for FMCG Traders",
    desc: "Best practices for managing imports, reducing costs, and optimizing profit margins.",
    date: "February 2026",
    icon: "fa-ship"
  },
  {
    title: "Sri Lanka Market Supply Trends",
    desc: "Insights into regional supply shortages, demand zones, and wholesale market dynamics.",
    date: "January 2026",
    icon: "fa-map-location-dot"
  },
  {
    title: "Building Efficient Distribution Networks",
    desc: "How logistics and warehousing improve delivery speed and reduce operational risks.",
    date: "December 2025",
    icon: "fa-truck"
  }
];

const Blogs = () => {
  return (
    <div className="pt-20 bg-[#f4f7fb] min-h-screen px-4 sm:px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#0b1f3a]">
            Blogs & Articles
          </h1>
          <p className="text-gray-500 mt-2">
            Latest insights, strategies, and updates from the commodity trading industry.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition group"
            >

              {/* Icon */}
              <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100">
                <i className={`fa-solid ${blog.icon} text-orange-500`} />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[#0b1f3a] mb-2 group-hover:text-orange-500 transition">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4">
                {blog.desc}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{blog.date}</span>
                <span className="flex items-center gap-1 text-orange-500 cursor-pointer">
                  Read <i className="fa-solid fa-arrow-right text-[10px]" />
                </span>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Blogs;