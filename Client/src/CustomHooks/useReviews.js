import { useCallback, useEffect, useRef, useState } from "react";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const ENDPOINTS = {
    list: `${BASE_URL}/reviews/get`,
    create: `${BASE_URL}/reviews/create`, 
};

async function request(url, options = {}) {
    let res;
    try {
        res = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            ...options,
        });
    } catch {
        throw new Error("Could not reach the server. Check your connection and try again.");
    }

    let data = null;
    try {
        data = await res.json();
    } catch {
        // response had no JSON body
    }

    if (!res.ok) {
        throw new Error(data?.message || "Something went wrong. Please try again.");
    }
    return data;
}

/**
 * Loads, paginates and creates reviews.
 *
 * Expected backend responses:
 *   GET  -> { success, reviews: [...], total, page, pages, averageRating }
 *   POST -> { success, review: {...} }
 *
 * Returns:
 *   reviews, total, averageRating   the data
 *   status                          "loading" | "ready" | "error"
 *   error                           message when status is "error"
 *   hasMore, loadingMore            pagination state
 *   loadMoreError                   message if loading the next page failed
 *   justAddedId                     _id of the review added in the last few seconds
 *   refetch()                       reload the first page (shows the loading state)
 *   loadMore()                      append the next page
 *   addReview(payload)              POST a review, then refetch the list. Throws on failure.
 */
function useReviews({ pageSize = 6 } = {}) {
    const [reviews, setReviews] = useState([]);
    const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1, averageRating: 0 });
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadMoreError, setLoadMoreError] = useState("");
    const [justAddedId, setJustAddedId] = useState(null);

    // Avoid setting state after the component using the hook has unmounted
    const mounted = useRef(true);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const fetchPage = useCallback(
        (page) => request(`${ENDPOINTS.list}?page=${page}&limit=${pageSize}`),
        [pageSize]
    );

    const toMeta = (data, fallbackPage = 1) => ({
        total: data.total ?? 0,
        page: data.page ?? fallbackPage,
        pages: data.pages ?? 1,
        averageRating: Number(data.averageRating) || 0,
    });

    // Initial load, also used for the "Try again" button
    const refetch = useCallback(async () => {
        setStatus("loading");
        setError("");
        try {
            const data = await fetchPage(1);
            if (!mounted.current) return;
            setReviews(data.reviews || []);
            setMeta(toMeta(data));
            setStatus("ready");
        } catch (err) {
            if (!mounted.current) return;
            setError(err.message);
            setStatus("error");
        }
    }, [fetchPage]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    // Append the next page, skipping any review we already have
    const loadMore = useCallback(async () => {
        if (loadingMore || meta.page >= meta.pages) return;
        setLoadingMore(true);
        setLoadMoreError("");
        try {
            const data = await fetchPage(meta.page + 1);
            if (!mounted.current) return;
            setReviews((prev) => {
                const seen = new Set(prev.map((r) => r._id));
                return [...prev, ...(data.reviews || []).filter((r) => !seen.has(r._id))];
            });
            setMeta(toMeta(data, meta.page + 1));
        } catch (err) {
            if (mounted.current) setLoadMoreError(err.message);
        } finally {
            if (mounted.current) setLoadingMore(false);
        }
    }, [fetchPage, loadingMore, meta.page, meta.pages]);

    // POST a new review, then refetch so the list comes from the database
    const addReview = useCallback(
        async (payload) => {
            const created = await request(ENDPOINTS.create, {
                method: "POST",
                body: JSON.stringify(payload),
            });
            const review = created.review;

            try {
                const data = await fetchPage(1);
                if (mounted.current) {
                    setReviews(data.reviews || []);
                    setMeta(toMeta(data));
                }
            } catch {
                // Refetch failed: still show the review the server just returned
                if (mounted.current && review) {
                    setReviews((prev) => [review, ...prev]);
                    setMeta((m) => ({ ...m, total: m.total + 1 }));
                }
            }

            if (mounted.current) {
                setStatus("ready");
                setJustAddedId(review?._id ?? null);
            }
            return review;
        },
        [fetchPage]
    );

    // Clear the "just added" marker after a few seconds
    useEffect(() => {
        if (!justAddedId) return undefined;
        const t = setTimeout(() => setJustAddedId(null), 6000);
        return () => clearTimeout(t);
    }, [justAddedId]);

    return {
        reviews,
        total: meta.total,
        averageRating: meta.averageRating,
        status,
        error,
        hasMore: meta.page < meta.pages,
        loadingMore,
        loadMoreError,
        justAddedId,
        refetch,
        loadMore,
        addReview,
    };
}

export default useReviews;