import { useEffect, useMemo, useState } from "react";
import MarketForm from "./MarketForm";
import MarketTable from "./MarketTable";

const defaultData = [
  { id: 1, name: "Rice",   price: 220, change: 1.2,  volume: "Very High" },
  { id: 2, name: "Wheat",  price: 195, change: -0.8, volume: "High"      },
  { id: 3, name: "Sugar",  price: 240, change: 0.5,  volume: "Medium"    },
  { id: 4, name: "Onion",  price: 180, change: -1.1, volume: "High"      },
];

const LiveMarketModule = () => {
  const [items, setItems]       = useState([]);
  const [form, setForm]         = useState({ name: "", price: "", change: "", volume: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("market_data");
    if (stored) { setItems(JSON.parse(stored)); }
    else { setItems(defaultData); localStorage.setItem("market_data", JSON.stringify(defaultData)); }
  }, []);

  const persist = (data) => { setItems(data); localStorage.setItem("market_data", JSON.stringify(data)); };
  const resetForm = () => { setForm({ name: "", price: "", change: "", volume: "" }); setEditingId(null); };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.price || form.change === "" || !form.volume) return;
    const payload = { name: form.name.trim(), price: Number(form.price), change: Number(form.change), volume: form.volume };
    if (editingId) {
      persist(items.map((item) => item.id === editingId ? { ...item, ...payload } : item));
    } else {
      persist([{ id: Date.now(), ...payload }, ...items]);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, price: String(item.price), change: String(item.change), volume: item.volume });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    persist(items.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  const totalPos = useMemo(() => items.filter((i) => Number(i.change) >= 0).length, [items]);
  const totalNeg = useMemo(() => items.filter((i) => Number(i.change) < 0).length,  [items]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Module Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-1 rounded-full bg-orange-500" />
            <div>
              <p className="text-[13px] font-extrabold text-[#0b1f3a] leading-none">Live Market Overview</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Manage commodity pricing data (LKR)</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-semibold">▲ {totalPos} Positive</span>
            <span className="px-3 py-1 rounded-lg bg-red-50 text-red-500 text-[11px] font-semibold">▼ {totalNeg} Negative</span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold">{items.length} Total</span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <MarketForm
            form={form} setForm={setForm}
            handleSubmit={handleSubmit}
            editing={editingId}
            handleCancel={resetForm}
          />
          <MarketTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default LiveMarketModule;