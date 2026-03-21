import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faEye, faTrash, faTrashCan,
  faCircleCheck, faInbox, faRotateLeft, faUser,
} from "@fortawesome/free-solid-svg-icons";

const defaultMessages = [
  { id: 1, fullName: "Nimal Perera",  email: "nimal@example.com",   phone: "+94771234567", address: "Colombo, Sri Lanka", message: "I need more details about your commodity logistics service.", viewed: false, deleted: false, createdAt: "2026-03-21 09:30 AM" },
  { id: 2, fullName: "Kavindi Silva", email: "kavindi@example.com", phone: "+94774567890", address: "Kandy, Sri Lanka",   message: "Can your team support FMCG import planning and warehousing?", viewed: true, deleted: false, createdAt: "2026-03-21 10:15 AM" },
];

const MessagesModule = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab]           = useState("inbox");

  useEffect(() => {
    const stored = localStorage.getItem("contact_messages");
    if (stored) { setMessages(JSON.parse(stored)); }
    else { setMessages(defaultMessages); localStorage.setItem("contact_messages", JSON.stringify(defaultMessages)); }
  }, []);

  const persist = (data) => { setMessages(data); localStorage.setItem("contact_messages", JSON.stringify(data)); };

  const visible = useMemo(() =>
    tab === "trash"
      ? messages.filter((m) => m.deleted)
      : messages.filter((m) => !m.deleted),
    [messages, tab]
  );

  const markViewed = (id) => {
    const updated = messages.map((m) => m.id === id ? { ...m, viewed: true } : m);
    persist(updated);
    setSelected(updated.find((m) => m.id === id) || null);
  };

  const moveToTrash = (id) => {
    persist(messages.map((m) => m.id === id ? { ...m, deleted: true } : m));
    if (selected?.id === id) setSelected(null);
  };

  const restore = (id) => {
    const updated = messages.map((m) => m.id === id ? { ...m, deleted: false } : m);
    persist(updated);
    setSelected(updated.find((m) => m.id === id) || null);
  };

  const permDelete = (id) => {
    persist(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.viewed) markViewed(msg.id);
  };

  const inboxCount = messages.filter((m) => !m.deleted).length;
  const trashCount = messages.filter((m) => m.deleted).length;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-1 rounded-full bg-orange-500" />
            <div>
              <p className="text-[13px] font-extrabold text-[#0b1f3a] leading-none">Messages</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Review and manage customer inquiries</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setTab("inbox"); setSelected(null); }}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition ${tab === "inbox" ? "bg-[#0b1f3a] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              <FontAwesomeIcon icon={faInbox} className="mr-1.5 text-[10px]" />
              Inbox ({inboxCount})
            </button>
            <button
              onClick={() => { setTab("trash"); setSelected(null); }}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition ${tab === "trash" ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-1.5 text-[10px]" />
              Trash ({trashCount})
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr]">

          {/* Message List */}
          <div className="border-b xl:border-b-0 xl:border-r border-slate-100">
            <div className="max-h-[480px] overflow-y-auto">
              {visible.length === 0 ? (
                <div className="px-5 py-8 text-center text-[12.5px] text-slate-400">No messages found.</div>
              ) : (
                visible.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className={`w-full text-left px-4 py-3.5 border-b border-slate-100 transition hover:bg-slate-50 ${selected?.id === msg.id ? "bg-orange-50" : "bg-white"}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-[#0b1f3a] truncate">{msg.fullName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{msg.email}</p>
                        <p className="text-[12px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{msg.message}</p>
                      </div>
                      {!msg.viewed && !msg.deleted && (
                        <span className="h-2 w-2 rounded-full bg-orange-500 mt-1 shrink-0" />
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{msg.createdAt}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${msg.viewed ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        {msg.viewed ? "Viewed" : "New"}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="min-h-[360px] p-5">
            {!selected ? (
              <div className="h-full flex items-center justify-center flex-col gap-3 text-slate-400">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-slate-400" />
                </div>
                <p className="text-[12.5px]">Select a message to view details</p>
              </div>
            ) : (
              <div className="space-y-4">

                {/* Detail Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={faUser} className="text-slate-500 text-sm" />
                    </div>
                    <div>
                      <p className="text-[14px] font-extrabold text-[#0b1f3a]">{selected.fullName}</p>
                      <p className="text-[11px] text-slate-400">{selected.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!selected.deleted && (
                      <>
                        {!selected.viewed && (
                          <button onClick={() => markViewed(selected.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[11.5px] font-semibold hover:bg-emerald-400 transition">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-[10px]" /> Mark Viewed
                          </button>
                        )}
                        <button onClick={() => moveToTrash(selected.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 border border-red-100 text-[11.5px] font-semibold hover:bg-red-500 hover:text-white transition">
                          <FontAwesomeIcon icon={faTrash} className="text-[10px]" /> Delete
                        </button>
                      </>
                    )}
                    {selected.deleted && (
                      <>
                        <button onClick={() => restore(selected.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[11.5px] font-semibold hover:bg-blue-400 transition">
                          <FontAwesomeIcon icon={faRotateLeft} className="text-[10px]" /> Restore
                        </button>
                        <button onClick={() => permDelete(selected.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-[11.5px] font-semibold hover:bg-red-500 transition">
                          <FontAwesomeIcon icon={faTrashCan} className="text-[10px]" /> Delete Forever
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 mb-0.5">Phone</p>
                    <p className="text-[12.5px] font-semibold text-slate-700">{selected.phone}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 mb-0.5">Received</p>
                    <p className="text-[12.5px] font-semibold text-slate-700">{selected.createdAt}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 sm:col-span-2">
                    <p className="text-[10px] text-slate-400 mb-0.5">Address</p>
                    <p className="text-[12.5px] font-semibold text-slate-700">{selected.address || "—"}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faEye} className="text-slate-400 text-xs" />
                    <p className="text-[12px] font-bold text-slate-600">Message</p>
                  </div>
                  <p className="text-[12.5px] text-slate-700 leading-relaxed whitespace-pre-line">{selected.message}</p>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesModule;