import {
  LayoutGrid, Star, MessageSquareText, CalendarCheck2, Briefcase,
  GraduationCap, HeartHandshake, ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilterTemplateCategoryList,
  removeFilterTemplateCategoryList,
} from "../app/TemplateSlice.js";

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

function CategoryPanel() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const templateCategoryList = useSelector((state) => state.template.templatesCategoryList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCategory === "All Templates") {
      dispatch(removeFilterTemplateCategoryList());
      return;
    }
    const filteredList = templateCategoryList.filter(
      (templateObj) => templateObj.tag === selectedCategory
    );
    dispatch(addFilterTemplateCategoryList(filteredList));
  }, [selectedCategory]);

  return (
    <aside className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:p-5 lg:col-span-3 lg:self-start">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
        Browse by category
      </p>
      <p className="mb-3 hidden text-sm text-[#5c6b60] sm:block lg:mb-4">
        Find a template close to what you need
      </p>

      {/* Mobile/tablet: horizontal scroll chips. Desktop: vertical list */}
      <div
        className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-0 lg:flex-col lg:overflow-visible lg:pb-0"
        role="tablist"
        aria-label="Template categories"
      >
        {categories.map(({ icon: Icon, label }) => {
          const active = label === selectedCategory;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(label)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] lg:gap-2.5 lg:rounded-xl lg:px-3 lg:py-3 ${
                active ? "bg-[#fdf6e8]" : "bg-[#f4f3ef] hover:bg-[#eceae3]"
              }`}
            >
              <Icon
                size={16}
                className={active ? "text-[#2c4a3b]" : "text-[#8a9690]"}
              />
              <span
                className={`text-sm font-medium ${
                  active ? "text-[#1a2b21]" : "text-[#5c6b60]"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 hidden rounded-xl bg-[#f4f3ef] px-3 py-3 text-center text-xs text-[#8a9690] lg:block">
        More categories coming soon
      </div>
    </aside>
  );
}

export default CategoryPanel;