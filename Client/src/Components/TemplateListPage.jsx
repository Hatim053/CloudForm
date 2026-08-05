import {
  Search,
  LayoutGrid,
  Star,
  MessageSquareText,
  CalendarCheck2,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  ShoppingBag,
  ClipboardList,
  Users,
  Sparkles,
} from "lucide-react";

const categories = [
  { icon: LayoutGrid, label: "All templates", active: true },
  { icon: Star, label: "Popular", active: false },
  { icon: MessageSquareText, label: "Feedback & surveys", active: false },
  { icon: CalendarCheck2, label: "Events & RSVP", active: false },
  { icon: Briefcase, label: "HR & hiring", active: false },
  { icon: GraduationCap, label: "Education", active: false },
  { icon: HeartHandshake, label: "Nonprofit", active: false },
  { icon: ShoppingBag, label: "Orders & requests", active: false },
];

const templates = [
  {
    name: "Customer Feedback Survey",
    description: "Rate, review, and tell us how we're doing",
    tag: "Feedback",
    cover: "from-[#f2a93b] to-[#e8833b]",
    icon: MessageSquareText,
  },
  {
    name: "Event RSVP",
    description: "Collect guest counts and dietary notes",
    tag: "Events",
    cover: "from-[#6f9a8d] to-[#2c4a3b]",
    icon: CalendarCheck2,
  },
  {
    name: "Job Application",
    description: "Resume, portfolio link, and screening questions",
    tag: "HR",
    cover: "from-[#c9603f] to-[#7a3a2c]",
    icon: Briefcase,
  },
  {
    name: "Course Enrollment",
    description: "Sign students up with prerequisites check",
    tag: "Education",
    cover: "from-[#3b6b8f] to-[#1f3b52]",
    icon: GraduationCap,
  },
  {
    name: "Volunteer Sign-up",
    description: "Match volunteers to shifts and skills",
    tag: "Nonprofit",
    cover: "from-[#8a9b4f] to-[#4d5c2a]",
    icon: HeartHandshake,
  },
  {
    name: "Product Order Form",
    description: "Quantities, variants, and delivery details",
    tag: "Orders",
    cover: "from-[#d9a441] to-[#a5741f]",
    icon: ShoppingBag,
  },
  {
    name: "Employee Onboarding",
    description: "Documents, IT setup, and team intros",
    tag: "HR",
    cover: "from-[#5c6b60] to-[#2c4a3b]",
    icon: Users,
  },
  {
    name: "Project Intake",
    description: "Scope, timeline, and budget questions",
    tag: "Operations",
    cover: "from-[#b3703f] to-[#6b3f22]",
    icon: ClipboardList,
  },
  {
    name: "Community Survey",
    description: "Gather local input on new initiatives",
    tag: "Nonprofit",
    cover: "from-[#4f8a7a] to-[#28453c]",
    icon: Sparkles,
  },
];

export default function TemplateListPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-[#2c4a3b] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2a93b]">
            <span className="text-lg font-bold text-[#2c4a3b]">C</span>
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
              Templates
            </p>
            <p className="text-base font-semibold text-white">
              Choose a starting point
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/25 px-4 py-2">
            <Search size={15} className="text-white/60" />
            <span className="text-sm text-white/60">Search templates</span>
          </div>
          <span className="rounded-full bg-[#f2a93b] px-5 py-2 text-sm font-medium text-[#2c4a3b]">
            Start from blank
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-5 bg-[#faf9f6] p-6">
        {/* Left: Categories panel */}
        <aside className="col-span-3 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
            Browse by category
          </p>
          <p className="mb-4 text-sm text-[#5c6b60]">
            Find a template close to what you need
          </p>

          <div className="flex flex-col gap-2">
            {categories.map(({ icon: Icon, label, active }, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-3 ${
                  active ? "bg-[#fdf6e8]" : "bg-[#f4f3ef]"
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
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-[#f4f3ef] px-3 py-3 text-center text-xs text-[#8a9690]">
            More categories coming soon
          </div>
        </aside>

        {/* Right: Template grid */}
        <section className="col-span-9 rounded-2xl bg-[#f4f3ef] p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium text-[#5c6b60]">
              9 templates &middot; sorted by popularity
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {templates.map(({ name, description, tag, cover, icon: Icon }, i) => (
              <div
                key={i}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-md"
              >
                {/* Cover image */}
                <div
                  className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${cover}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <Icon size={22} className="text-white" />
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#2c4a3b]">
                    {tag}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#1a2b21]">
                      {name}
                    </p>
                    <p className="text-xs leading-relaxed text-[#8a9690]">
                      {description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#8a9690] opacity-0 transition-opacity group-hover:opacity-100">
                      6 questions
                    </span>
                    <span className="rounded-full bg-[#f4f3ef] px-4 py-1.5 text-xs font-semibold text-[#1a2b21] transition-colors group-hover:bg-[#1a2b21] group-hover:text-white">
                      Use template
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}