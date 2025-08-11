export default function WhoSection() {
  return (
    <div>
        <section className="relative py-20 text-yellow-100 bg-gradient-to-b from-indigo-950 to-blue-900">

          {/* セクション上端の金ライン */}
        <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F6E05E] to-transparent" />

        {/* 上端の金ライン（セクション区切り） */}
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-center font-aladdin text-5xl md:text-6xl text-[#F6E05E] mb-8">
            Who
            </h2>

            <p className="text-center text-lg md:text-xl mb-6 leading-relaxed">
            今の日本のキャリア教育には多くの課題があります。
            </p>

            {/* 左寄せの課題リスト */}
            <ul className="text-left leading-relaxed space-y-3 md:space-y-4">
            <li>
                <span className="mr-2 text-[#F6E05E]">✦</span>
                何がしたいのか、何が好きなのか、どうなりたいのか分からない
                <strong className="text-yellow-200"> 就転職希望者</strong>
            </li>
            <li>
                <span className="mr-2 text-[#F6E05E]">✦</span>
                どんな学生とどんな未来を描くのかを決められていない
                <strong className="text-yellow-200"> 企業</strong>
            </li>
            <li>
                <span className="mr-2 text-[#F6E05E]">✦</span>
                激務によって自分がやりたい本質的な教育や導き方ができない
                <strong className="text-yellow-200"> 教員</strong>
            </li>
            </ul>
        </div>
    </section>
    </div>

  )
}