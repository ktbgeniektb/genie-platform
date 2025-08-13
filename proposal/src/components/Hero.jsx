export default function Hero() {
  return (
    <div>
      <section
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center text-yellow-300 px-4"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/genie_lp_bg.jpg)` }}
      >
          <h1 className="text-3xl md:text-5xl font-bold font-rounded drop-shadow-md">
            キャリア教育プラットフォーム<br /><br />
          <span className="text-9xl font-aladdin drop-shadow-md">
            Genie
            </span>
          </h1>
      </section>
      <section
        className="bg-cover bg-center flex flex-col justify-center items-center text-center text-yellow-300 font-rounded px-4 py-24"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/star.jpg)` }}
      >
        <div className="space-y-6 text-yellow-300">
          <h1 className="text-7xl font-aladdin">About</h1><br /><br />
          <h1 className="text-4xl">「願いを叶えるんじゃない。願いに気づかせる存在。」</h1><br /><br />
           <p className="text-2xl leading-relaxed">キャリア教育プラットフォーム Genie は、<br />
          就活生・企業・教育機関の3方向から<br />
          キャリア教育を支援する3つのシステムを統合するプラットフォームです。<br /><br /></p>

          <p className="text-2xl text-yellow-100 text-left px-36 leading-relaxed">・ 就転職希望者向けビジョン創成システム「Lamp」<br />
          ・ 企業向け学生管理システム「Atlas」<br />
          ・ 教育機関向けキャリア教育支援システム「Carpet」<br /><br /></p>

          <p className="text-2xl leading-relaxed">を統合し、「好き」から生まれるキャリア選択を支援します。<br /></p>
        </div>
      </section>
    </div>
  );
}