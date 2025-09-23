import { BrowserRouter, Routes, Route } from "react-router-dom";
import NameInputPage from "./pages/NameInputPage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultPage from "./pages/ResultPage";
import TypeListPage from "./pages/TypeListPage";

const raw = import.meta.env.VITE_ROUTER_BASENAME || "";
const basename = raw.replace(/\/+$/, ""); // 末尾スラッシュ除去

console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<NameInputPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/types" element={<TypeListPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
