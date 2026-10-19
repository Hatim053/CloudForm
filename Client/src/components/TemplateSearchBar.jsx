import { useState , useEffect, useRef } from "react";
import { Search } from "lucide-react";
import {  useDispatch } from "react-redux";
import { addFilterTemplateCategoryList } from "../app/TemplateSlice.js";
import templatesCategory from "../utils/TemplatesCategoryList";

function TemplateSearchBar() {

const [searchQuery , setSearchQuery] = useState("");

const dispatch = useDispatch();
const timerRef = useRef(null);

const handleSearchInput = (e) => {
const searchInput = e.target.value.trim();
if(!searchInput) return;
setSearchQuery(searchInput);
};
const debounceSearch = () => {
    if(!searchQuery.trim()) return;
    console.log(searchQuery);
    const filteredList = templatesCategory.filter((templateObj) => {
      
        if(templateObj.name.toLowerCase().includes(searchQuery.toLowerCase())) {
         console.log(templateObj); 
            return templateObj;
        }
    });
    console.log("list",filteredList);
    dispatch(addFilterTemplateCategoryList(filteredList));
};

useEffect(() => {
     if(timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(debounceSearch , 400);

    return () => {
        clearTimeout(timerRef.current);
    }

} , [searchQuery]);

return (
    <div className="flex items-center gap-2 rounded-full border border-white/25 px-4 py-2">
            <Search size={15} className="text-white/60" />
             <input type="text" onChange={handleSearchInput} className="w-full outline-0 text-amber-50" placeholder="search templates" />
          </div>
)

};

export default TemplateSearchBar;