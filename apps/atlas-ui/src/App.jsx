import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentList from "./pages/StudentList";
import LoginPage from './pages/LoginPage';
import axios from "axios";

function App() {
  const basename = import.meta.env.VITE_BASE_PATH || "/";
  console.log('Router basename:', import.meta.env.VITE_BASE_PATH);

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* ルートで学生一覧を表示 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<StudentList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
