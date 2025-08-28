import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./layouts/AppLayout";
import StudentsList from "./pages/StudentsList";
import StudentDetail from "./pages/StudentDetail";
import StudentForm from "./pages/StudentForm";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/students" replace />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/students/new" element={<StudentForm mode="create" />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/students/:id/edit" element={<StudentForm mode="edit" />} />
            <Route path="/students/:id/delete" element={<StudentForm mode="delete" />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>

    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
