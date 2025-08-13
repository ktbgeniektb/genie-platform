import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'

export default function WhatSection() {
  const tabs = ['Lamp', 'Atlas', 'Carpet']
  return (
      <section
        className="bg-cover bg-center flex flex-col justify-center items-center text-center text-yellow-300 font-rounded px-4 py-24"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/genie_lp_about.jpg)` }} // ← 修正
    >
  {/* ▼ コンテンツ */}
  <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h2 className="text-center font-aladdin text-5xl md:text-6xl text-[#F6E05E] drop-shadow mb-8">What</h2>
            <p className="text-center text-lg md:text-xl leading-relaxed text-yellow-100/90 mb-10">
            「“願い”をつなぐキャリア教育プラットフォーム」<br />
            Genieは、Visionを軸にした共通言語で三者をつなぎます。<br /><br />
            学生には「自分らしい進路選択」を、<br />企業には「共鳴する人材との出会い」を、<br />教育機関には「本質的なキャリア教育の型」を提供。<br />
            想いと機会を循環させ、関わるすべての人が自らの未来に誇りを持てる社会を目指しています。
            </p>
    <TabGroup>
    {/* ← ラッパーで上下の余白を固定 */}
    <div className="space-y-0">
        <TabList className="sticky top-0 z-20 -mx-4 px-4 py-3 bg-[#0b0f24]/70 backdrop-blur ring-1 ring-white/10 rounded-xl md:mx-0 mb-0"> {/* ← mb-0 明示（後述の space-y が効く） */}
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
            >
                {t}
            </Tab>
            ))}
        </div>
        </TabList>

        {/* ↓ 'between-around' は削除 */}
        <TabPanels className="pt-10">
        {/* Lamp */}
        <TabPanel className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
            Lamp：ビジョン創成・自己分析支援ツール
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6">
            <p className="text-white/80 text-sm mt-2">
            Lampは、「好きの本質」に気づく診断と対話を通して、進路選択の土台となる“願い”を言語化します。<br /><br />
            5タイプ診断や深掘りインタビュー形式のAI面談を通じて、自分の価値観・強み・情熱の源泉を明確化。<br />
            表面的な興味だけでなく、行動や選択の背景にある“本当に大切にしたいこと”を見つけられる設計です。<br />
            これにより、学生は迷いや不安を減らし、自信を持ってキャリアの一歩を踏み出せます。
            </p>
            </div>
        </TabPanel>

        {/* Atlas */}
        <TabPanel className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
            Atlas：企業向け採用支援システム
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6">
            <p className="text-white/80 text-sm mt-2">
            Atlasは、説明会・エントリー情報をデータで可視化し、企業のビジョンに共鳴する学生との出会いを実現します。<br /><br />
            学生管理・ES集計・参加傾向分析・KGI/KPI可視化など、採用プロセスをワンストップで管理。<br />
            従来は分散していた情報を統合し、効率的かつ戦略的な母集団形成を可能にします。<br />
            また、Lampとの連携により学生一人ひとりのビジョンや適性を判断。双方に良い影響を与える出逢いを支援します。
            </p>
            </div>
        </TabPanel>

        {/* Carpet */}
        <TabPanel className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg border-b-2 border-yellow-500 pb-2">
            Carpet：教育DX、キャリア教育支援システム
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6">
            <p className="text-white/80 text-sm mt-2">
            Carpetは、教育機関向けにキャリア教育のDX化と自己理解促進をサポートします。<br /><br />
            学生一人ひとりのビジョンや強みを可視化し、教員はそれを基に授業や面談で最適なサポートが可能。<br />
            カリキュラム進捗や成果をデータで管理することで、教育の質と効率を同時に向上します。<br />
            「一律の進路指導」から「個性とビジョンを活かす伴走型教育」への転換を後押しします。
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
