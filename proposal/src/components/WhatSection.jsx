import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'

export default function WhatSection() {
  return (
    <section
      className="relative bg-cover bg-center text-yellow-300 font-rounded px-4 py-24"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/genie_lp_about.jpg)` }}
    >
      {/* 背景オーバーレイ（可読性UP） */}
      <div className="absolute inset-0 bg-[#0b0f24]/70 backdrop-blur-[1px]" />

      {/* 金の線 */}
      <span className="pointer-events-none absolute left-0 right-0 top-0 block h-[3px] bg-gradient-to-r from-transparent via-[#F6E05E] to-transparent opacity-90" />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-center font-aladdin text-5xl md:text-6xl text-[#F6E05E] drop-shadow mb-8">
          What
        </h2>

        <p className="text-center text-lg md:text-xl leading-relaxed text-yellow-100/90 mb-10">
          「“願い”をつなぐキャリア教育プラットフォーム」<br />
          Genieは、Visionを軸にした共通言語で三者をつなぎます。<br /><br />
          学生には「自分らしい進路選択」を、<br />企業には「共鳴する人材との出会い」を、<br />
          教育機関には「先生が理想の教育に専念できる環境」と<br />「生徒が得意を活かせるキャリア発見の仕組み」を提供。<br />
          想いと機会を循環させ、関わるすべての人が自らの未来に誇りを持てる社会を目指しています。
        </p>

        {/* Tab */}
        <TabGroup>
          <div className="space-y-0">
            {/* タブ見出し（stickyはセクション内で固定） */}
            <TabList className="sticky top-0 z-20 -mx-4 px-4 py-3 bg-[#0b0f24]/70 backdrop-blur ring-1 ring-white/10 rounded-xl md:mx-0">
              <div className="flex w-full justify-between gap-3">
                {['Lamp', 'Atlas', 'Carpet'].map((t) => (
                  <Tab
                    key={t}
                    className={({ selected }) =>
                      `flex-1 text-center rounded-full px-4 py-2 text-sm md:text-base transition
                      ${selected
                        ? 'bg-yellow-500 text-black shadow-[0_0_40px_rgba(234,179,8,0.25)]'
                        : 'border border-yellow-400/50 text-yellow-200 hover:bg-yellow-500/10'}`
                    }
                    aria-label={t}
                  >
                    {t}
                  </Tab>
                ))}
              </div>
            </TabList>

            {/* パネル */}
            <TabPanels className="pt-10">
              {/* Lamp */}
              <TabPanel className="space-y-6">
                <h3 className="text-2xl text-center md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
                  Lamp：ビジョン創成・自己分析支援ツール
                </h3>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 space-y-4 text-left">
                  <p className="text-sm text-center md:text-base text-[#F6E05E] font-semibold">
                    〈名前の由来〉ランプを見つけること＝自分の願いを見つけること。<br />アラジンが魔法のランプを手にして初めて「愛する人と結ばれたい」という願いに気づいたように、<br />Lampは学生が“まだ言語化できていない願い”を可視化する存在です。
                  </p>
                  <p className="text-white/80 text-sm md:text-base">
                  Lampは、「好きの本質」に気づく診断と対話を通じて、願いの言語化を支援します。 <br /><br />
                  5タイプ診断や深掘りインタビュー形式のAI面談により、価値観・強み・情熱の源泉を明確化。<br />
                  表面的な興味にとどまらず、行動や選択の背景にある“本当に大切にしたいこと”を見出す設計です。<br />
                  これにより、学生は選択に納得感を持ち、不安を減らして自信を持ってキャリアの一歩を踏み出せます。
                  </p>
                </div>
              </TabPanel>

              {/* Atlas */}
              <TabPanel className="space-y-6">
                <h3 className="text-2xl text-center md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
                  Atlas：企業向け採用支援システム
                </h3>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 space-y-4 text-left">
                  <p className="text-sm text-center md:text-base text-[#F6E05E] font-semibold">
                    〈名前の由来〉Atlas＝地図。採用活動の「現在地」を示す地図に、Lampから得られるビジョンという“コンパス”を重ね合わせる。  <br />
                      これにより、企業は効率だけでなく「どんな未来を誰と描くのか」を明確にできる。  <br />
                      Atlasは、採用活動を単なる数値管理から“未来を描く航路設計”へと進化させます。<br />
                  </p>
                  <p className="text-white/80 text-sm md:text-base">
                    Atlasは、説明会・エントリー・ESなど媒体ごとに分散しがちな採用データを一元管理。  <br />
                    KGI/KPIや参加傾向を可視化し、属人化しない採用設計を可能にします。<br /><br />
                    最大の強みは、Lampとの連携です。診断結果から得られる「学生のビジョン」や「好きの根っこ」を  <br />
                    データと組み合わせることで、単なる効率化を超えた“共鳴採用”を実現。<br /><br />
                    これにより企業は、数値で追える効率性と、ビジョンでつながる納得感の両面から採用を強化できます。<br />
                  </p>
                </div>
              </TabPanel>

              {/* Carpet */}
              <TabPanel className="space-y-6">
                <h3 className="text-2xl text-center md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
                  Carpet：教育DX／キャリア教育支援システム
                </h3>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 space-y-4 text-left">
                  <p className="text-sm text-center md:text-base text-[#F6E05E] font-semibold">
                    〈名前の由来〉Carpet＝魔法のじゅうたん。  <br />
                    じゅうたんが人を乗せて未知の世界へ連れていくように、Carpetはデータと仕組みを通じて、  <br />
                    生徒を“まだ見ぬ好き・得意”へと導く存在です。  <br />
                    教員の支援は風となり、一人ひとりの個性を目的地へと運んでいきます。<br />
                  </p>
                  <p className="text-white/80 text-sm md:text-base">
                    Carpetは、教育機関向けにキャリア教育のDX化と自己理解促進をサポートします。<br />

                    先生はカリキュラム進捗や面談記録を一元管理し、煩雑な事務作業から解放。<br />
                    その分「本質的な教育」に時間を割けるようになります。<br /><br />

                    一方、生徒は学習データや成果の蓄積を通じて、自分の「得意」を発見。<br />
                    「好き」を目的に、「得意」を手段として活かすキャリアを描けます。<br /><br />

                    これにより学校全体が「一律の進路指導」から「個性とビジョンを育む伴走型教育」へと進化します。
                  </p>
                </div>
              </TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </section>
  )
}
