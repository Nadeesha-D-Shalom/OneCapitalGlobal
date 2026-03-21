import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Market Data", to: "/" },
  { label: "Logistics & Services", to: "/logistics" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Our Company", to: "/company" },
  { label: "Blogs", to: "/blogs" },
  { label: "Insights", to: "/insights" },
  { label: "Contact Us", to: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* =====================
          TOP BAR
      ===================== */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-base font-extrabold text-[#0b1f3a] tracking-tight shrink-0">
            One Capital <span className="text-orange-500">Global</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-orange-500 transition font-medium ${
                  location.pathname === link.to ? "text-orange-500" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-5 bg-[#0b1f3a] rounded transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[#0b1f3a] rounded transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[#0b1f3a] rounded transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>

        </div>
      </header>

      {/* =====================
          MOBILE DRAWER
      ===================== */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <span className="text-sm font-extrabold text-[#0b1f3a]">
            One Capital <span className="text-orange-500">Global</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition text-xs"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                location.pathname === link.to
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#0b1f3a]"
              }`}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {link.label}
              {location.pathname === link.to && (
                <i className="fa-solid fa-arrow-right text-[10px] text-orange-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-5 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
            Live Market Data · LKR
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;