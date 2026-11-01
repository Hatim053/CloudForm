import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Signup.jsx";

const links = [
    { to: "/", label: "Home", end: true },
    { to: "/templates", label: "Templates" },
    { to: "/pricing", label: "Pricing" },
    { to: "/admin-panel", label: "About us" },
];

function Header() {
    const [open, setOpen] = useState(false);

    // Close the menu with Escape, and when the screen grows to desktop size
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        const onResize = () => window.innerWidth >= 768 && setOpen(false);
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const desktopLink = ({ isActive }) =>
        isActive
            ? "border-b-2 border-[#f2a93b] pb-1 text-sm font-medium text-[#f2a93b]"
            : "border-b-2 border-transparent pb-1 text-sm font-medium text-[#cdd9cf] transition-colors hover:text-white";

    const mobileLink = ({ isActive }) =>
        isActive
            ? "block rounded-xl bg-[#3a5c46] px-4 py-3 text-base font-medium text-[#f2a93b]"
            : "block rounded-xl px-4 py-3 text-base font-medium text-[#cdd9cf] transition-colors hover:bg-[#3a5c46] hover:text-white";

    return (
        <header className="sticky top-0 z-50 w-full px-3 py-3 sm:px-4 sm:py-4">
            <div className="relative mx-auto max-w-6xl">
                {/* Main bar */}
                <div className="flex items-center justify-between gap-2 rounded-full bg-[#2f4d3a] px-3 py-2 sm:px-6 sm:py-3">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="flex shrink-0 items-center gap-2"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2a93b] sm:h-9 sm:w-9">
                            <span className="text-base font-bold text-[#2f4d3a] sm:text-lg">C</span>
                        </span>
                        <span className="text-lg font-semibold text-white sm:text-xl">
                            CloudForm<span className="text-[#f2a93b]">.</span>
                        </span>
                    </NavLink>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {links.map(({ to, label, end }) => (
                            <NavLink key={to} to={to} end={end} className={desktopLink}>
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Login + hamburger */}
                    <div className="flex items-center gap-2">
                        <Login name={"Login"} />

                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-[#3a5c46] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] md:hidden"
                        >
                            {open ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M4 7h16M4 12h16M4 17h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown */}
                {open && (
                    <nav
                        id="mobile-menu"
                        className="absolute left-0 right-0 top-full mt-2 rounded-3xl bg-[#2f4d3a] p-2 shadow-lg md:hidden"
                    >
                        {links.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                onClick={() => setOpen(false)}
                                className={mobileLink}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;