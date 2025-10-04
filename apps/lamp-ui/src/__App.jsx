import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NameInputPage from "./pages/NameInputPage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultPage from "./pages/ResultPage";
import TypeListPage from "./pages/TypeListPage";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import UserMenu from "./components/UserMenu";
import LogCreatePage from "./pages/LogCreatePage";
import LogListPage from "./pages/LogListPage";
import LogDetailPage from "./pages/LogDetailPage";
import LogEditPage from "./pages/LogEditPage";

const raw = import.meta.env.VITE_ROUTER_BASENAME || "";
const basename = raw.replace(/\/+$/, ""); // 末尾スラッシュ除去

console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<NameInputPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/types" element={<TypeListPage />} />
        <Route path="/result" element={<ResultPage />} />

        <Route path="/menu" element={<ProtectedRoute><UserMenu /></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><LogListPage /></ProtectedRoute>} />
        <Route path="/logs/new" element={<ProtectedRoute><LogCreatePage /></ProtectedRoute>} />
        <Route path="/logs/:id" element={<ProtectedRoute><LogDetailPage /></ProtectedRoute>} />
        <Route path="/logs/:id/edit" element={<ProtectedRoute><LogEditPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
