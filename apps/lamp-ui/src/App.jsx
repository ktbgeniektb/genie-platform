import { BrowserRouter, Routes, Route } from "react-router-dom";
import NameInputPage from "./pages/NameInputPage";
import DiagnosisPage from "./pages/DiagnosisPage";

const basename = import.meta.env.VITE_ROUTER_BASENAME || '/';

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<NameInputPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
