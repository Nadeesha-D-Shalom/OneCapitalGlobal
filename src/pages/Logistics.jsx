import React from "react";

const services = [
  {
    icon: "fa-ship",
    title: "Import & Freight Handling",
    desc: "End-to-end import management including overseas loading, shipping coordination, and freight optimization."
  },
  {
    icon: "fa-file-contract",
    title: "Customs Clearance",
    desc: "Efficient handling of documentation and clearance processes with dedicated clearing agents."
  },
  {
    icon: "fa-warehouse",
    title: "Warehousing",
    desc: "Ventilated, palletized storage systems ensuring quality preservation and minimal losses."
  },
  {
    icon: "fa-truck",
    title: "Distribution Network",
    desc: "Island-wide delivery across Western, Central, and North Central provinces."
  }
];

const Logistics = () => {
  return (
    <div className="pt-20 bg-[#f4f7fb] min-h-screen px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#0b1f3a] mb-6">
          Logistics & Services
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md">
              <i className={`fa-solid ${item.icon} text-orange-500 text-2xl mb-4`} />
              <h3 className="font-semibold text-[#0b1f3a] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Logistics;