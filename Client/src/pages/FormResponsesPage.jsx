import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header.jsx";
import ResponsesList from "../components/ResponsesList.jsx";
import ResponseFilters from "../components/ResponseFilters.jsx";
import StatusToggle from "../components/StatusToggle.jsx";
import Pagination from "../components/Pagination.jsx";
import StateMessage from "../components/StateMessage.jsx";``
import useFetchFormResponses from "../CustomHooks/useFetchFormResponses.js";
import { EMPTY_FILTERS , countActiveFilters } from "../utils/analyticsFilters.js";
import { ANALYTICS_PATHS } from "../utils/analyticsPaths.js";

const STATUS_OPTIONS = [
  { value : "all" , label : "All" },
  { value : "completed" , label : "Completed" },
  { value : "partial" , label : "Partial" }
];

// the state lives in the inner component and it is keyed by formId ,
// so opening another form always starts from page 1 with no filters
function FormResponsesContent({ formId }) {
  const [status, setStatus] = useState("all");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const { form, responses, pagination, isLoading, error, reload } = useFetchFormResponses(formId , { ...filters , status , page });

  const changeStatus = (nextStatus) => {
    setStatus(nextStatus);
    setPage(1);
  };

  const applyFilters = (nextFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const hasActiveFilters = status !== "all" || countActiveFilters(filters) > 0;
  const total = pagination?.total ?? 0;
  const hasNothingToShow = !pagination; // the first request has not answered yet

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
      <Link to={ANALYTICS_PATHS.forms} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#5c6b60] hover:text-[#1a2b21]">
        <ArrowLeft size={15} />
        All forms
      </Link>

      <div className="mb-6">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Responses</p>
        <h1 className="break-words text-xl font-semibold text-[#1a2b21] sm:text-2xl">{form?.name ?? "Form responses"}</h1>
        {pagination && (
          <p className="mt-1 text-sm text-[#5c6b60]">
            {total} {total === 1 ? "response" : "responses"}
            {hasActiveFilters ? " match your filters" : ""}
          </p>
        )}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <StatusToggle value={status} onChange={changeStatus} options={STATUS_OPTIONS} />
        <ResponseFilters values={filters} onApply={applyFilters} />
      </div>

      {error ? (
        <StateMessage type="error" title="Could not load the responses" message={error} actionLabel="Try again" onAction={reload} />
      ) : hasNothingToShow ? (
        <StateMessage type="loading" title="Loading responses..." />
      ) : responses.length === 0 ? (
        <StateMessage
          type="empty"
          title={hasActiveFilters ? "No responses match these filters" : "No responses yet"}
          message={hasActiveFilters ? "Try removing a filter." : "Responses will show up here as people fill in your form."}
        />
      ) : (
        <>
          <ResponsesList responses={responses} isLoading={isLoading} />
          <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} disabled={isLoading} />
        </>
      )}
    </main>
  );
}

// step 2 of the creator analytics : the responses of one form
function FormResponsesPage() {
  const { formId } = useParams();

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      <Header />
      <FormResponsesContent key={formId} formId={formId} />
    </div>
  );
}

export default FormResponsesPage;