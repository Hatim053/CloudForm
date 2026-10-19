import { useEffect, useState } from "react";
import CategoryPanel from "../Components/CategoryPanel.jsx";
import TemplateCard from "../Components/TemplateCard.jsx";
import TemplateTopBar from "../Components/TemplateTopBar.jsx";

function TemplateListPage() {

  const [templateCategoryList, setTemplateCategoryList] = useState([]);

  const fetchTemplateListData = async () => {

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/template-category-list/fetch-data`);
    const jsonResponse = await response.json();
    const list = jsonResponse?.templateCategoryList;
    setTemplateCategoryList(list);
  };

  useEffect(() => {

    fetchTemplateListData();
  }, []);


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

              return <TemplateCard key={id} id={id} name={name} description={description} icon={icon} tag={tag} cover={cover} />
            })}

          </div>
        </section>
      </div>
    </div>
  );
}

export default TemplateListPage;