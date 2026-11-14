import { useEffect, useRef, useState } from "react";
import StarIcon from "./StarIcon.jsx";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

const inputClass =
    "w-full rounded-lg border border-[#dfe8e1] bg-[#f4f7f4] px-3 py-2.5 text-sm text-[#2f4d3a] placeholder:text-[#8aa093] focus:border-[#2f4d3a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f2a93b]/40";

function validate(form) {
    const errors = {};
    const name = form.name.trim();
    const comment = form.comment.trim();

    if (name.length < 2) errors.name = "Please enter your name (at least 2 characters).";
    if (!form.rating) errors.rating = "Please choose a star rating.";
    if (comment.length < 10) errors.comment = "Tell us a bit more (at least 10 characters).";
    return errors;
}

/**
 * onSubmit(payload) should return a promise (pass the hook's addReview).
 * The modal stays in its "sending" state until it resolves, and shows the
 * error message if it throws.
 */
function ReviewFormModal({ onClose, onSubmit }) {
    const [form, setForm] = useState({ name: "", designation: "", rating: 0, comment: "" });
    const [hover, setHover] = useState(0);
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const nameRef = useRef(null);

    // Focus the first field, lock page scroll, close on Escape
    useEffect(() => {
        nameRef.current?.focus();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e) => {
            if (e.key === "Escape" && !submitting) onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose, submitting]);

    const update = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        setFieldErrors((errs) => ({ ...errs, [field]: undefined }));
    };

    const setRating = (n) => {
        setForm((f) => ({ ...f, rating: n }));
        setFieldErrors((errs) => ({ ...errs, rating: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(form);
        setFieldErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setSubmitting(true);
        setError("");
        try {
            await onSubmit({
                name: form.name.trim(),
                designation: form.designation.trim(),
                rating: form.rating,
                comment: form.comment.trim(),
            });
            onClose();
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    const shownRating = hover || form.rating;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !submitting) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="review-form-title"
                className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl"
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h3
                            id="review-form-title"
                            className="font-syne text-xl font-extrabold text-[#2f4d3a]"
                        >
                            Write a review
                        </h3>
                        <p className="text-sm text-[#4b6455]">
                            Share how CloudForm worked for you.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        aria-label="Close"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#4b6455] hover:bg-[#eef3ef] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] disabled:opacity-50"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Rating */}
                    <div>
                        <p className="mb-1.5 text-sm font-medium text-[#2f4d3a]">Your rating</p>
                        <div className="flex items-center gap-3">
                            <div
                                role="radiogroup"
                                aria-label="Rating"
                                className="flex gap-1"
                                onMouseLeave={() => setHover(0)}
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        role="radio"
                                        aria-checked={form.rating === n}
                                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                                        onMouseEnter={() => setHover(n)}
                                        onClick={() => setRating(n)}
                                        className="rounded p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b]"
                                    >
                                        <StarIcon filled={n <= shownRating} size={32} />
                                    </button>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-[#4b6455]">
                                {RATING_LABELS[shownRating]}
                            </span>
                        </div>
                        {fieldErrors.rating && (
                            <p className="mt-1 text-xs text-red-600">{fieldErrors.rating}</p>
                        )}
                    </div>

                    {/* Name + designation */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="review-name" className="mb-1.5 block text-sm font-medium text-[#2f4d3a]">
                                Your name
                            </label>
                            <input
                                id="review-name"
                                ref={nameRef}
                                type="text"
                                value={form.name}
                                onChange={update("name")}
                                maxLength={60}
                                placeholder="Asha Verma"
                                className={inputClass}
                            />
                            {fieldErrors.name && (
                                <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="review-designation" className="mb-1.5 block text-sm font-medium text-[#2f4d3a]">
                                Role and company <span className="font-normal text-[#8aa093]">(optional)</span>
                            </label>
                            <input
                                id="review-designation"
                                type="text"
                                value={form.designation}
                                onChange={update("designation")}
                                maxLength={80}
                                placeholder="Founder, Brewhouse"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label htmlFor="review-comment" className="mb-1.5 block text-sm font-medium text-[#2f4d3a]">
                            Your review
                        </label>
                        <textarea
                            id="review-comment"
                            value={form.comment}
                            onChange={update("comment")}
                            maxLength={500}
                            rows={4}
                            placeholder="What did you build, and how did it go?"
                            className={`${inputClass} resize-none`}
                        />
                        <div className="mt-1 flex items-start justify-between gap-3">
                            <p className="text-xs text-red-600">{fieldErrors.comment}</p>
                            <p className="shrink-0 text-xs text-[#8aa093]">{form.comment.length}/500</p>
                        </div>
                    </div>

                    {error && (
                        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="rounded-xl border border-[#2f4d3a]/25 px-6 py-3 text-sm font-semibold text-[#2f4d3a] transition-colors hover:border-[#2f4d3a]/50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-xl bg-[#2f4d3a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3a5c46] disabled:opacity-60"
                        >
                            {submitting ? "Posting..." : "Post review"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewFormModal;