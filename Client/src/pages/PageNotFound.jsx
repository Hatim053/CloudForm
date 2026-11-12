import Header from "../components/Header.jsx";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#F3F1EC] pb-10 pt-0 font-sans">
      <div className="pt-4">
      <Header />
      </div>
 
      <main className="px-4 pt-12 sm:pt-16">
        <section className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#E3EBD6] px-8 py-16 sm:px-14 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2F4D3B]">
            Error 404
          </p>
 
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-[#262B27] sm:text-7xl">
            We couldn&rsquo;t find that page.
            <br />
            <span className="font-serif font-normal italic">
              It may have moved or never existed.
            </span>
          </h1>
 
          <a
            href="/"
            className="mt-12 inline-block rounded-full bg-[#2F4D3B] px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#263f30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A53A]"
          >
            Go to home
          </a>
        </section>
      </main>
    </div>
  );
}

export default PageNotFound;