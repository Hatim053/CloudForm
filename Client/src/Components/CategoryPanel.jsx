import {
    LayoutGrid, Star, MessageSquareText, CalendarCheck2, Briefcase,
    GraduationCap, HeartHandshake, ShoppingBag,
} from "lucide-react";

const categories = [
    { icon: LayoutGrid, label: "All Templates" },
    { icon: Star, label: "Influencers" },
    { icon: MessageSquareText, label: "Feedback & surveys" },
    { icon: CalendarCheck2, label: "Events & RSVP" },
    { icon: Briefcase, label: "HR & hiring" },
    { icon: GraduationCap, label: "Education" },
    { icon: HeartHandshake, label: "Nonprofit" },
    { icon: ShoppingBag, label: "Orders & requests" },
];

function CategoryPanel({ selectedCategory , setSelectedCategory }) {

    return (
        <div className="col-span-3 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
                Browse by category
            </p>
            <p className="mb-4 text-sm text-[#5c6b60]">
                Find a template close to what you need
            </p>

            <div className="flex flex-col gap-2">
                {categories.map(({ icon: Icon, label }, i) => {
                    const active = label === selectedCategory ? true : false;
                    return (
                    <div
                        key={i}
                        onClick={() => setSelectedCategory(label)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-3 cursor-pointer ${active ? "bg-[#fdf6e8]" : "bg-[#f4f3ef]"
                            }`}
                    >
                        <Icon
                            size={16}
                            className={active ? "text-[#2c4a3b]" : "text-[#8a9690]"}
                        />
                        <span
                            className={`text-sm font-medium ${active ? "text-[#1a2b21]" : "text-[#5c6b60]"
                                }`}
                        >
                            {label}
                        </span>
                    </div>
                )})}
            </div>

            <div className="mt-5 rounded-xl bg-[#f4f3ef] px-3 py-3 text-center text-xs text-[#8a9690]">
                More categories coming soon
            </div>
        </div>
    )

};

export default CategoryPanel;