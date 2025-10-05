import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ページインポート
import Login from "./pages/Login";
import Home from "./pages/Home";
import LogList from "./pages/LogList";
import LogDetail from "./pages/LogDetail";
import LogEdit from "./pages/LogEdit";
import DiagnosisPage from "./pages/DiagnosisPage";
import LogCreateHome from "./pages/LogCreateHome";
import NotFound from "./pages/NotFound";
import NameInputPage from "./pages/NameInputPage";
import ResultPage from "./pages/ResultPage";
import Index from "./pages/__Index"; // ← 追加（Lampのトップページ）

// React Query クライアント設定
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Lamp系 */}
          <Route path="/" element={<Index />} /> {/* ← トップページ */}
          <Route path="/name" element={<NameInputPage />} /> {/* ← 名前入力ページ */}
          <Route path="/diagnosis" element={<DiagnosisPage />} /> {/* ← 診断ページ */}
          <Route path="/result/:id" element={<ResultPage />} />

          {/* ログイン・管理系 */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logs" element={<LogList />} />
          <Route path="/logs/:id" element={<LogDetail />} />
          <Route path="/logs/:id/edit" element={<LogEdit />} />
          <Route path="/logs/new" element={<LogCreateHome />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
