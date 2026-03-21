import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = ({ title, setOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition shrink-0"
        >
          <FontAwesomeIcon icon={faBars} className="text-sm" />
        </button>

        <div className="min-w-0">
          <h2 className="text-[14px] font-extrabold text-[#0b1f3a] truncate leading-none">{title}</h2>
          <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">Admin management interface</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500 border border-red-200 hover:border-red-500 text-red-500 hover:text-white px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 shrink-0"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-[10px]" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default Header;