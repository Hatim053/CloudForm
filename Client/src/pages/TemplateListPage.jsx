import CategoryPanel from "../components/CategoryPanel.jsx";
import TemplateCard from "../components/TemplateCard.jsx";
import TemplateTopBar from "../components/TemplateTopBar.jsx";
import { useSelector } from "react-redux";


function TemplateListPage() {
  const templateCategoryList = useSelector((state) => state.template.templatesCategoryList);


  return (
    <div className="min-h-screen bg-white font-sans">

      <TemplateTopBar />

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-5 bg-[#faf9f6] p-6">

        <CategoryPanel />

        <section className="col-span-9 rounded-2xl bg-[#f4f3ef] p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium text-[#5c6b60]">
              9 templates &middot; sorted by popularity
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">

            {templateCategoryList.map((propsObj) => {
              const { id, name, description, icon, tag, cover } = propsObj;
         
              return <TemplateCard key={id} name={name} description={description} icon={icon} tag={tag} cover={cover} />
            })}

          </div>
        </section>
      </div>
    </div>
  );
}

export default TemplateListPage;