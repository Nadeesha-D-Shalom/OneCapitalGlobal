import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import MarketRow from "./MarketRow";

const volumeStyle = {
    "Very High": "bg-purple-50 text-purple-600",
    "High": "bg-blue-50 text-blue-600",
    "Medium": "bg-amber-50 text-amber-600",
    "Low": "bg-slate-100 text-slate-500",
};

const MarketTable = ({ items, onEdit, onDelete }) => {
    if (items.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-[12.5px] text-slate-400">
                No market items found. Add one above.
            </div>
        );
    }

    return (
        <>
            {/* Desktop table */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left bg-white">
                    <thead className="bg-[#0b1f3a] text-white text-[11px] uppercase tracking-wider">
                        <tr>
                            <th className="px-4 py-3">Commodity</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Change</th>
                            <th className="px-4 py-3">Volume</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <MarketRow key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
                {items.map((item) => {
                    const isUp = Number(item.change) >= 0;
                    return (
                        <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <p className="text-[13px] font-bold text-[#0b1f3a]">{item.name}</p>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                                    {isUp ? "+" : ""}{Number(item.change).toFixed(2)}%
                                </span>
                            </div>
                            <p className="text-[12.5px] text-slate-600 font-semibold mb-2">
                                Rs. {Number(item.price).toFixed(2)}
                            </p>
                            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${volumeStyle[item.volume] || "bg-slate-100 text-slate-500"}`}>
                                {item.volume}
                            </span>
                            <div className="flex gap-2 mt-3">
                                <button onClick={() => onEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 text-blue-600 text-[12px] font-semibold hover:bg-blue-100 transition">
                                    <FontAwesomeIcon icon={faPen} className="text-[10px]" /> Edit
                                </button>
                                <button onClick={() => onDelete(item.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-500 text-[12px] font-semibold hover:bg-red-100 transition">
                                    <FontAwesomeIcon icon={faTrash} className="text-[10px]" /> Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MarketTable;