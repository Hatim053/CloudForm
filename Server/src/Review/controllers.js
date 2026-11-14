import Review from "./model.js";
import { getDemoReviews } from "./demoReviews.js";


export const getReviews = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 6, 1), 24);

        const [reviews, total, stats] = await Promise.all([
            Review.find()
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Review.countDocuments(),
            Review.aggregate([{ $group: { _id: null, average: { $avg: "$rating" } } }]),
        ]);

        // Nothing in the database yet: serve placeholder reviews (pre-launch only).
        // Read the env var here, not at the top of the file, so dotenv has already loaded.
        if (total === 0 && process.env.SHOW_DEMO_REVIEWS !== "false") {
            const demo = getDemoReviews();
            const start = (page - 1) * limit;
            const demoAverage = demo.reduce((sum, r) => sum + r.rating, 0) / demo.length;

            return res.status(200).json({
                success: true,
                isDemo: true,
                reviews: demo.slice(start, start + limit),
                total: demo.length,
                page,
                pages: Math.max(Math.ceil(demo.length / limit), 1),
                averageRating: Number(demoAverage.toFixed(1)),
            });
        }

        const average = stats[0]?.average ?? 0;

        res.status(200).json({
            success: true,
            reviews,
            total,
            page,
            pages: Math.max(Math.ceil(total / limit), 1),
            averageRating: Number(average.toFixed(1)),
        });
    } catch (err) {
        console.error("getReviews error:", err);
        res.status(500).json({ success: false, message: "Could not load reviews." });
    }
};

// POST /api/reviews   body: { name, designation, rating, comment }
export const createReview = async (req, res) => {
    try {
        const { name, designation, rating, comment } = req.body;

        const numericRating = Number(rating);
        if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
            return res
                .status(400)
                .json({ success: false, message: "Please choose a rating between 1 and 5." });
        }

        // Only pick the fields we allow
        const review = await Review.create({
            name,
            designation,
            rating: numericRating,
            comment,
        });

        res.status(201).json({ success: true, review });
    } catch (err) {
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors)[0]?.message || "Invalid review data.";
            return res.status(400).json({ success: false, message });
        }
        console.error("createReview error:", err);
        res.status(500).json({ success: false, message: "Could not save your review." });
    }
};
