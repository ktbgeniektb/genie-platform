import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentList from "./pages/StudentList";

function App() {
  const basename = import.meta.env.VITE_BASE_PATH || "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* ルートで学生一覧を表示 */}
        <Route path="/" element={<StudentList />} />
        {/* 上記以外はすべてルートにリダイレクト */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
