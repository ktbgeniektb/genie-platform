import React from "react";
import './index.css';

// 各セクションのコンポーネントをインポート
import Hero from "./components/Hero";
import Background from "./components/Background";
import HowSection from "./components/HowSection";
import TechStackSection from "./components/TechStackSection";
// import Footer from "./components/Footer";
import SelfIntroduction from "./components/SelfIntroduction";

function App() {
  return (
    <div>
      {/* ヒーローセクション */}
      <Hero />

      {/* 背景セクション */}
        <Background />

        <HowSection />

      {/* 技術選定 */}
        <TechStackSection />

      {/* 開発者紹介セクション */}
        <SelfIntroduction />
    </div>
  );
}

export default App;
