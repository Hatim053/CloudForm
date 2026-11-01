import CategoryPanel from "../components/CategoryPanel.jsx";
import TemplateCard from "../components/TemplateCard.jsx";
import TemplateTopBar from "../components/TemplateTopBar.jsx";
import useFetchTemplateCategoryList from "../CustomHooks/useFetchTemplateCategoryList.js";

function TemplateListPage() {
  const { templateCategoryList, isLoading, error } = useFetchTemplateCategoryList();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[#5c6b60]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center text-sm text-red-600">
        Something went wrong while loading templates.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <TemplateTopBar />

      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 bg-[#faf9f6] p-3 sm:gap-5 sm:p-4 lg:grid-cols-12 lg:p-6">
        <CategoryPanel />

        <section className="min-w-0 rounded-2xl bg-[#f4f3ef] p-4 sm:p-6 lg:col-span-9">
          <div className="mb-4 flex items-center justify-between sm:mb-5">
            <p className="text-sm font-medium text-[#5c6b60]">
              {templateCategoryList.length} templates &middot; sorted by popularity
            </p>
          </div>

          {templateCategoryList.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#8a9690]">
              No templates found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {templateCategoryList.map(({ id, name, description, icon, tag, cover }) => (
                <TemplateCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  icon={icon}
                  tag={tag}
                  cover={cover}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TemplateListPage;