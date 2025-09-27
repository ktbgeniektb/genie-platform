// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { me as apiMe } from "../api/auth";

export default function ProtectedRoute({ children }) {
  const [state, setState] = useState({ loading: true, ok: false });
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("lamp_token");
    if (!token) { setState({ loading: false, ok: false }); return; }
    apiMe()
      .then(() => setState({ loading: false, ok: true }))
      .catch(() => {
        localStorage.removeItem("lamp_token");
        setState({ loading: false, ok: false });
      });
  }, []);

  if (state.loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!state.ok) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}
