// src/components/LogForm.jsx
import { useState, useEffect } from "react";

export default function LogForm({ initial, onSubmit, submitLabel = "保存" }) {
  const [industry, setIndustry] = useState(initial?.industry ?? "教育");
  const [text, setText] = useState(initial?.text ?? "");
  const [emotions, setEmotions] = useState(
    Array.isArray(initial?.emotions) ? initial.emotions.join(",") : "ワクワク,違和感"
  );
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(()=>{ setErr(""); }, [industry, text, emotions]);

  async function handleSubmit(e){
    e.preventDefault();
    setSaving(true);
    setErr("");
    try{
      const emo = emotions.split(",").map(s=>s.trim()).filter(Boolean);
      await onSubmit({ industry, text, emotions: emo });
    }catch(e){
      const msg = e?.data?.errors?.text?.[0] || e?.data?.message || "保存に失敗しました";
      setErr(msg);
    }finally{
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>業種<br/>
        <input value={industry} onChange={e=>setIndustry(e.target.value)} />
      </label><br/>
      <label>本文（50文字以上）<br/>
        <textarea rows={6} value={text} onChange={e=>setText(e.target.value)} />
      </label><br/>
      <label>感情（カンマ区切り）<br/>
        <input value={emotions} onChange={e=>setEmotions(e.target.value)} />
      </label><br/>
      {err && <p style={{color:"crimson"}}>{err}</p>}
      <button type="submit" disabled={saving} style={{opacity:saving?.6:1}}>
        {saving ? "送信中…" : submitLabel}
      </button>
    </form>
  );
}
