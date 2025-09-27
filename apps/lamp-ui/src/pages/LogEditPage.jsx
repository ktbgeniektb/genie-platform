// src/pages/LogEditPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Logs } from "../api/logs";
import LogForm from "../components/LogForm";

export default function LogEditPage(){
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");

  useEffect(()=>{
    Logs.show(id)
      .then(setItem)
      .catch(e=> setErr(e?.data?.message || "取得に失敗しました"));
  }, [id]);

  async function onSubmit(payload){
    await Logs.update(id, payload);
    nav(`/logs/${id}`);
  }

  if(!item && !err) return <main style={{padding:24}}>読み込み中…</main>;

  return (
    <main style={{maxWidth:900, margin:"40px auto"}}>
      <header style={{display:"flex", gap:12, alignItems:"center"}}>
        <h1 style={{marginRight:"auto"}}>ログ編集</h1>
        <Link to={`/logs/${id}`}>詳細に戻る</Link>
      </header>
      {err && <p style={{color:"crimson"}}>{err}</p>}
      {item && <LogForm initial={item} onSubmit={onSubmit} submitLabel="更新" />}
    </main>
  );
}
