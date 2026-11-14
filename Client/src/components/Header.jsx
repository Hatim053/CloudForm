import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Signup.jsx";
import { useSelector } from "react-redux";
import logo from "../logo/logo.png";

const baseLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/templates", label: "Templates" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about-us", label: "About us" },
];

const ShieldIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const ChevronIcon = ({ className = "" }) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

function Header() {
    // ---------- LOGIC ----------
    const [open, setOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef(null);
    const loggedInUser = useSelector((state) => state?.user?.loggedInUser);

    const isLoggedIn = Boolean(loggedInUser);
    const isAdmin = isLoggedIn && loggedInUser?.role === "admin";

    // Account details shown in the dropdown
    const username = loggedInUser?.username || loggedInUser?.name || "User";
    const email = loggedInUser?.email || "";
    const role = loggedInUser?.role || "user";
    const initial = username.trim().charAt(0).toUpperCase() || "U";

    const links = useMemo(() => {
        const list = [...baseLinks];
        if (isLoggedIn) list.push({ to: "/my-forms", label: "My Forms" });
        return list;
    }, [isLoggedIn]);

    // Escape closes both menus; growing to desktop closes the mobile menu
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                setAccountOpen(false);
            }
        };
        const onResize = () => window.innerWidth >= 768 && setOpen(false);
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Click outside closes the account dropdown
    useEffect(() => {
        if (!accountOpen) return;
        const onDown = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setAccountOpen(false);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [accountOpen]);

    // Close everything if the user logs out
    useEffect(() => {
        if (!isLoggedIn) {
            setOpen(false);
            setAccountOpen(false);
        }
    }, [isLoggedIn]);

    // ---------- STYLES ----------
    const desktopLink = ({ isActive }) =>
        [
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive
                ? "bg-[#e6eee8] text-[#2f4d3a]"
                : "text-[#4b6455] hover:bg-[#f0f4f1] hover:text-[#2f4d3a]",
        ].join(" ");

    const mobileLink = ({ isActive }) =>
        [
            "block border-b border-l-4 border-b-[#e3ebe5] px-5 py-4 text-base font-medium transition-colors",
            isActive
                ? "border-l-[#f2a93b] bg-[#f4f7f4] text-[#2f4d3a]"
                : "border-l-transparent text-[#4b6455] hover:bg-[#f4f7f4]",
        ].join(" ");

    // Admin Panel: solid dark chip with an amber ring and amber icon
    const adminDesktopLink = ({ isActive }) =>
        [
            "flex items-center gap-2 rounded-lg bg-[#2f4d3a] px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3a5c46]",
            isActive ? "ring-2 ring-[#f2a93b]" : "ring-1 ring-inset ring-[#f2a93b]/60",
        ].join(" ");

    const adminMobileLink = ({ isActive }) =>
        [
            "flex items-center gap-3 bg-[#2f4d3a] px-5 py-4 text-base font-semibold text-white",
            isActive ? "border-l-4 border-l-[#f2a93b]" : "border-l-4 border-l-transparent",
        ].join(" ");

    const roleChip =
        role === "admin"
            ? "bg-[#2f4d3a] text-[#f2a93b]"
            : "bg-[#e6eee8] text-[#2f4d3a]";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#dfe8e1] bg-white/80 backdrop-blur-md">
            <div className="relative mx-auto max-w-6xl">
                <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        onClick={() => {
                            setOpen(false);
                            setAccountOpen(false);
                        }}
                        className="flex shrink-0 items-center gap-2.5"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f4d3a]">
                            <img src={logo} alt="" />
                        </span>
                        <span className="text-xl font-semibold tracking-tight text-[#2f4d3a]">
                            CloudForm<span className="text-[#f2a93b]">.</span>
                        </span>
                    </NavLink>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {links.map(({ to, label, end }) => (
                            <NavLink key={to} to={to} end={end} className={desktopLink}>
                                {label}
                            </NavLink>
                        ))}

                        {isAdmin && (
                            <>
                                <span className="mx-2 h-5 w-px bg-[#dfe8e1]" aria-hidden="true" />
                                <NavLink to="/admin-panel" className={adminDesktopLink}>
                                    <span className="text-[#f2a93b]">
                                        <ShieldIcon />
                                    </span>
                                    Admin Panel
                                </NavLink>
                            </>
                        )}
                    </nav>

                    {/* Account / Login + hamburger */}
                    <div className="flex items-center gap-2">
                        {isLoggedIn ? (
                            <div className="relative" ref={accountRef}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAccountOpen((v) => !v);
                                        setOpen(false);
                                    }}
                                    aria-label="Account menu"
                                    aria-haspopup="menu"
                                    aria-expanded={accountOpen}
                                    className="flex h-10 items-center gap-1.5 rounded-full border border-[#dfe8e1] bg-white py-1 pl-1 pr-2.5 text-[#4b6455] transition-colors hover:border-[#2f4d3a]/30 hover:bg-[#f4f7f4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b]"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2a93b] text-sm font-bold text-[#2f4d3a]">
                                        {initial}
                                    </span>
                                    <ChevronIcon
                                        className={`transition-transform ${accountOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {accountOpen && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#dfe8e1] bg-white shadow-lg"
                                    >
                                        <div className="flex items-center gap-3 px-4 py-4">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f2a93b] text-lg font-bold text-[#2f4d3a]">
                                                {initial}
                                            </span>
                                            <div className="min-w-0 space-y-0.5">
                                                <p className="truncate text-sm font-semibold text-[#2f4d3a]">
                                                    {username}
                                                </p>
                                                {email && (
                                                    <p className="truncate text-sm text-[#4b6455]">{email}</p>
                                                )}
                                                <span
                                                    className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${roleChip}`}
                                                >
                                                    {role}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="border-t border-[#e3ebe5] p-2">
                                            {/* Your existing Login component handles the logout action */}
                                            <Login name="Logout" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Login name="Login" />
                        )}

                        <button
                            type="button"
                            onClick={() => {
                                setOpen((v) => !v);
                                setAccountOpen(false);
                            }}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#2f4d3a] hover:bg-[#eef3ef] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] md:hidden"
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

                {/* Mobile dropdown: full-width list */}
                {open && (
                    <nav
                        id="mobile-menu"
                        className="absolute left-0 right-0 top-full overflow-hidden border-b border-[#dfe8e1] bg-white shadow-lg md:hidden"
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

                        {isAdmin && (
                            <NavLink
                                to="/admin-panel"
                                onClick={() => setOpen(false)}
                                className={adminMobileLink}
                            >
                                <span className="text-[#f2a93b]">
                                    <ShieldIcon />
                                </span>
                                Admin Panel
                            </NavLink>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;