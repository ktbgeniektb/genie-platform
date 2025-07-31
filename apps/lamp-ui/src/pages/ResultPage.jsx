import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { templates } from "../templates/template";
import RadarChartComponent from "../components/RadarChartComponent";
import SNSShareComponent from "../components/SNSShareComponent";
import "./../styles/diagnosis_result.css";
import { typeLabels, typeColors } from "../constants/typeInfo";
import axios from "axios";

const ResultPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [template, setTemplate] = useState(null);
  const [ranking, setRanking] = useState(null);

  // ① クエリ取得
  const queryParams = new URLSearchParams(location.search);
  const top1 = queryParams.get("top1");
  const top2 = queryParams.get("top2");

  // ② 通常のIDありの診断取得
  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/diagnosis-results/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const normalizedScore = {
          kyomei: (data.score.kyomei / 65.5) * 100,
          hyougen: (data.score.hyougen / 65.5) * 100,
          tankyu: (data.score.tankyu / 65.5) * 100,
          chosen: (data.score.chosen / 65.5) * 100,
          taiken: (data.score.taiken / 65.5) * 100,
        };
        setResult({ ...data, normalizedScore });
        const tmpl = templates.find((t) => t.main === data.top_type);
        setTemplate(tmpl);
      })
      .catch((err) => console.error("診断結果取得エラー", err));
  }, [id]);

  // ③ top1/top2指定時（URLクエリパラメータ）
  useEffect(() => {
    if (id || !top1 || !top2) return;

    const key = `${top1}_${top2}`;
    const tmpl = templates.find((t) => t.main === key);
    if (tmpl) {
      setResult({
        top_type: key,
        normalizedScore: null, // チャート無しでよければnullのまま
      });
      setTemplate(tmpl);
    }
  }, [id, top1, top2]);

  // ④ ランキング取得
  useEffect(() => {
    if (!result?.top_type) return;
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/ranking/${result.top_type}`)
      .then((res) => setRanking(res.data))
      .catch((err) => console.error("❌ ランキング取得エラー", err));
  }, [result?.top_type]);

  // ⑤ 表示処理
  if (!result || !template) {
    return <div>診断結果を読み込み中...</div>;
  }

  const [main1, main2] = result.top_type.split("_");

  const rawTop1 = top1 || main1;
  const rawTop2 = top2 || main2;
  
  return (
    <div className="result-page">
      <section className="result-header">
        <div className="header-image-container">
        <img src={`${import.meta.env.BASE_URL}images/results/${rawTop1}_${rawTop2}.jpg`} />
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
