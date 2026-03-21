import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faWrench } from "@fortawesome/free-solid-svg-icons";

const PortfolioModule = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                <div className="h-6 w-1 rounded-full bg-orange-500" />
                <div>
                    <p className="text-[13px] font-extrabold text-[#0b1f3a] leading-none">Portfolio</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Manage portfolio entries and showcases</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                <div className="h-14 w-14 rounded-2xl bg-violet-50 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBriefcase} className="text-violet-400 text-xl" />
                </div>
                <div>
                    <p className="text-[13px] font-bold text-[#0b1f3a]">Portfolio CRUD Coming Soon</p>
                    <p className="text-[12px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                        Full portfolio management with image upload, title, category, and description handling will be added next.
                    </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11.5px]">
                    <FontAwesomeIcon icon={faWrench} className="text-[10px]" />
                    In Development
                </div>
            </div>
        </div>
    );
};

export default PortfolioModule;