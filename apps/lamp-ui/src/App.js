// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NameInputPage from "./pages/NameInputPage";
import DiagnosisPage from "./pages/DiagnosisPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NameInputPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
