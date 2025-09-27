// src/pages/LoginPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login as apiLogin, me as apiMe, logout as apiLogout } from "../api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/menu";

  // すでにトークンがあれば /me で確認してスキップ
  useEffect(() => {
    const token = localStorage.getItem("lamp_token");
    if (!token) { setChecking(false); return; }
    apiMe()
      .then(() => navigate(redirectTo, { replace: true }))
      .catch(() => { localStorage.removeItem("lamp_token"); })
      .finally(() => setChecking(false));
  }, [navigate, redirectTo]);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await apiLogin(email, password);
      localStorage.setItem("lamp_token", res.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.data?.message || "ログインに失敗しました");
    }
  }

  if (checking) return <div style={{ padding: 24 }}>チェック中...</div>;

  return (
    <main style={{ maxWidth: 400, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>Lamp ログイン</h1>
      <form onSubmit={onSubmit}>
        <label style={{ display: "block", fontSize: 12 }}>メールアドレス</label>
        <input
          type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6, marginBottom: 12 }}
          placeholder="you@example.com"
        />
        <label style={{ display: "block", fontSize: 12 }}>パスワード</label>
        <input
          type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6, marginBottom: 12 }}
          placeholder="********"
        />
        {error && <p style={{ color: "crimson", fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #333" }}>
          ログイン
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        <Link to="/">トップに戻る</Link>
      </p>
    </main>
  );
}
