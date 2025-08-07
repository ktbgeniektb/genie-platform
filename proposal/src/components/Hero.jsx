export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
      style={{ backgroundImage: "url('/img/genie_lp_bg.jpg')" }}
    >
      <div className="space-y-6 text-yellow-300">
        <h2 className="text-2xl md:text-4xl font-semibold font-rounded">
          「好き」で溢れる日本をつくる
        </h2>
        <h1 className="text-3xl md:text-5xl font-bold font-rounded">
          キャリア教育プラットフォーム<br /><br />
         <span className="text-8xl font-aladdin">
          Genie
          </span>
        </h1>
      </div>
    </section>
  );
}