import { useState } from "react";
import { Logs } from "../api/logs";
import { useNavigate } from "react-router-dom";

export default function LogCreatePage() {
  const [industry, setIndustry] = useState("教育");
  const [text, setText] = useState("");
  const [emotions, setEmotions] = useState("ワクワク,違和感");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const emo = emotions.split(",").map(s => s.trim()).filter(Boolean);
      await Logs.create({ industry, text, emotions: emo });
      nav("/logs");
    } catch (e) {
      const msg =
        e?.data?.errors?.text?.[0] ||
        e?.data?.message ||
        "保存に失敗しました";
      setErr(msg);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto" }}>
      <h1>ログを残す</h1>
      <form onSubmit={submit}>
        <label>業種<br/>
          <input value={industry} onChange={(e)=>setIndustry(e.target.value)} />
        </label>
        <br/>
        <label>本文（50文字以上）<br/>
          <textarea rows={6} value={text} onChange={(e)=>setText(e.target.value)} />
        </label>
        <br/>
        <label>感情（カンマ区切り）<br/>
          <input value={emotions} onChange={(e)=>setEmotions(e.target.value)} />
        </label>
        <br/>
        <button type="submit">保存</button>
      </form>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </main>
  );
}
