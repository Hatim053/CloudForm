import { useState } from "react";
import StarIcon from "./StarIcon.jsx";
import ReviewFormModal from "./ReviewFormModal.jsx";

import useReviews from "../../CustomHooks/useReviews.js";

const PAGE_SIZE = 6;

function timeAgo(dateStr) {
    const diff = (new Date(dateStr).getTime() - Date.now()) / 1000;
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const units = [
        ["year", 31536000],
        ["month", 2592000],
        ["week", 604800],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
    ];
    for (const [unit, secs] of units) {
        if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
    }
    return "just now";
}

const AVATARS = [
    ["#e6eee8", "#2f4d3a"],
    ["#fff1d6", "#8a5a0a"],
    ["#2f4d3a", "#f2a93b"],
    ["#dfe8e1", "#2f4d3a"],
];

function avatarColors(name = "") {
    const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return AVATARS[sum % AVATARS.length];
}

function Stars({ value, size = 16 }) {
    return (
        <div className="flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon key={n} filled={n <= Math.round(value)} size={size} />
            ))}
        </div>
    );
}

function ReviewCard({ review, highlight }) {
    const [bg, fg] = avatarColors(review.name);
    return (
        <article
            className={`flex flex-col rounded-2xl border bg-white p-6 ${
                highlight ? "border-[#f2a93b] ring-2 ring-[#f2a93b]/40" : "border-[#dfe8e1]"
            }`}
        >
            <div className="mb-4 flex items-center justify-between">
                <Stars value={review.rating} />
                {highlight && (
                    <span className="rounded-md bg-[#f2a93b] px-2 py-0.5 text-xs font-semibold text-[#2f4d3a]">
                        Just added
                    </span>
                )}
            </div>

            <p className="mb-6 flex-1 break-words text-[15px] leading-relaxed text-[#2f4d3a]">
                {review.comment}
            </p>

            <div className="flex items-center gap-3 border-t border-[#e3ebe5] pt-4">
                <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: bg, color: fg }}
                    aria-hidden="true"
                >
                    {review.name.trim().charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#2f4d3a]">{review.name}</p>
                    {review.designation && (
                        <p className="truncate text-xs text-[#4b6455]">{review.designation}</p>
                    )}
                </div>
                <time dateTime={review.createdAt} className="shrink-0 text-xs text-[#4b6455]">
                    {timeAgo(review.createdAt)}
                </time>
            </div>
        </article>
    );
}

function SkeletonCard() {
    return (
        <div className="animate-pulse rounded-2xl border border-[#dfe8e1] bg-white p-6">
            <div className="mb-5 h-4 w-24 rounded bg-[#e6eee8]" />
            <div className="mb-2.5 h-3 w-full rounded bg-[#e6eee8]" />
            <div className="mb-2.5 h-3 w-11/12 rounded bg-[#e6eee8]" />
            <div className="mb-8 h-3 w-2/3 rounded bg-[#e6eee8]" />
            <div className="flex items-center gap-3 border-t border-[#e3ebe5] pt-4">
                <div className="h-10 w-10 rounded-full bg-[#e6eee8]" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/2 rounded bg-[#e6eee8]" />
                    <div className="h-3 w-1/3 rounded bg-[#e6eee8]" />
                </div>
            </div>
        </div>
    );
}



function ReviewsSection({ ml = "ml-[2.5vw]", mr = "mr-[2.5vw]", mt = "mt-16 sm:mt-24" }) {
    // All data fetching lives in the hook; this component only handles display
    const {
        reviews,
        total,
        averageRating,
        status,
        error,
        hasMore,
        loadingMore,
        loadMoreError,
        justAddedId,
        refetch,
        loadMore,
        addReview,
    } = useReviews({ pageSize: PAGE_SIZE });

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section id="reviews" className={`${ml} ${mr} ${mt} font-dm`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-8">
                {/* Heading + summary */}
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="font-syne mb-3 text-3xl font-extrabold leading-tight tracking-tight text-[#2f4d3a] sm:text-4xl">
                            What our customers say
                        </h2>
                        <p className="text-base leading-relaxed text-[#4b6455]">
                            Honest feedback from people who build their forms with CloudForm.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        {status === "ready" && total > 0 && (
                            <div className="flex items-center gap-4">
                                <p className="font-syne text-5xl font-extrabold leading-none text-[#2f4d3a]">
                                    {averageRating.toFixed(1)}
                                </p>
                                <div>
                                    <Stars value={averageRating} size={18} />
                                    <p className="mt-1 text-sm text-[#4b6455]">
                                        from {total} {total === 1 ? "review" : "reviews"}
                                    </p>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="rounded-xl bg-[#f2a93b] px-6 py-3 text-sm font-bold text-[#2f4d3a] transition-colors hover:bg-[#f5b95c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f4d3a] focus-visible:ring-offset-2"
                        >
                            Write a review
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {status === "loading" && (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
                        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Error */}
                {status === "error" && (
                    <div className="rounded-2xl border border-[#dfe8e1] bg-[#f4f7f4] px-6 py-12 text-center">
                        <p className="mb-1 text-base font-semibold text-[#2f4d3a]">
                            We couldn't load the reviews
                        </p>
                        <p className="mb-5 text-sm text-[#4b6455]">{error}</p>
                        <button
                            type="button"
                            onClick={refetch}
                            className="rounded-xl bg-[#2f4d3a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3a5c46]"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {status === "ready" && reviews.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-[#c3d5c9] bg-[#f4f7f4] px-6 py-12 text-center">
                        <p className="mb-1 text-base font-semibold text-[#2f4d3a]">No reviews yet</p>
                        <p className="mb-5 text-sm text-[#4b6455]">
                            Be the first to tell others what you think.
                        </p>
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="rounded-xl bg-[#2f4d3a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3a5c46]"
                        >
                            Write the first review
                        </button>
                    </div>
                )}

                {/* Reviews */}
                {status === "ready" && reviews.length > 0 && (
                    <>
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {reviews.map((review) => (
                                <ReviewCard
                                    key={review._id}
                                    review={review}
                                    highlight={review._id === justAddedId}
                                />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="mt-8 text-center">
                                <button
                                    type="button"
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    className="rounded-xl border border-[#2f4d3a]/25 bg-white px-6 py-3 text-sm font-semibold text-[#2f4d3a] transition-colors hover:border-[#2f4d3a]/50 disabled:opacity-60"
                                >
                                    {loadingMore ? "Loading..." : "Show more reviews"}
                                </button>
                                {loadMoreError && (
                                    <p role="alert" className="mt-2 text-sm text-red-600">
                                        {loadMoreError}
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {modalOpen && (
                <ReviewFormModal onClose={() => setModalOpen(false)} onSubmit={addReview} />
            )}
        </section>
    );
}

export default ReviewsSection;