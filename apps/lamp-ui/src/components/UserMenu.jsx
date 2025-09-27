// src/pages/MenuPage.jsx
import { useEffect, useState, Link } from "react";
import { me as apiMe, logout as apiLogout } from "../api/auth";
import { fetchRecentLogs } from "../api/logs";
import { Navigate, useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("lamp_token");
  if (!token) return <Navigate to="/login" replace />; // 未ログインはログインへ

  useEffect(() => {
    (async () => {
      try {
        const me = await apiMe();
        setUser(me);
        const recent = await fetchRecentLogs(5); // ここは好みで
        setLogs(recent);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onLogout() {
    try { await apiLogout(); } catch {}
    localStorage.removeItem("lamp_token");
    navigate("/login", { replace: true });
  }

  if (loading) return <div style={{ padding: 24 }}>読み込み中…</div>;
  if (!user)   return <div style={{ padding: 24 }}>ユーザー情報を取得できませんでした。</div>;

  return (
    <div style={{ maxWidth: 860, margin: "32px auto", padding: "0 16px", display: "grid", gap: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 20, margin: 0 }}>ユーザーメニュー</h1>
        <div>
          <button onClick={() => navigate("/profile")} style={{ marginRight: 12, textDecoration: "underline", background: "transparent", border: 0, cursor: "pointer" }}>
            プロフィール
          </button>
          <button onClick={onLogout} style={{ textDecoration: "underline", background: "transparent", border: 0, cursor: "pointer" }}>
            ログアウト
          </button>
        </div>
      </header>

      <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h2 style={{ fontSize: 16, marginTop: 0 }}>アカウント</h2>
        <div style={{ lineHeight: 1.8 }}>
          <div>👤 {user.name}</div>
          <div>📧 {user.email}</div>{/* メールが返るなら */}
          {/* 必要なら more fields */}
        </div>
      </section>

      <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h2 style={{ fontSize: 16, marginTop: 0 }}>最近のログ</h2>
        {logs.length === 0 ? (
          <div style={{ opacity: 0.7, fontSize: 14 }}>まだログがありません</div>
        ) : (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
        {logs.map((log) => (
          <li key={log.id}>
            <Link to={`/logs/${log.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                background: "#1e1e2f",
                color: "#f5f5f5",
                border: "1px solid #444",
                borderRadius: 10,
                padding: 12,
                display: "grid",
                gap: 6
              }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>
                  {log.industry ?? "（業種未設定）"}
                </div>
                <div style={{ fontSize: 13, color: "#ddd" }}>
                  {log.content || "（本文なし）"}
                </div>
                <div style={{ fontSize: 12, color: "#aaa" }}>
                  {new Date(log.created_at ?? Date.now()).toLocaleString()}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
        )}
        <div style={{ marginTop: 12 }}>
          <Link to="/logs" style={{ textDecoration: "underline" }}>すべてのログを見る</Link>
        </div>
      </section>

      {/* 置き場所だけ先に：あとで実装 */}
      <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h2 style={{ fontSize: 16, marginTop: 0 }}>きょうの問い（仮）</h2>
        <p style={{ marginTop: 4, opacity: 0.9 }}>
          「その挑戦で、誰の何を変えたい？」{/* 固定文 or サーバーから1件 */}
        </p>
        {/* 回答保存ボタンは後で */}
      </section>
    </div>
  );
}
