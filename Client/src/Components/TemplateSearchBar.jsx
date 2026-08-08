import { useState , useEffect, useRef } from "react";
import { Search } from "lucide-react";

function TemplateSearchBar({ searchFilter }) {
const [searchQuery , setSearchQuery] = useState("");
const timerRef = useRef(null);

const handleSearch = (e) => {
const searchInput = e.target.value.trim();
if(!searchInput) return;
setSearchQuery(searchInput);
};

useEffect(() => {
     if(timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
        console.log(searchQuery);
        searchFilter(searchQuery);
    } , 400);

    return () => {
        clearTimeout(timerRef.current);
    }

} , [searchQuery]);

return (
    <div className="flex items-center gap-2 rounded-full border border-white/25 px-4 py-2">
            <Search size={15} className="text-white/60" />
             <input type="text" onChange={handleSearch} className="w-full outline-0 text-amber-50" placeholder="search templates" />
          </div>
)

};

export default TemplateSearchBar;