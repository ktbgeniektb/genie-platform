import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { templates } from "../templates/template";
import "./../styles/diagnosis_result.css";

const ResultPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/diagnosis-results/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("取得データ", data);
        setResult(data);
      })
      .catch((err) => console.error("診断結果取得エラー", err));
  }, [id]);

  // 👇 resultが取得できてからtemplateを探す！
  const template = result
    ? templates.find((t) => t.main === result.top_type)
    : null;

  if (!result || !template) {
    return <div>診断結果を読み込み中...</div>;
  }

  return (
    <div className="result-page">
      <section className="result-header">
        <div className="header-image-container">
          <img
            src={`../../img/results/${result.top_type}.jpg`}
            alt="診断結果画像"
          />
          <div className="result-overlay-text">
            <div className="catch-copy">
              <p dangerouslySetInnerHTML={{ __html: template.catch }} />
            </div>
            <div className="main-type-wrapper">
              <h1>{template.label}</h1>
            </div>
          </div>
        </div>

        <div className="description-wrapper">
          <p
            id="description"
            dangerouslySetInnerHTML={{ __html: template.description }}
          />
        </div>
      </section>

      <section className="result-section">
        <h2>🔎 特徴</h2>
        <ul>
          {template.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="result-section">
        <h2>🌱 ワクワクしやすい瞬間</h2>
        <ul>
          {template.moments.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="result-section">
        <h2>🎯 活かすヒント</h2>
        <ul>
          {template.tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="result-section">
        <h2>🔁 あなたの中に、こんな側面も…</h2>
        <p id="sub" dangerouslySetInnerHTML={{ __html: template.sub }} />
      </section>
    </div> // ← ここが抜けてた！
  );
};

export default ResultPage;
