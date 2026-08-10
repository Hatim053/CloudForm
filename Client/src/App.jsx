import { Routes , Route } from "react-router-dom";
import FormCreationPage from "./pages/FormCreationPage.jsx";
import TemplateListPage from "./pages/TemplateListPage.jsx";
import ResponseDetailPage from "./pages/ResponseDetailPage.jsx";
import ResponsesListPage from "./pages/ResponsesListPage.jsx";
import Home from "./pages/Home.jsx";

function App() {


  return (
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/templates" element={<TemplateListPage />} />
      <Route path="/createform/:id" element={<FormCreationPage/>} />
    </Routes>   
  )
}

export default App;