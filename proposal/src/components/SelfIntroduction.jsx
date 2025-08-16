export default function SelfIntroduction() {
    return (
        <div>
            <div className="relative">
                {/* 金の線 */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F6E05E] to-transparent opacity-80" />
            </div>
            <section className="bg-[#1a1a40] py-16 px-6 text-center text-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#F6E05E]">開発者紹介</h2>
                <div className="max-w-4xl mx-auto space-y-4 text-lg leading-relaxed">
                    <p>はじめまして、水野 敬太です。</p>
                    <p>
                        新卒で株式会社あつまるに入社し、社内システムの開発・改善に従事してきました。<br />
                        Web未経験からスタートし、バックエンド開発やインフラ構築を中心に、<br />
                        エンジニアグループの基盤づくりに携わってきました。<br />
                        HTMLやCSSに本格的に触れたのは、G's ACADEMY入学後のことです。<br /><br />
                    </p>
                    <p>
                        一方で、15年間続けてきたダンスやエンタメの活動を通じて、<br />
                        「人の心が動く瞬間」に強く惹かれてきました。<br />
                        その中で、「好きの本質」を見つけることこそが人生やキャリアの軸になると確信しました。<br /><br />
                    </p>
                    <p>
                        この想いをテクノロジーで再現し、多くの人が自分の価値観や情熱に気づける環境を作るために、<br />
                        本プロジェクトを立ち上げました。<br /><br />
                    </p>

                    <div className="mt-10 pt-8 border-t border-yellow-400/40">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#F6E05E]">Genie の由来</h3>
                    <p className="leading-relaxed space-y-4">
                        <span>
                        私にとって一番大きな目標は、
                        <strong className="text-[#F6E05E]">「人の心を動かすこと」</strong>です。<br />
                        その中で、最も人の心を動かすエンターテイナーは誰かと考えた時、
                        それが<strong>ジーニー</strong>だと直感しました。<br /><br />
                        </span>
                        <span>
                        彼がいれば、どんな場面でも人は笑顔になれるし、<br />
                        どんな場面でも共感してくれる。<br />
                        そんな存在を自分も目指したいと思ったのです。<br /><br />
                        </span>
                        <span>
                        ただし、ジーニーは「夢を叶える」のが仕事ですが、<br />
                        私は<strong className="text-[#F6E05E]">「夢を一緒に見つけ、叶えるための道をつくる」</strong>ことを、<br />
                        このシステムと共に実現していきたいと思っています。
                        </span>
                        <span>
                        将来的には、弊社の代表が構想している教育機関で、<br />
                        エンジニア兼キャリアアドバイザー兼ダンス部顧問として、<br />
                        学生と共に<strong>夢を創り、叶えるまで伴走できる存在</strong>を目指しています。<br /><br />
                        </span>
                    </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-yellow-400/40">
                    </div>

                    <a href="http://ktbgenie.sakura.ne.jp/vision_sheet/visionsheet_20241011.pdf">
                        <strong>ビジョンシートはこちら</strong><br /><br />
                    </a>

                    {/* ここから追加部分 */}
                    <div className="mt-10 pt-8 border-t border-yellow-400/40">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#F6E05E]">一緒に動けたら嬉しいこと</h3>
                        <p className="mb-4">
                            この企画で目指すゴールは、「Lampで見つけた“好き”を、<br />
                            Atlasで活かせる環境に結びつけるデモをGGAで実現する」ことです。<br />
                            もしこんなスタンスで一緒に動いていただける方がいれば、とても心強いです。
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-left max-w-xl mx-auto">
                            <li>ゴールに向けて、面白がって試行錯誤できる</li>
                            <li>新しい視点で「もっと良くなる」を一緒に考えられる</li>
                            <li>本番当日まで、ワクワクしながら伴走してくれる</li>
                        </ul>
                        <p className="mt-4">
                            GGA優勝を目指して全力で取り組みますので、<br />より良くするためのご意見やアドバイスをいただければ嬉しいです。
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
