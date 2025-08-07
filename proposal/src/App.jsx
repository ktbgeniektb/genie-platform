import React from "react";
import './index.css';

// 各セクションのコンポーネントをインポート
import Hero from "./components/Hero";
// import WhoSection from "./components/WhoSection";
// import WhatSection from "./components/WhatSection";
// import WhySection from "./components/WhySection";
// import HowSection from "./components/HowSection";
// import FeaturesSection from "./components/FeaturesSection";
// import CtaSection from "./components/CtaSection";
// import Footer from "./components/Footer";

function App() {
  return (
    <div>
      {/* ヒーローセクション */}
      <Hero />

      {/* 背景セクション */}
      {/* <section id="who" className="py-16 bg-gray-50">
        <WhoSection />
      </section>

      <section id="what" className="py-16">
        <WhatSection />
      </section>

      <section id="why" className="py-16 bg-gray-50">
        <WhySection />
      </section>

      <section id="how" className="py-16">
        <HowSection />
      </section>

      {/* 特徴セクション */}
      {/* <section id="features" className="py-20 bg-blue-50">
        <FeaturesSection />
      </section>

      {/* CTA（行動喚起）セクション */}
      {/* <section id="cta" className="py-20 bg-gradient-to-b from-blue-100 to-white">
        <CtaSection />
      </section> */}

      {/* フッター */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
