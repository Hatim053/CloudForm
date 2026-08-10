import Signup from "./Signup.jsx";
import { NavLink } from "react-router-dom";

function Header() {

    return (
        <header className="w-full px-4 py-4">
            <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-[#2f4d3a] px-6 py-3">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2a93b]">
                        <span className="text-lg font-bold text-[#2f4d3a]">C</span>
                    </span>
                    <span className="text-xl font-semibold text-white">
                        CloudForm<span className="text-[#f2a93b]">.</span>
                    </span>
                </div>

                <nav className="hidden items-center gap-8 md:flex">
                    <NavLink to={"/"} className="border-b-2 border-[#f2a93b] pb-1 text-sm font-medium text-[#f2a93b]">
                        Home
                    </NavLink>
                    <NavLink to={"/templates"} className="text-sm font-medium text-[#cdd9cf]">
                        templates
                    </NavLink>
                    <span className="text-sm font-medium text-[#cdd9cf]">
                        pricing
                    </span>
                    <span className="text-sm font-medium text-[#cdd9cf]">
                        About us
                    </span>
                </nav>

                {/* Login / Logout */}
                <Signup name={"Login"} />
            </div>
        </header>

    )
};

export default Header;