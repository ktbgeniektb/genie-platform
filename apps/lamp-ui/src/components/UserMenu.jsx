// src/components/UserMenu.jsx
import { useState } from "react";
import { logout as apiLogout, me as apiMe } from "../api/auth";

export default function UserMenu() {
  const [user, setUser] = useState(null);

  // 軽量：初回だけ /me 叩いて表示名を出す（本格運用ならグローバル状態に）
  useState(() => {
    const token = localStorage.getItem("lamp_token");
    if (!token) return;
    apiMe().then(setUser).catch(()=>{});
  }, []);

  async function onLogout() {
    try { await apiLogout(); } catch {}
    localStorage.removeItem("lamp_token");
    window.location.href = "/login";
  }

  if (!user) return null;
  return (
    <div style={{ padding: 8, fontSize: 14 }}>
      👤 {user.name} <button onClick={onLogout} style={{ marginLeft: 8, textDecoration: "underline" }}>ログアウト</button>
    </div>
  );
}
