// src/pages/LogListPage.jsx
import { useEffect, useState } from "react";
import { Logs } from "../api/logs";
import { token } from "../api/client";
import { Link, useNavigate } from "react-router-dom";

function toDateSafe(v){
  if (!v) return null;
  if (typeof v === "number") return new Date(v); // ms想定
  if (typeof v === "string") {
    const s = v.trim();
    // UNIX秒/ミリ秒の数値文字列
    if (/^\d{13}$/.test(s)) return new Date(Number(s));       // ms
    if (/^\d{10}$/.test(s)) return new Date(Number(s) * 1000); // sec
    // "YYYY-MM-DD HH:mm:ss" → Safari/一部環境でNGなので "T" に置換
    const iso = s.includes("T") ? s : s.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d) ? null : d;
  }
  // Carbon系 { date: "...", timezone: "..."} にも対応
  if (typeof v === "object" && v.date) {
    const d = new Date((v.date.includes("T") ? v.date : v.date.replace(" ", "T")));
    return isNaN(d) ? null : d;
  }
  return null;
}

function normalizeEmotions(e){
  // そのまま配列なら終わり
  if (Array.isArray(e)) return e;

  // null/undefined/空文字は空配列に
  if (e == null || e === "") return [];

  // オブジェクトで {0:"…",1:"…"} みたいな連想配列の時
  if (typeof e === "object") {
    const vals = Object.values(e).filter(v => typeof v === "string" && v.trim() !== "");
    return vals.length ? vals : [];
  }

  if (typeof e === "string") {
    let s = e.trim();

    // カンマ区切り最短対応（JSONでなさそうならsplit）
    if (!(s.startsWith("[") && s.endsWith("]")) && s.includes(",")) {
      return s.split(",").map(t => t.trim()).filter(Boolean);
    }

    // 1回目のJSON.parse
    try {
      const once = JSON.parse(s);
      if (Array.isArray(once)) return once;

      // 文字列の中にさらにJSON（ダブルエンコード）ケース
      if (typeof once === "string") {
        try {
          const twice = JSON.parse(once);
          if (Array.isArray(twice)) return twice;
        } catch {}
      }

      // 連想オブジェクト → 値だけ配列に
      if (once && typeof once === "object") {
        const vals = Object.values(once).filter(v => typeof v === "string" && v.trim() !== "");
        if (vals.length) return vals;
      }
    } catch {
      // ダメなら最後に[]返す
    }
  }

  return [];
}


function normalizeLog(l){
  return {
    id: l.id ?? l.uuid ?? l.ID,
    createdAt: toDateSafe(l.created_at ?? l.createdAt ?? l.created_at_iso ?? l?.created_at?.date),
    industry: l.industry ?? l.category ?? "",
    emotions: normalizeEmotions(l.emotions),
    text: l.text ?? l.body ?? l.content ?? l.message ?? "",
  };
}

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
      Logs.list(10).then((res)=>{
        const items =
          Array.isArray(res) ? res :
          Array.isArray(res?.data) ? res.data :
          Array.isArray(res?.data?.data) ? res.data.data : [];
        if (items[0]) console.log('SAMPLE raw item:', items[0]);
        setLogs(items.map(normalizeLog));
      })
      .catch((e) => {
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
        <button onClick={() => { token.clear(); nav("/login"); }}>
          ログアウト
        </button>
      </header>

      {loading && <p>読み込み中...</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <ul>
      {logs.map((l) => {
        // ここで最終防衛：配列じゃなければ強制正規化
        const emos = Array.isArray(l.emotions) ? l.emotions : normalizeEmotions(l.emotions);
        return (
          <li key={l.id} style={{ border: "1px solid #ddd", padding: 12, margin: "12px 0", borderRadius: 8 }}>
            <div style={{marginTop:8}}>
              <Link to={`/logs/${l.id}`}>詳細を見る</Link>
            </div>
            <div style={{ fontSize: 12, opacity: .7 }}>
              {l.createdAt ? l.createdAt.toLocaleString() : "—"}
            </div>
            <div><b>業種:</b> {l.industry || "—"}</div>
            <div><b>感情:</b> {emos.length ? emos.join(" / ") : "—"}</div>
            <p style={{ whiteSpace: "pre-wrap" }}>{l.text || "（本文なし）"}</p>

            {/* 必要なら一時的に生JSONを下に出す（確認後に消してOK） */}
            {/* <pre style={{fontSize:11,opacity:.5}}>{JSON.stringify(l, null, 2)}</pre> */}
          </li>
        );
      })}
      </ul>

      {!loading && logs.length === 0 && !err && (
        <p style={{ opacity: .7 }}>まだログがありません。右上の「＋ 新規作成」からどうぞ。</p>
      )}
    </main>
  );
}
