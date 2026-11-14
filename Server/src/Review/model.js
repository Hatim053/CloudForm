import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [60, "Name can be at most 60 characters"],
        },
        // Role and company, for example "Founder, Brewhouse"
        designation: {
            type: String,
            trim: true,
            maxlength: [80, "Role and company can be at most 80 characters"],
            default: "",
        },
        rating: {
            type: Number,
            required: [true, "Please choose a rating between 1 and 5"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating can be at most 5"],
            validate: {
                validator: Number.isInteger,
                message: "Rating must be a whole number",
            },
        },
        comment: {
            type: String,
            required: [true, "Review text is required"],
            trim: true,
            minlength: [10, "Review must be at least 10 characters"],
            maxlength: [500, "Review can be at most 500 characters"],
        },
    },
    { timestamps: true } // adds createdAt and updatedAt
);

// Newest first is the default listing order
reviewSchema.index({ createdAt: -1 });

const Review = mongoose.model("Review" , reviewSchema);

export default Review;