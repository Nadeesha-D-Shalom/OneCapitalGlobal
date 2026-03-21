import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper, faPlus, faPen, faTrash,
  faXmark, faArrowLeft, faEye, faCalendar,
  faUser, faTag, faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

/* ========================
   DEFAULT SAMPLE DATA
======================== */
const defaultBlogs = [
  {
    id: 1,
    title: "Understanding Global Commodity Price Trends in 2026",
    category: "Market Insights",
    author: "Admin",
    date: "2026-03-10",
    status: "Published",
    excerpt: "A deep dive into how geopolitical shifts, climate patterns, and supply chain disruptions are shaping commodity prices across Asia and global markets.",
    content: `Global commodity markets in 2026 are experiencing unprecedented volatility driven by several converging factors. Climate-related disruptions in key agricultural regions have significantly reduced supply, while demand from emerging markets continues to grow.

Sri Lanka, as a key importer of essential commodities such as rice, wheat, and sugar, faces unique challenges in navigating these shifts. Our analysis shows that prices for staple grains have risen by an average of 12% in Q1 2026 compared to the same period last year.

Key drivers include:
- Extended monsoon delays in South Asia affecting rice production
- Wheat supply constraints following drought conditions in major exporting countries
- Increased shipping costs due to fuel price fluctuations

Importers and distributors should consider forward contracts and diversified sourcing strategies to manage risk effectively in this environment.`,
  },
  {
    id: 2,
    title: "How One Capital Global Is Transforming Import Logistics",
    category: "Company News",
    author: "Admin",
    date: "2026-02-28",
    status: "Published",
    excerpt: "From direct sourcing partnerships to island-wide distribution — an inside look at how we streamline the supply chain from producer to end buyer.",
    content: `One Capital Global has built a vertically integrated supply chain model that connects global producers directly to Sri Lankan distributors and retailers, eliminating costly intermediaries at every stage.

Our logistics framework covers three core pillars:

1. Direct Sourcing: We maintain long-term partnerships with producers in 20+ countries, enabling us to negotiate better pricing and guaranteed supply volumes.

2. Warehousing: With 50+ storage facilities across the island, we ensure optimal inventory management and cold chain compliance for perishable goods.

3. Distribution: Our 200+ delivery routes cover all major commercial zones, enabling next-day delivery for bulk orders placed before 2 PM.

This integrated approach has allowed us to reduce the average time-to-delivery by 35% while maintaining competitive pricing for our partners.`,
  },
  {
    id: 3,
    title: "Rice Market Outlook: Q2 2026 Forecast",
    category: "Market Insights",
    author: "Admin",
    date: "2026-03-15",
    status: "Published",
    excerpt: "Our quarterly analysis forecasts moderate price stabilization for rice imports as new harvest cycles begin across key producing nations.",
    content: `Following the sharp price increases seen in Q1 2026, our market analysts project a moderate stabilization in rice prices during Q2 as new harvest cycles begin in Vietnam, Thailand, and India — three of Sri Lanka's primary rice import sources.

Key forecast indicators:
- Vietnamese export volumes expected to increase by 8% in April–May
- Thai jasmine rice premiums likely to remain elevated due to domestic demand
- Indian basmati exports projected stable pending policy decisions

For Sri Lankan importers, this creates an opportunity to secure forward contracts at current prices before any further supply shocks. Our team recommends locking in 60–90 day contracts for standard white rice and long-grain varieties.

We will continue to monitor developments and update our market data platform in real time.`,
  },
  {
    id: 4,
    title: "Warehousing Best Practices for Bulk Commodity Storage",
    category: "Operations",
    author: "Admin",
    date: "2026-01-20",
    status: "Draft",
    excerpt: "Proper storage techniques can significantly reduce spoilage losses. This guide covers temperature, humidity, and pest control standards for grain storage.",
    content: `Effective warehousing is critical to maintaining commodity quality from port arrival to final delivery. Poor storage practices can result in spoilage losses of 5–15%, directly impacting profitability.

Core standards for bulk grain storage:

Temperature Management:
- Rice and wheat should be stored at 15–18°C to prevent moisture absorption
- Regular temperature logging every 6 hours is recommended for large volumes

Humidity Control:
- Target relative humidity of 60–65% for most dry commodities
- Desiccant systems or climate-controlled environments are preferred for high-value goods

Pest Control:
- Bi-weekly inspection schedules with licensed pest control partners
- Use of food-safe fumigation protocols for long-term storage

Inventory Rotation:
- Strict FIFO (First In, First Out) rotation policy
- Digital inventory tracking integrated with delivery scheduling

Following these standards has allowed our facilities to maintain a spoilage rate below 0.5%, well below the industry average of 3–5%.`,
  },
];

/* ========================
   CATEGORIES
======================== */
const CATEGORIES = ["Market Insights", "Company News", "Operations", "Trade & Policy", "Other"];
const STATUSES   = ["Published", "Draft"];

/* ========================
   EMPTY FORM
======================== */
const emptyForm = { title: "", category: "", author: "Admin", date: "", status: "Draft", excerpt: "", content: "" };

/* ========================
   MAIN COMPONENT
======================== */
const BlogsModule = () => {
  const [blogs, setBlogs]       = useState([]);
  const [view, setView]         = useState("list");   // "list" | "detail" | "form"
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError]       = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("blog_posts");
    if (stored) { setBlogs(JSON.parse(stored)); }
    else { setBlogs(defaultBlogs); localStorage.setItem("blog_posts", JSON.stringify(defaultBlogs)); }
  }, []);

  const persist = (data) => { setBlogs(data); localStorage.setItem("blog_posts", JSON.stringify(data)); };

  /* ── Handlers ── */
  const openNew = () => {
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] });
    setEditingId(null);
    setError("");
    setView("form");
  };

  const openEdit = (blog) => {
    setForm({ title: blog.title, category: blog.category, author: blog.author, date: blog.date, status: blog.status, excerpt: blog.excerpt, content: blog.content });
    setEditingId(blog.id);
    setError("");
    setView("form");
  };

  const openDetail = (blog) => { setSelected(blog); setView("detail"); };

  const handleSave = () => {
    if (!form.title.trim() || !form.category || !form.content.trim()) {
      setError("Title, category, and content are required."); return;
    }
    if (editingId) {
      const updated = blogs.map((b) => b.id === editingId ? { ...b, ...form } : b);
      persist(updated);
    } else {
      persist([{ id: Date.now(), ...form }, ...blogs]);
    }
    setView("list");
    setEditingId(null);
    setError("");
  };

  const handleDelete = (id) => {
    persist(blogs.filter((b) => b.id !== id));
    if (selected?.id === id) setSelected(null);
    if (view === "detail") setView("list");
    setDeleteConfirm(null);
  };

  const inputCls  = "w-full border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-[12.5px] text-[#0b1f3a] placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition";
  const labelCls  = "text-[11px] font-semibold text-slate-500 mb-1 block";

  const published = blogs.filter((b) => b.status === "Published").length;
  const drafts    = blogs.filter((b) => b.status === "Draft").length;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* ── Module Header ── */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {(view === "detail" || view === "form") && (
              <button onClick={() => setView("list")} className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition mr-1">
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              </button>
            )}
            <div className="h-6 w-1 rounded-full bg-orange-500" />
            <div>
              <p className="text-[13px] font-extrabold text-[#0b1f3a] leading-none">
                {view === "form" ? (editingId ? "Edit Blog Post" : "New Blog Post") : view === "detail" ? "Blog Detail" : "Blogs"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {view === "list" ? `${published} published · ${drafts} drafts` : view === "detail" ? selected?.title : "Fill in the details below"}
              </p>
            </div>
          </div>

          {view === "list" && (
            <button onClick={openNew} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white px-3.5 py-2 rounded-xl text-[12px] font-bold transition shadow-sm shadow-orange-200">
              <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
              New Post
            </button>
          )}
          {view === "detail" && (
            <div className="flex gap-2">
              <button onClick={() => openEdit(selected)} className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-xl text-[12px] font-semibold transition">
                <FontAwesomeIcon icon={faPen} className="text-[10px]" /> Edit
              </button>
              <button onClick={() => setDeleteConfirm(selected.id)} className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 px-3 py-1.5 rounded-xl text-[12px] font-semibold transition">
                <FontAwesomeIcon icon={faTrash} className="text-[10px]" /> Delete
              </button>
            </div>
          )}
          {view === "form" && (
            <button onClick={() => { setView("list"); setError(""); }} className="flex items-center gap-1.5 border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-xl text-[12px] font-semibold transition">
              <FontAwesomeIcon icon={faXmark} className="text-[10px]" /> Cancel
            </button>
          )}
        </div>

        {/* ══════════════════════
            LIST VIEW
        ══════════════════════ */}
        {view === "list" && (
          <div>
            {blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-slate-400">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faNewspaper} className="text-slate-400" />
                </div>
                <p className="text-[12.5px]">No blog posts yet. Create your first post.</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden lg:block overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[#0b1f3a] text-white text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Title</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                          <td className="px-5 py-3.5 max-w-[280px]">
                            <p className="text-[13px] font-bold text-[#0b1f3a] truncate">{blog.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5 truncate">{blog.excerpt}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium">{blog.category}</span>
                          </td>
                          <td className="px-4 py-3.5 text-[12px] text-slate-500">{blog.date}</td>
                          <td className="px-4 py-3.5">
                            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${blog.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex gap-1.5">
                              <button onClick={() => openDetail(blog)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition">
                                <FontAwesomeIcon icon={faEye} className="text-[10px]" />
                              </button>
                              <button onClick={() => openEdit(blog)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                                <FontAwesomeIcon icon={faPen} className="text-[10px]" />
                              </button>
                              <button onClick={() => setDeleteConfirm(blog.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
                                <FontAwesomeIcon icon={faTrash} className="text-[10px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 lg:hidden">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-[13px] font-bold text-[#0b1f3a] leading-snug line-clamp-2">{blog.title}</p>
                        <span className={`shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-semibold ${blog.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                          {blog.status}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-400 leading-relaxed line-clamp-2 mb-3">{blog.excerpt}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{blog.category}</span>
                        <span className="text-[10px] text-slate-400">{blog.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openDetail(blog)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-[11.5px] font-semibold hover:bg-slate-200 transition">
                          <FontAwesomeIcon icon={faEye} className="text-[9px]" /> View
                        </button>
                        <button onClick={() => openEdit(blog)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[11.5px] font-semibold hover:bg-blue-100 transition">
                          <FontAwesomeIcon icon={faPen} className="text-[9px]" /> Edit
                        </button>
                        <button onClick={() => setDeleteConfirm(blog.id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl bg-red-50 text-red-500 text-[11.5px] font-semibold hover:bg-red-100 transition">
                          <FontAwesomeIcon icon={faTrash} className="text-[9px]" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ══════════════════════
            DETAIL VIEW
        ══════════════════════ */}
        {view === "detail" && selected && (
          <div className="p-5 sm:p-6 space-y-4">

            {/* Meta */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${selected.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                {selected.status}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                <FontAwesomeIcon icon={faTag} className="text-[9px]" />{selected.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                <FontAwesomeIcon icon={faCalendar} className="text-[9px]" />{selected.date}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                <FontAwesomeIcon icon={faUser} className="text-[9px]" />{selected.author}
              </span>
            </div>

            <h2 className="text-[16px] font-extrabold text-[#0b1f3a] leading-snug">{selected.title}</h2>

            <p className="text-[12.5px] text-slate-500 leading-relaxed italic border-l-2 border-orange-300 pl-3">
              {selected.excerpt}
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5">
              <p className="text-[12.5px] text-slate-700 leading-[1.85] whitespace-pre-line">{selected.content}</p>
            </div>
          </div>
        )}

        {/* ══════════════════════
            FORM VIEW (Add / Edit)
        ══════════════════════ */}
        {view === "form" && (
          <div className="p-5 sm:p-6 space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Title *</label>
                <input
                  placeholder="Blog post title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelCls}>Category *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className={labelCls}>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputCls}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className={labelCls}>Author</label>
                <input
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className={inputCls}
                />
              </div>

              {/* Date */}
              <div>
                <label className={labelCls}>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputCls}
                />
              </div>

              {/* Excerpt */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Excerpt</label>
                <textarea
                  rows={2}
                  placeholder="Short summary shown in the blog list"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Content */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Content *</label>
                <textarea
                  rows={10}
                  placeholder="Full blog post content..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className={`${inputCls} resize-y`}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3 py-2.5 text-[12px] text-red-500">
                <FontAwesomeIcon icon={faXmark} className="text-[10px] shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button onClick={handleSave} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-xl text-[12.5px] font-bold transition shadow-sm shadow-orange-200">
                <FontAwesomeIcon icon={faFloppyDisk} className="text-[10px]" />
                {editingId ? "Save Changes" : "Publish Post"}
              </button>
              <button onClick={() => { setView("list"); setError(""); }} className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 text-[12.5px] font-semibold transition">
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ══════════════════════
          DELETE CONFIRM MODAL
      ══════════════════════ */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setDeleteConfirm(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            style={{ animation: "modalIn 0.2s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 bg-[#0b1f3a] px-5 py-4 border-b border-white/10">
              <div className="h-6 w-1 rounded-full bg-red-500" />
              <p className="text-[13px] font-extrabold text-white">Delete Blog Post</p>
              <button onClick={() => setDeleteConfirm(null)} className="ml-auto h-7 w-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-[12.5px] text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete this post? This action cannot be undone.
              </p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2.5 rounded-xl text-[12.5px] font-bold transition">
                  Yes, Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 py-2.5 rounded-xl text-[12.5px] font-semibold transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BlogsModule;