export default function WhoSection({ onPick }) {
  return (
    <section className="relative py-20 text-yellow-100 bg-gradient-to-b from-black via-indigo-950 to-blue-950">
      {/* 上端の金ライン */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F6E05E] to-transparent opacity-80" />
      <div className="max-w-5xl mx-auto px-6">
        {/* 見出し */}
        <h2 className="text-center font-aladdin text-5xl md:text-6xl text-[#F6E05E] drop-shadow mb-4">
          Who
        </h2>
        <p className="text-center text-lg md:text-xl leading-relaxed text-yellow-100/90 mb-10">
          今の日本のキャリア教育には、当事者・企業・学校それぞれに未解決の課題があります。
        </p>

        {/* 課題カード */}
        <ul className="grid gap-5 md:grid-cols-3">
          {/* 就転職希望者 */}
          <li className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 shadow-lg shadow-black/10 hover:shadow-black/20 transition">
            <div className="flex items-center gap-2 text-[#F6E05E] mb-2">
              <span aria-hidden>✦</span>
              <span className="font-semibold">就転職希望者</span>
            </div>
            <p className="text-yellow-100/90 text-sm md:text-base leading-relaxed">
              「何が好きか／どうなりたいか」が言語化できず、意思決定が揺らぐ。
            </p>

            {/* 任意：Whatのタブへ誘導したいときだけ onPick を渡す */}
            {onPick && (
              <button
                onClick={() => onPick(0)}
                className="mt-4 inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-100 underline underline-offset-2"
              >
                Lampで自己理解へ
                <span aria-hidden>→</span>
              </button>
            )}
          </li>

          {/* 企業 */}
          <li className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 shadow-lg shadow-black/10 hover:shadow-black/20 transition">
            <div className="flex items-center gap-2 text-[#F6E05E] mb-2">
              <span aria-hidden>✦</span>
              <span className="font-semibold">企業</span>
            </div>
            <p className="text-yellow-100/90 text-sm md:text-base leading-relaxed">
              どんな学生とどんな未来を描くかが曖昧で、設計が属人化しやすい。
            </p>

            {onPick && (
              <button
                onClick={() => onPick(1)}
                className="mt-4 inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-100 underline underline-offset-2"
              >
                Atlasで設計へ
                <span aria-hidden>→</span>
              </button>
            )}
          </li>

          {/* 教員 */}
          <li className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 shadow-lg shadow-black/10 hover:shadow-black/20 transition">
            <div className="flex items-center gap-2 text-[#F6E05E] mb-2">
              <span aria-hidden>✦</span>
              <span className="font-semibold">教員</span>
            </div>
            <p className="text-yellow-100/90 text-sm md:text-base leading-relaxed">
              激務で“本質的な導き”に時間が割けない。個別最適化も難しい。
            </p>

            {onPick && (
              <button
                onClick={() => onPick(2)}
                className="mt-4 inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-100 underline underline-offset-2"
              >
                Carpetで効率化へ
                <span aria-hidden>→</span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
}
