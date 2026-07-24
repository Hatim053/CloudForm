import GoogleSignup from './Components/Signup.jsx';



function App() {


  return (
  //  <GoogleLogin />
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
 
        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          <span className="border-b-2 border-[#f2a93b] pb-1 text-sm font-medium text-[#f2a93b]">
            Home
          </span>
          <span className="text-sm font-medium text-[#cdd9cf]">
            templates
          </span>
          <span className="text-sm font-medium text-[#cdd9cf]">
            pricing
          </span>
          <span className="text-sm font-medium text-[#cdd9cf]">
            About us
          </span>
        </nav>
 
        {/* Login / Logout */}
        {/* {formElementsMap.map((obj) => obj.element("Signup"))}; */}
        <GoogleSignup />
      </div>
    </header>

  )
}

export default App;