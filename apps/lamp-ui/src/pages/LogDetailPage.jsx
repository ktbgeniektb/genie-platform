// src/pages/LogDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Logs } from "../api/logs";

export default function LogDetailPage(){
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");

  useEffect(()=>{
    Logs.show(id)
      .then(setItem)
      .catch(e => setErr(e?.data?.message || "取得に失敗しました"));
  }, [id]);

  async function onDelete(){
    if(!confirm("このログを削除します。よろしいですか？")) return;
    try{
      await Logs.destroy(id);
      nav("/logs");
    }catch(e){
      alert(e?.data?.message || "削除に失敗しました");
    }
  }

  if(!item && !err) return <main style={{padding:24}}>読み込み中…</main>;

  return (
    <main style={{maxWidth:900, margin:"40px auto"}}>
      {err && <p style={{color:"crimson"}}>{err}</p>}
      {item && (
        <>
          <header style={{display:"flex", gap:12, alignItems:"center"}}>
            <h1 style={{marginRight:"auto"}}>ログ詳細</h1>
            <Link to={`/logs/${id}/edit`}>編集</Link>
            <button onClick={onDelete} style={{color:"crimson"}}>削除</button>
            <Link to="/logs">一覧へ</Link>
          </header>
          <div style={{marginTop:16}}>
            <div style={{fontSize:12, opacity:.7}}>
              {new Date(item.created_at).toLocaleString()}
            </div>
            <div><b>業種:</b> {item.industry}</div>
            <div><b>感情:</b> {Array.isArray(item.emotions)? item.emotions.join(" / "): "-"}</div>
            <p style={{whiteSpace:"pre-wrap"}}>{item.text}</p>
          </div>
        </>
      )}
    </main>
  );
}
