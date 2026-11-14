// Placeholder reviews returned by GET /reviews while the database has none.
// Remove this file (or set SHOW_DEMO_REVIEWS=false) before launch.

const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

// A function, so the dates are relative to "now" on every request
export const getDemoReviews = () => [
    {
        _id: "demo-1",
        name: "Priya Sharma",
        designation: "Operations Lead, Brewhouse Cafe",
        rating: 5,
        comment:
            "We replaced three different tools with CloudForm. The feedback form took ten minutes to set up, and the AI suggested questions I hadn't thought of.",
        createdAt: daysAgo(2),
    },
    {
        _id: "demo-2",
        name: "Rahul Mehta",
        designation: "Founder, Pixel & Co",
        rating: 5,
        comment:
            "Our clients fill in project briefs through a CloudForm template now. The analytics show exactly where people drop off, which helped us cut the form in half.",
        createdAt: daysAgo(6),
    },
    {
        _id: "demo-3",
        name: "Ananya Iyer",
        designation: "HR Manager, Northwind Logistics",
        rating: 4,
        comment:
            "Great for job applications and onboarding checklists. I'd love more export options, but the response tracking alone saves me hours every week.",
        createdAt: daysAgo(11),
    },
    {
        _id: "demo-4",
        name: "Karan Malhotra",
        designation: "Product Manager, Finlytics",
        rating: 5,
        comment:
            "We run user surveys after every release. The live responses view and AI summary mean I can share results with the team the same afternoon.",
        createdAt: daysAgo(18),
    },
    {
        _id: "demo-5",
        name: "Sneha Kulkarni",
        designation: "Event Coordinator, Bloom Weddings",
        rating: 4,
        comment:
            "RSVP forms used to be a mess of spreadsheets. Guests fill in meal choices on their phones, and everything lands in one place. Setup was very easy.",
        createdAt: daysAgo(27),
    },
    {
        _id: "demo-6",
        name: "Vikram Singh",
        designation: "Freelance Designer",
        rating: 5,
        comment:
            "The forms look good without any tweaking, which is rare. Clients assume I hired a developer. Starting from a template made it even faster.",
        createdAt: daysAgo(40),
    },
];