// src/pages/NameInputPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NameInputPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) {
      alert("名前を入力してください");
      return;
    }
    // クエリパラメータで名前を渡す（例）
    navigate(`/diagnosis?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">診断を始める前に</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="あなたの名前を入力"
        className="w-full px-4 py-2 border rounded"
      />
      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        診断を始める
      </button>
    </div>
  );
};

export default NameInputPage;
