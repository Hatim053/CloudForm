import { Routes , Route } from "react-router-dom";
import FormCreationPage from "./pages/FormCreationPage.jsx";
import TemplateListPage from "./pages/TemplateListPage.jsx";
import ResponseDetailPage from "./pages/ResponseDetailPage.jsx";
import ResponsesListPage from "./pages/ResponsesListPage.jsx";
import Home from "./pages/Home.jsx";
import AdminPanelPage from "./pages/AdminPanelPage.jsx";

function App() {


  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/templates" element={<TemplateListPage />} />
      <Route path="/createform/:id" element={<FormCreationPage/>} />
      <Route path="/admin-panel" element={<AdminPanelPage />}/>
    </Routes>   
    </div>
  )
}

export default App;