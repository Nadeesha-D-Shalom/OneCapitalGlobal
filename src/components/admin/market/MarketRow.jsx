import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const volumeStyle = {
  "Very High": "bg-purple-50 text-purple-600",
  "High":      "bg-blue-50 text-blue-600",
  "Medium":    "bg-amber-50 text-amber-600",
  "Low":       "bg-slate-100 text-slate-500",
};

const MarketRow = ({ item, onEdit, onDelete }) => {
  const isUp = Number(item.change) >= 0;

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
      <td className="px-4 py-3 text-[13px] font-semibold text-[#0b1f3a]">{item.name}</td>
      <td className="px-4 py-3 text-[13px] font-semibold text-slate-700">
        Rs. {Number(item.price).toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
          {isUp ? "▲" : "▼"} {isUp ? "+" : ""}{Number(item.change).toFixed(2)}%
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${volumeStyle[item.volume] || "bg-slate-100 text-slate-500"}`}>
          {item.volume}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          <button onClick={() => onEdit(item)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
            <FontAwesomeIcon icon={faPen} className="text-[10px]" />
          </button>
          <button onClick={() => onDelete(item.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
            <FontAwesomeIcon icon={faTrash} className="text-[10px]" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MarketRow;