// src/pages/DiagnosisPage.jsx
import React, { useState } from "react";
import questions from "../data/questions"; // 正しいパスに修正
import QuestionComponent from "../components/QuestionComponent";
import { useLocation } from "react-router-dom";

const DiagnosisPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get("name") || "匿名";


  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = (answers) => {
    const scoreMap = {
      kyomei: 0,
      tankyu: 0,
      hyougen: 0,
      taiken: 0,
      chosen: 0,
    };

    questions.forEach((q, i) => {
      const answer = answers[i];
      if (typeof answer === "number") {
        scoreMap[q.main] += answer * q.weightMain;
        if (q.sub && q.weightSub) {
          scoreMap[q.sub] += answer * q.weightSub;
        }
      }
    });

    const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
    const topType = `${sorted[0][0]}_${sorted[1][0]}`;

    return { score: scoreMap, topType };
  };

const handleSubmit = async () => {
  if (answers.includes(null)) {
    alert("全ての質問に回答してください");
    return;
  }

  const result = calculateScore(answers);
  const payload = {
    name,
    top_type: result.topType,
    score: result.score,
  };

  console.log("📦 送信データ payload:", payload); // ←ここ！

  try {
  const response = await fetch("http://localhost:8080/api/diagnosis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      top_type: result.topType,
      score: result.score,
    }),
  });

    const data = await response.json();
    console.log("✅ 送信成功:", data);
    alert("診断結果を保存しました！");
  } catch (error) {
    console.error("❌ 送信エラー:", error);
    alert("保存中にエラーが発生しました");
  }
};

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-bold mb-6">診断テスト</h1>

      {questions.map((q, index) => (
        <QuestionComponent
          key={index}
          index={index}
          question={q.text}
          choices={q.choices}
          selectedValue={answers[index]}
          onSelect={handleAnswer}
        />
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        診断する
      </button>
    </div>
  );
};

export default DiagnosisPage;
