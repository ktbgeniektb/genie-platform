// src/components/HeroSection.jsx
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.hero}>
        {/* 背景画像 */}
        <div className={styles.hero_image}>
          <img src="/images/genie_lp_bg.jpg" alt="Genie背景" />
        </div>
        {/* 中央寄せテキスト */}
        <div className={styles.hero_text}>
          <p>「好き」で溢れる日本を創る</p>
          <h1>キャリア教育プラットフォーム Genie</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
