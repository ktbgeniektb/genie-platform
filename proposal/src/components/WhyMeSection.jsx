import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import '../index.css';

const base = import.meta.env.BASE_URL;

const whyMeItems = [
  {
    title: "Lamp：自己理解支援ツール",
    color: "bg-yellow-500",
        panelImg: `${base}img/lamp.jpg`,
    content: (
      <>
      <p>私は15年間ダンスを学び続けてきました。<br />
      その中で、<span className="font-bold">自分が最も喜びを感じる瞬間</span>が、「ダンスを踊っている時」よりも<span className="font-bold">「ダンスを通して人の心を動かす瞬間」</span>だと気づきました。<br />
      野球で味わった、スタジアムやテレビの前の数万人の心が一瞬で動く瞬間。<br />
      ディズニーで生まれる、非日常空間でのたくさんの笑顔。<br /><br />

      コンテンツは違えど、自分が最も幸福を感じるのは<span className="font-bold">「人の心が動く瞬間」でした。</span><br /><br />

      しかし、多くの人はその<span className="font-bold">「好きの本質」</span>に出会えないまま、就職活動をしています。<br />
      ダンス、野球、ディズニーといった”コンテンツレベル”の「好き」に目が行ってしまい、どうしてもコンテンツという手段の先にある<span className="font-bold">「好きの本質」</span>を見つけることができていないのではないかと感じています。<br />
      自分にも、「旅行が好き」と言って某大手旅行代理店を受けましたが、面接にすら挑めなかった友人がいました。<br />
      「ゲームが好き」と言ってゲーム制作会社に入ったものの、「最近全くゲームできていないんだ」と言っていた友人もいました。<br /><br />

      今の自分が、その友人が就活していた時に戻れたら、きっと「旅行の中のどの瞬間が一番幸せだった？」「ゲームやってて一番楽しいと思えたのはいつ？」と聞けたと思います。<br />
      おこがましいかもしれませんが、それでも旅行の中で「仲間と一緒に行動できるのが好き」なのか、「普段行けない場所に行けるのが好き」なのか、「おいしいご飯を食べるのが好き」なのか。<br />
      ゲームをやっている中で「戦略を考えるのが好き」なのか、「自分が成長したと感じられるのが好き」なのか、「ストーリーが好き」なのか。<br /><br />

      そのコンテンツの何が好きなのかを掘り下げることで、<span className="font-bold">自分の「好きの本質」が見えてきます。</span><br />
      さらに、自分の中に存在するさまざまな「好き」を整理し、その本質を探っていくことで、<span className="font-bold">生きる目的</span>や<span className="font-bold">大切にしたい価値観</span>までも浮かび上がってくるかもしれません。<br />

      こうした、コンテンツレベルではなく、本能から「好き」と感じられるものを見つけ、考えるきっかけをつくるのが、このLampです。</p>
      </>
    )
  },
  {
    title: "Atlas：企業向け採用支援システム",
    color: "bg-blue-500",
    panelImg: `${base}img/atlas.jpg`,
    content: (<>
    <p>私は、小さい頃からデータを見るのが好きでした。<br />
数字という手段によって、人の思いや行動のパターンが見えてくること、そしてそれは、<span className="font-bold">自分の「好きの本質」</span>である<span className="font-bold">「人の心が動く瞬間」を可視化したもの</span>であるということを、本能的に理解していたのだと思います。<br />
中学〜高校時代は、USJや野球を通じてデータを集め、考察することに夢中になっていました。<br /><br />

USJでは、主要アトラクションの平日・休日の待ち時間をグラフ化し、「今日はどんな客層が多いのか」「待ち時間はどの順番で伸びていくのか」を推測。<br />
実際に行った日には、その予測をもとに行動計画を立て、効率よくアトラクションを回っていました。<br />
野球でもスコアブックをつけ、データが書かれている選手名鑑を見ながら、出場選手の変化球割合や打球方向などのデータを分析。どのプレーが試合の流れを変えたのかを考えることが好きでした。<br /><br />

そんな私は、<span className="font-bold">いつかデータを活かした仕事がしたい</span>と思い、新卒で「株式会社あつまる」に入社しました。<br />
しかし入社後、データ活用の中核と聞いていた「集客プラットフォーム ATSUMARU」が形骸化していることを知ります。自分がしたいと思っている<span className="font-bold">データサイエンス、そしてコンサルを含めたデータストラテジストの職業</span>は今、この会社にはありません。<br /><br />

一方で、弊社は新卒採用に力を入れ、年間5,000人以上の学生に説明会へ参加いただいています。私自身もキャリア教育や就職活動に興味があり、会社説明会への登壇も多く経験させていただきました。<br />
その中で採用チームのリーダーに「エンジニアの志望者数はどれくらいですか？」と聞いたとき、返ってきた答えは、<br />
<span className="font-bold">「PDFに保存されたESを一つずつ見て、志望職種に「エンジニア」と書かれているESの数を数えないと分からない」</span>というものでした。<br />
5,000人以上の情報が、手作業やPDF・メールといった連携しづらい形で管理されている現実に、私は驚きました。<br /><br />

<span className="font-bold">同時に、「これは大きなチャンスだ」とも感じました。</span><br /><br />

- 自分が大好きな就職活動やキャリアに関するデータ分析ができる<br />
- エンジニアとして、学生の情報を管理できる仕組みをつくれる<br />
- 上記の「Lamp」のシステムと併用すれば、会社側から「この学生はこういうお仕事をして貰えば会社も学生も幸せになる」という提案もできるかもしれない<br />
- 弊社が他社に行っている採用コンサルのデータも活かせば、自分がなりたい「データストラテジスト」になれるかもしれない<br /><br />

その<span className="font-bold">全てが叶うシステムを創る</span>、という考えから生まれたのがAtlasです。</p>
    </>)
  },
  {
    title: "Carpet：教育現場支援システム",
    color: "bg-purple-500",
    panelImg: `${base}img/carpet.jpg`,
    content: (<>
    <p>私は小学生の頃、一時期「教員になりたい」と考えていました。<br />
担任の先生方に恵まれ、最高に楽しいと思える小学校生活を送っていたからです。<br />
しかし、高校に上がって大学を選ぶ際に<span className="font-bold">「教員は激務だ」</span>という話を何度も聞き、憧れよりも恐れが勝って教育学部は選びませんでした。<br /><br />

大学時代、キャリアアドバイザーの方と話しているときに、ふと耳にしたのは<br />
<span className="font-bold">「先生はまだ丸つけを手でやっているらしいよ」</span> という言葉。<br />
驚くと同時に、「テストの本質は丸やバツをつけることではないはずだ」と強く感じました。<br /><br />

テストの本質は、マルやバツをつけることではなく、先生が生徒一人ひとりの「得意・苦手」を把握し、<br />
長所をさらに伸ばし、短所を補うための指導を考えること。<br />
そして、先生自身も「どこを教えるのが得意で、どこが苦手か」を知ることだと思います。<br /><br />

ですが、元教員の方々に話を聞くと、多くが<span className="font-bold">「目の前の仕事に追われ、それどころではない」</span>と答えます。<br />
それでも先生方は、理想の教育をしたいという覚悟を持って現場に立っているはずです。<br />

だからこそ、<span className="font-bold">先生方の業務を効率化し、生徒と向き合う時間を増やしたい。</span><br /><br />

その想いから、Carpetを構想しました。<br /><br />

私のキャリアの信条は<span className="font-bold">「“好き”を目的に、“得意”を手段に」。</span><br />
「得意」は勉強の科目だけでなく、人に言われなくてもやってしまうことや、なぜか人よりできてしまうことも含みます。<br />
そして勉強の得意も科目レベルではなく、単元レベルで把握することが自己分析に繋がると考えています。<br /></p>
    </>)
  }
];

export default function WhyMeAccordion() {
  return (
    <div>
    <section
      className="relative px-4 py-20 bg-[#0b1020]
                [background-image:radial-gradient(60%_40%_at_50%_0%,rgba(246,224,94,0.10),transparent_60%)]">
      {/* 金の線 */}
      <span className="pointer-events-none absolute left-0 right-0 top-0 block h-[2px]
                      bg-gradient-to-r from-transparent via-[#F6E05E] to-transparent opacity-80 z-20" />

      {/* 極薄ノイズ */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>`
          )}")` }} />
        <div className="relative max-w-5xl mx-auto">
            <h2 className="text-center font-aladdin text-5xl md:text-6xl text-[#F6E05E] drop-shadow py-16">
              Why me
            </h2>

            {whyMeItems.map((item, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                  <DisclosureButton
                    className={`flex items-center justify-between w-full px-4 py-3 text-base md:text-lg font-semibold focus:outline-none transition
                      ${open
                        ? "bg-yellow-500 text-black shadow-[0_0_40px_rgba(234,179,8,0.25)]"
                        : "border border-yellow-400/50 text-yellow-200 hover:bg-yellow-500/10"
                      }`}
                  >
                    <span className="drop-shadow">{item.title}</span>
                    <ChevronUpIcon
                      className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                    </DisclosureButton>

                    <Transition
                      show={open}
                      enter="transition duration-200 ease-out"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition duration-150 ease-in"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <div
                        className="relative bg-cover bg-center"
                        /* 画像はそのまま。上に薄い黒グラデーションを敷いて文字を読みやすく。 */
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,.35)), url(${item.panelImg})`,
                        }}
                      >
                        {/* 内側ボックスでさらに可読性UP */}
                        <div className="px-4 pt-4 pb-5">
                          <div className="max-w-5xl mx-auto text-rounded md:max-w-4xl bg-black/20 backdrop-blur-[2px] rounded-lg px-4 py-12">
                            <div className="whitespace-pre-line leading-relaxed md:leading-loose text-xl text-rounded text-sm md:text-base text-yellow-200 drop-shadow">
                              {item.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            ))}
                </div>
                <div className="text-center text-lg md:text-xl leading-relaxed text-yellow-100/90 m-10">Lampで「好き」を見つけ、Carpetで「得意」を見つけ、Atlasで最大限活かせる「環境」を見つける。<br />
                それが、私のやりたいキャリア教育支援です。<br /><br /><br />

                  <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 space-y-4 text-center m-6">
                  私は新規事業志望としてこのプロダクトを作成していこうと思っています。<br />
                  私が<strong className="text-[#F6E05E]">新規事業</strong>を選んだのは、ただシステムをつくりたいからではありません。<br /><br /><br />

                  - 会社が掲げる「個人ビジョン経営」を体現し、背中を示せる<br />
                  - 採用に力を入れ、採用コンサルを行う土壌があるからこそ活かせる<br />
                  - ベンチャーである今、エンジニアグループの成長がそのまま会社の成長に直結する<br />
                  - 一人で案件を回すだけだったグループから「プラスを生み出すチーム」に進化させたい<br />

                  そのすべてが重なった結果、起業や転職ではなく「新規事業」という形で、<br />
                  Genie を育てていく道を選びました。
                  </div>
                </div>
            </section>
    </div>
  );
}
