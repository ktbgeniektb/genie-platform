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
          学生には「自分らしい進路選択」を、企業には「共鳴する人材との出会い」を、教育機関には「本質的なキャリア教育の型」を提供。<br />
          想いと機会を循環させ、関わるすべての人が自らの未来に誇りを持てる社会を目指しています。
        </p>

        <TabGroup>
          <div className="space-y-0">
            {/* タブ見出し */}
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
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
                  Lamp：ビジョン創成・自己分析支援ツール
                </h3>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 space-y-4 text-left">
                  {/* 由来（固定フォーマット） */}
                  <p className="text-sm md:text-base text-[#F6E05E] font-semibold">
                    〈名前の由来〉ランプを見つけること＝自分の願いを見つけること。
                  </p>
                  <p className="text-white/80 text-sm md:text-base">
                    アラジンが魔法のランプを手にし、本当の願いに気づいたように、Lampは“まだ言葉になっていない願い”を可視化します。<br />
                    5タイプ診断とAI面談で「好きの根っこ」「価値観」「強み」を明確化し、選択への納得感をつくります。
                  </p>
                </div>
              </TabPanel>

              {/* Atlas */}
              <TabPanel className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
                  Atlas：企業向け採用支援システム
                </h3>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 space-y-4 text-left">
                  <p className="text-sm md:text-base text-[#F6E05E] font-semibold">
                    〈名前の由来〉地図（Atlas）にコンパスを置くように、価値観と企業の未来を重ねる。
                  </p>
                  <p className="text-white/80 text-sm md:text-base">
                    説明会・エントリー・ESを横断して可視化。KGI/KPI、参加傾向、共鳴度を統合し、分散データから戦略を導出します。<br />
                    Lamp連携で「この人と働きたい理由」をデータとストーリーの両面から補完します。
                  </p>
                </div>
              </TabPanel>

              {/* Carpet */}
              <TabPanel className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
                  Carpet：教育DX／キャリア教育支援システム
                </h3>
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 space-y-4 text-left">
                  <p className="text-sm md:text-base text-[#F6E05E] font-semibold">
                    〈名前の由来〉魔法のじゅうたんの風に乗って、まだ見ぬ「好き」へ連れていく。
                  </p>
                  <p className="text-white/80 text-sm md:text-base">
                    授業・単元データの蓄積から得意／関心を可視化。教員は最適な声かけ・支援を選択でき、伴走型のキャリア教育を実現。<br />
                    学校全体の進路支援を“個別最適×データ駆動”へシフトします。
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
