import { BrowserRouter, Routes, Route } from "react-router-dom";
import NameInputPage from "./pages/NameInputPage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultPage from "./pages/ResultPage";
import TypeListPage from "./pages/TypeListPage";

const basename = import.meta.env.VITE_ROUTER_BASENAME || '/';

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
