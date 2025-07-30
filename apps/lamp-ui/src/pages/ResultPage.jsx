import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { templates } from "../templates/template";
import RadarChartComponent from "../components/RadarChartComponent";
import SNSShareComponent from "../components/SNSShareComponent";
import "./../styles/diagnosis_result.css";
import { typeLabels, typeColors } from "../constants/typeInfo";
import axios from "axios";

const ResultPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [ranking, setRanking] = useState(null);

useEffect(() => {
  if (!result?.top_type) return;
  console.log("🎯 top_type:", result.top_type);
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/ranking/${result.top_type}`)
    .then((res) => {
      console.log("✅ ランキング取得成功", res.data);
      setRanking(res.data);
    })
    .catch((err) => console.error("❌ ランキング取得エラー", err));
}, [result?.top_type]);


useEffect(() => {
  if (!id) return;

  fetch(`${import.meta.env.VITE_API_BASE_URL}/diagnosis-results/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("取得データ", data);
      const normalizedScore = {
        kyomei: (data.score.kyomei / 65.5) * 100,
        hyougen: (data.score.hyougen / 65.5) * 100,
        tankyu: (data.score.tankyu / 65.5) * 100,
        chosen: (data.score.chosen / 65.5) * 100,
        taiken: (data.score.taiken / 65.5) * 100,
      };
      setResult({ ...data, normalizedScore }); // ← ここがポイント
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

  const [top1, top2] = result.top_type.split("_");
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
            <h2>
              あなたの「ビジョンの源泉」は<br></br>
              <span style={{ color: typeColors[top1], fontWeight: "bold" }}>
                {typeLabels[top1]}
              </span>{" "}
              ×{" "}
              <span style={{ color: typeColors[top2], fontWeight: "bold" }}>
                {typeLabels[top2]}
              </span>
            </h2>
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
      <section className="chart">
        <RadarChartComponent score={result.normalizedScore} />
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
      <section className="result-section">
        <SNSShareComponent id={id} topType={template.label} />
      </section>
      <section className="result-section">
        {ranking ? (
          <p>
            あなたのタイプ「{typeLabels[top1]} × {typeLabels[top2]}」は
            <strong> {ranking.rank}位 / 全{ranking.total}タイプ</strong> 中でした！
          </p>
        ) : (
          <p>ランキングを集計中...</p>
        )}
      </section>
      <section className="result-section">
        <Link to="/types" className="other-type-link">
          他のタイプも見てみる
        </Link>
      </section>
      <section className="result-section">
        <h2>🔁 もう1度診断してみる？</h2>
        <div className="nav-buttons">
          <button onClick={() => window.location.href = "/diagnosis"}>🔁 診断に戻る</button>
        </div>
      </section>
    </div>
  );
};

export default ResultPage;
