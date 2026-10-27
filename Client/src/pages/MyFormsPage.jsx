import Header from "../components/Header.jsx";
import FormCard from "../components/FormCard.jsx";
import StateMessage from "../components/StateMessage.jsx";
import useFetchMyForms from "../CustomHooks/useFetchMyForms.js";

// step 1 of the creator analytics : pick the form whose responses you want to see
function MyFormsPage() {
  const { forms, isLoading, error, reload } = useFetchMyForms();

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      <Header />

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Analytics</p>
          <h1 className="text-xl font-semibold text-[#1a2b21] sm:text-2xl">Your forms</h1>
          <p className="mt-1 text-sm text-[#5c6b60]">Pick a form to see who responded and how far they got.</p>
        </div>

        {error ? (
          <StateMessage type="error" title="Could not load your forms" message={error} actionLabel="Try again" onAction={reload} />
        ) : isLoading ? (
          <StateMessage type="loading" title="Loading your forms..." />
        ) : forms.length === 0 ? (
          <StateMessage type="empty" title="No forms yet" message="Forms you publish will show up here." />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <FormCard key={form._id} form={form} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyFormsPage;