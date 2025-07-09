import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./pages/StudentList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
