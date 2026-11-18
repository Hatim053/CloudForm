
import { Timeline } from "@/components/ui/timeline";

const imageClass =
  "h-24 w-full rounded-lg object-cover shadow-[0_2px_12px_rgba(0,0,0,0.08)] sm:h-36 lg:h-52";

const timelineData = [
  {
    title: "Start with a Template",
    content: (
      <div>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          Don't start from scratch. Choose from a growing collection of
          professionally designed templates for creators, businesses,
          events, surveys, education, and more. Find a starting point
          that matches your goal and make it yours.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://res.cloudinary.com/duirimupd/image/upload/v1794876853/templates-gallery_xr35it.jpg"
            alt="CloudForm template gallery with multiple categories"
            className={imageClass}
          />
          <img
            src="/images/timeline/influencer-card.png"
            alt="CloudForm influencer profile template"
            className={imageClass}
          />
        </div>

        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          Templates for creators, startups, events, and everyday use.
        </p>
      </div>
    ),
  },
  {
    title: "Create with AI",
    content: (
      <div>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          Have an idea? Just describe what you need in plain language.
          CloudForm AI turns your description into a ready-to-customize
          page, helping you go from an idea to a working form in less time.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://res.cloudinary.com/duirimupd/image/upload/v1794876706/ai-page-generator_ekfxd7.jpg"
            alt="CloudForm AI page generation prompt"
            className={imageClass}
          />
          <img
            src="/images/timeline/ai-generated-page.png"
            alt="Generated CloudForm waitlist page"
            className={imageClass}
          />
        </div>

        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          Describe it. Generate it. Customize it.
        </p>
      </div>
    ),
  },
  {
    title: "Customize Every Detail",
    content: (
      <div>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          Make every page feel like your own. Add or remove fields,
          edit headings, change layouts, personalize themes, and
          adjust backgrounds. Build an experience that matches your
          brand without being restricted to a fixed template.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="/images/timeline/form-builder.png"
            alt="CloudForm visual form builder"
            className={imageClass}
          />
          <img
            src="/images/timeline/event-registration.png"
            alt="Customized event registration form"
            className={imageClass}
          />
        </div>

        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          Your content, your design, your experience.
        </p>
      </div>
    ),
  },
  {
    title: "Publish & Collect Responses",
    content: (
      <div>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          Your page is ready. Publish it and share it with your
          audience. Whether you're building a creator link page,
          launching a startup waitlist, registering event attendees,
          or collecting customer feedback, everything starts with
          a single shareable page.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="/images/timeline/waitlist-page.png"
            alt="Published CloudForm startup waitlist page"
            className={imageClass}
          />
          <img
            src="/images/timeline/influencer-card.png"
            alt="Published creator link page"
            className={imageClass}
          />
        </div>

        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          Share your page and start collecting submissions.
        </p>
      </div>
    ),
  },
  {
    title: "Understand Your Responses",
    content: (
      <div>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          Every submission tells you something valuable. View
          individual responses, explore submitted answers, and
          understand visitor activity through response insights
          such as device information, operating system, location,
          and time spent on your forms.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="/images/timeline/response-details.png"
            alt="CloudForm individual response details and analytics"
            className={imageClass}
          />
          <img
            src="/images/timeline/form-builder.png"
            alt="CloudForm form management interface"
            className={imageClass}
          />
        </div>

        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          Collect data. Explore insights. Make informed decisions.
        </p>
      </div>
    ),
  },
];

export function TimeLine() {
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={timelineData} />
    </div>
  );
}

export default TimeLine;
