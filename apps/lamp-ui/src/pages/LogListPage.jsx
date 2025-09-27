// src/pages/LogListPage.jsx
import { useEffect, useState } from "react";
import { Logs } from "../api/logs";
import { token } from "../api/client";
import { Link, useNavigate } from "react-router-dom";

export default function LogListPage() {
  const nav = useNavigate();
  const [logs, setLogs] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token.get()) {
      nav("/login");
      return;
    }
    Logs.list(10)
      .then((res) => setLogs(res?.data || []))
      .catch((e) => {
        // 未認証ならログインへ
        if (e?.status === 401) {
          token.clear();
          nav("/login");
          return;
        }
        setErr(e?.data?.message || "取得に失敗しました");
      })
      .finally(() => setLoading(false));
  }, [nav]);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto" }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginRight: "auto" }}>ログ一覧</h1>
        <Link to="/logs/new">＋ 新規作成</Link>
        <button
          onClick={() => { token.clear(); nav("/login"); }}
        >
          ログアウト
        </button>
      </header>

      {loading && <p>読み込み中...</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <ul>
        {logs.map((l) => (
          <li key={l.id} style={{ border: "1px solid #ddd", padding: 12, margin: "12px 0", borderRadius: 8 }}>
            <div style={{marginTop:8}}>
              <Link to={`/logs/${l.id}`}>詳細を見る</Link>
            </div>
            <div style={{ fontSize: 12, opacity: .7 }}>
              {new Date(l.created_at).toLocaleString()}
            </div>
            <div><b>業種:</b> {l.industry}</div>
            <div><b>感情:</b> {Array.isArray(l.emotions) ? l.emotions.join(" / ") : "-"}</div>
            <p style={{ whiteSpace: "pre-wrap" }}>{l.text}</p>
          </li>
        ))}
      </ul>

      {!loading && logs.length === 0 && !err && (
        <p style={{ opacity: .7 }}>まだログがありません。右上の「＋ 新規作成」からどうぞ。</p>
      )}
    </main>
  );
}
