import { Routes, Route } from "react-router-dom";
import FormCreationPage from "./pages/FormCreationPage.jsx";
import TemplateListPage from "./pages/TemplateListPage.jsx";
import ResponseDetailPage from "./pages/ResponseDetailPage.jsx";
import Home from "./pages/Home.jsx";
import AdminPanelPage from "./pages/AdminPanelPage.jsx";
import LiveFormRender from "./pages/LiveFormRender.jsx";
import MyFormsPage from "./pages/MyFormsPage.jsx";
import FormResponsesPage from "./pages/FormResponsesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import AiTemplatePage from "./pages/AiTemplatePage.jsx";


function App() {


  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<TemplateListPage />} />
        <Route path="/createform/:id" element={<FormCreationPage />} />
        <Route path="/admin-panel" element={<AdminPanelPage />} />
        <Route path="/liveformrender/:id/:status" element={<LiveFormRender />} />
        <Route path="/my-forms" element={<MyFormsPage />} />
        <Route path="/analytics/:formId" element={<FormResponsesPage />} />
        <Route path="/analytics/response/:responseId" element={<ResponseDetailPage />} />
        <Route path="/pricing" element={<PricingPage/>} />
        <Route path="/about-us" element={<AboutPage/>} />
        <Route path="/generate-ai-template" element={<AiTemplatePage />}/>
      </Routes>
    </div>
  )
}

export default App;