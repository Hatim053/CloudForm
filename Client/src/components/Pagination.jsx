import { ChevronLeft, ChevronRight } from "lucide-react";

const buttonClass = "flex cursor-pointer items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1a2b21] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-[#f4f3ef] disabled:cursor-not-allowed disabled:opacity-50";

function Pagination({ page , totalPages , onPageChange , disabled = false }) {
  if(!totalPages || totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-5 flex items-center justify-between gap-3">
      <button type="button" className={buttonClass} disabled={disabled || page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft size={16} />
        Previous
      </button>
      <span className="text-sm text-[#5c6b60]">
        Page {page} of {totalPages}
      </span>
      <button type="button" className={buttonClass} disabled={disabled || page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

export default Pagination;