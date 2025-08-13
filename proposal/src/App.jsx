import React from "react";
import './index.css';

// 各セクションのコンポーネントをインポート
import Hero from "./components/Hero";
import Background from "./components/Background";
import HowSection from "./components/HowSection";
// import FeaturesSection from "./components/FeaturesSection";
// import CtaSection from "./components/CtaSection";
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

      {/* 特徴セクション */}
      {/* <section id="features" className="py-20 bg-blue-50">
        <FeaturesSection />
      </section>

      {/* CTA（行動喚起）セクション */}
      {/* <section id="cta" className="py-20 bg-gradient-to-b from-blue-100 to-white">
        <CtaSection />
      </section> */}

      {/* 開発者紹介セクション */}
        <SelfIntroduction />

      {/* フッター */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
