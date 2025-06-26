<!DOCTYPE html>
<html lang="jp">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Genie LP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap"
      rel="stylesheet"
    />
    <!-- <link rel="stylesheet" href="css/style.css" /> -->
    <link rel="stylesheet" href="./css/style_genie_contact.css" />

    <!-- 電話番号の国際対応 -->
    <!-- intl-tel-input CSS -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.min.css"
    />
    <!-- intl-tel-input JS + utils（バリデーション用）-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"></script>

    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              rounded: ["'M PLUS Rounded 1c'", "sans-serif"],
              aladdin: ["'Aladdin'", "cursive"],
            },
            keyframes: {
              fadein: {
                "0%": { opacity: "0", transform: "translateY(20px)" },
                "100%": { opacity: "3", transform: "translateY(0)" },
              },
            },
            animation: {
              fadein: "fadein 1s ease-out forwards",
              fadeinSlow: "fadein 3s ease-out forwards",
            },
          },
        },
      };
    </script>

    <style>
      @font-face {
        font-family: "Aladdin";
        src: url("./fonts/Aladdin.ttf") format("truetype");
      }
      .intl-tel-input {
        width: 100% !important;
      }

      .intl-tel-input .form-control {
        width: 100% !important;
        box-sizing: border-box;
      }

      .iti__country-list {
        z-index: 9999;
        max-width: 400px;
      }
    </style>
  </head>
  <header
    id="site-header"
    class="sticky top-0 w-full bg-[#1a1a40] text-yellow-200 font-rounded z-50 transition-transform duration-300"
  >
    <nav
      class="flex flex-col md:flex-row items-center justify-center gap-4 py-4 px-4 text-lg md:text-xl"
    >
      <a href="#TOP" class="hover:underline">TOP</a>
      <a href="#Hero" class="hover:underline">概要</a>
      <a href="#About" class="hover:underline">Genieとは？</a>
      <a href="#Construct" class="hover:underline">システム紹介</a>
      <a href="#Map" class="hover:underline">アクセス</a>
      <a href="#Contact" class="hover:underline">お問い合わせ</a>
    </nav>
  </header>

  <body
    class="m-0 flex flex-col opacity-0 animate-fadein duration-2000 max-w-[1200px] mx-auto"
  >
    <section
      id="TOP"
      class="aspect-[3/2] bg-cover bg-center flex justify-center items-center"
      style="background-image: url('./img/genie_lp_bg.jpg')"
    >
      <h1
        class="font-rounded text-9xl p-5 text-yellow-300 opacity-0 animate-fadeinSlow duration-3000"
        style="font-family: 'Aladdin', cursive"
      >
        Genie
      </h1>
    </section>

    <section
      id="Hero"
      class="bg-[#1a1a40] text-yellow-300 py-16 md:py-24 px-4 flex flex-col justify-center items-center text-center"
      style="
        background-image: url('./img/star.jpg');
        background-size: cover;
        background-position: center;
      "
    >
      <h2
        class="font-rounded text-xl sm:text-2xl md:text-3xl lg:text-4xl p-4 leading-snug"
      >
        「願いを叶えるんじゃない。願いに気づかせる存在。」
      </h2>
      <p
        class="font-rounded text-base sm:text-lg md:text-xl p-4 max-w-xl leading-relaxed"
      >
        <span class="font-aladdin text-2xl sm:text-3xl md:text-4xl">Genie</span>
        は、学生・教育機関・企業のすべてをつなぎ、<br />
        一人ひとりが本質的な"ビジョン（願い）"に出会い、<br />
        そのビジョンを育て、実現するためのキャリア教育プラットフォームです。
      </p>
    </section>

    <section
      id="About"
      class="min-h-screen bg-cover bg-center text-yellow-300 px-4 sm:px-6 md:px-12 py-12 relative"
      style="background-image: url('./img/genie_lp_about.jpg')"
    >
      <!-- オーバーレイを入れるならここ -->
      <div class="absolute inset-0 bg-black/30"></div>

      <div class="relative max-w-4xl mx-auto text-left z-10">
        <h2 class="font-rounded text-2xl sm:text-3xl md:text-4xl mb-6">
          <span class="font-aladdin text-4xl sm:text-5xl md:text-6xl py-24"
            >Genie</span
          >とは？
        </h2>
        <p
          class="font-rounded text-base sm:text-lg md:text-xl leading-relaxed mb-12"
        >
          <br />ビジョンという“ランプ”を見つけ、<br />
          「好き」という感情と共に“じゅうたん”に乗って、<br />
          進む道の先に、新しい景色が見えてきます。<br />
        </p>
        <div class="border-t border-yellow-300/30 mt-8">
          <p
            class="font-rounded text-yellow-200 text-base sm:text-lg md:text-xl py-12 leading-relaxed"
          >
            <span class="font-aladdin text-xl sm:text-2xl">Genie</span>
            は、学生・教育機関・企業をつなぐキャリア教育プラットフォームです。<br />
            自己理解、可能性の発見、進路選択から企業との出会い、<br />
            そしてビジョン達成までを一貫して支援します。<br />
            「好き」を目的に、「得意」を手段に、<br />
            自分だけのビジョンを見つけ、その未来へ導いていきます。
          </p>

          <p
            class="italic text-yellow-100 text-center text-base sm:text-lg md:text-2xl py-20"
          >
            願いは、叶えるものじゃない。気づくものなんだ。<br />
            気づいたその時から、君の未来は動き出す。
          </p>
        </div>
      </div>
    </section>

    <style>
      @media (min-width: 768px) {
        #lamp-card,
        #atlas-card,
        #carpet-card {
          background-size: cover !important;
        }
      }
    </style>

    <section
      id="Construct"
      class="text-yellow-300 body-font bg-[#1a1a40] font-rounded px-4 md:px-16 py-24"
    >
      <div class="flex flex-col items-center space-y-12">
        <h2 class="text-2xl sm:text-3xl text-center font-rounded mb-8">
          Genieの3つのシステム
        </h2>

        <div
          class="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full"
        >
          <!-- Lamp -->
          <a href="./lp_lamp.html" class="w-full md:w-1/3">
            <div
              id="lamp-card"
              class="relative flex flex-col justify-center h-[350px] bg-center bg-no-repeat rounded-xl p-6 hover:scale-105 transition-transform duration-300 text-yellow-100"
              style="
                background-image: url('./img/lamp.jpg');
                background-size: 120%;
              "
            >
              <div class="absolute inset-0 bg-black/50 rounded-xl"></div>
              <div class="relative z-10 text-center px-4 py-6">
                <h2
                  class="font-aladdin text-4xl md:text-6xl mb-4 drop-shadow-md text-yellow-300"
                >
                  Lamp
                </h2>
                <h3
                  class="text-base md:text-lg mb-4 leading-relaxed drop-shadow-md"
                >
                  ランプを見つけること<br />それは自分の願いを見つけること。
                </h3>
                <p class="text-sm md:text-base leading-relaxed drop-shadow-md">
                  <span class="font-aladdin text-yellow-200 text-lg">Lamp</span>
                  はあなたの心の奥にある“まだ言葉になっていない願い”を見つけるためのツールです。
                </p>
              </div>
            </div>
          </a>

          <!-- Atlas -->
          <a href="./lp_atlas.html" class="w-full md:w-1/3">
            <div
              id="atlas-card"
              class="relative flex flex-col justify-center h-[350px] bg-center bg-no-repeat rounded-xl p-6 hover:scale-105 transition-transform duration-300 text-yellow-100"
              style="
                background-image: url('./img/atlas.jpg');
                background-size: 120%;
              "
            >
              <div class="absolute inset-0 bg-black/50 rounded-xl"></div>
              <div class="relative z-10 text-center px-4 py-6">
                <h2
                  class="font-aladdin text-4xl md:text-6xl mb-4 drop-shadow-md text-yellow-300"
                >
                  Atlas
                </h2>
                <h3
                  class="text-base md:text-lg mb-4 leading-relaxed drop-shadow-md"
                >
                  就職じゃなく、<br />未来の選択を描く場所。
                </h3>
                <p class="text-sm md:text-base leading-relaxed drop-shadow-md">
                  「どこへ向かいたいか」だけじゃない。<br />
                  「誰と、どんな未来をつくっていきたいか」まで描く。<br />
                  それが
                  <span class="font-aladdin">Atlas</span>
                  の役割です。
                </p>
              </div>
            </div>
          </a>

          <!-- Carpet -->
          <a href="./lp_carpet.html" class="w-full md:w-1/3">
            <div
              id="carpet-card"
              class="relative flex flex-col justify-center h-[350px] bg-center bg-no-repeat rounded-xl p-6 hover:scale-105 transition-transform duration-300 text-yellow-100"
              style="
                background-image: url('./img/carpet.jpg');
                background-size: 120%;
              "
            >
              <div class="absolute inset-0 bg-black/50 rounded-xl"></div>
              <div class="relative z-10 text-center px-4 py-6">
                <h2
                  class="font-aladdin text-4xl md:text-6xl mb-4 drop-shadow-md text-yellow-300"
                >
                  Carpet
                </h2>
                <h3
                  class="text-base md:text-lg mb-4 leading-relaxed drop-shadow-md"
                >
                  「得意」を知り、<br />じゅうたんに乗って「好き」を探す。
                </h3>
                <p class="text-sm md:text-base leading-relaxed drop-shadow-md">
                  <span class="font-aladdin text-yellow-200 text-lg"
                    >Carpet</span
                  >
                  は“得意”という風をつかみ、まだ見ぬ「好き」や「夢中になれる道」へ導くシステムです。
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section id="Map" class="bg-[#1a1a40] text-yellow-300 py-12 px-6">
      <h2 class="text-2xl font-rounded mb-4">Genieに会える場所</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.9246255414624!2d139.8828413701432!3d35.6280286187327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60187d1b0ad32835%3A0x39c7b881df67852c!2z44Ki44Op44OT44Ki44Oz44Kz44O844K544OI!5e0!3m2!1sja!2sjp!4v1745507913430!5m2!1sja!2sjp"
        class="w-full h-96 rounded-xl shadow-lg"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      >
      </iframe>
    </section>

    <section id="Contact" style="background-image: url('./img/form.jpg')">
      <div class="form-container">
<form id="seminar-form" method="POST" action="submit.php">          <div>
            <!-- 氏名 -->
            <label for="name">氏名</label>
            <input type="text" id="name" name="name" />
            <div class="error" id="error-name"></div>
          </div>

          <div>
            <!-- フリガナ -->
            <label for="furigana">フリガナ</label>
            <input type="text" id="furigana" name="furigana" />
            <div class="error" id="error-furigana"></div>
          </div>

          <div>
            <!-- メールアドレス -->
            <label for="email">メールアドレス</label>
            <input type="email" id="email" name="email" />
            <div class="error" id="error-email"></div>
          </div>

          <div>
            <!-- 電話番号 -->
            <label for="phone">電話番号</label>
            <input type="tel" id="phone" name="phone" />
            <div class="error" id="error-phone"></div>
          </div>

          <div>
            <!-- 学年（プルダウン） -->
            <label for="grade">学年</label>
            <select id="grade" name="grade">
              <option value="">選択してください</option>
              <option value="1">1年生</option>
              <option value="2">2年生</option>
              <option value="3">3年生</option>
              <option value="4">4年生</option>
            </select>
            <div class="error" id="error-grade"></div>
          </div>

          <!-- 卒業予定年度（自動表示／readonly） -->
          <label for="graduate-year">卒業予定年</label>
          <input type="text" id="graduate_year" name="graduate_year" readonly />

          <div>
            <!-- 説明会日時（ラジオ） -->
            <p>参加希望日時</p>
            <label
              ><input type="radio" name="date" value="2024-06-15" /> 6/15(土)
              14:00〜</label
            >
            <label
              ><input type="radio" name="date" value="2024-06-22" /> 6/22(土)
              18:00〜</label
            >
            <div class="error" id="error-date"></div>
          </div>

          <div>
            <!-- 利用規約同意 -->
            <label
              ><input type="checkbox" id="agree" name="agreed" />
              利用規約に同意する
            </label>
          </div>

          <!-- 送信 -->
          <button type="submit" id="seminar-form-btn">送信する</button>
        </form>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <script>
          // エラーがある時にエラーメッセージをdivタグに表示する
          function showError(selector, message) {
            $(selector).text(message).show();
          }

          // エラーがなくなった時にエラーメッセージを削除する
          function clearError(selector) {
            $(selector).text("").hide();
          }
        </script>

        <script>
          // エラー表示・非表示の共通関数
          function showError(selector, message) {
            $(selector).text(message).show();
          }

          function clearError(selector) {
            $(selector).text("").hide();
          }

          // 名前バリデーション
          function validateName() {
            const name = $("#name").val().trim();
            const pattern = /^[\u3040-\u30FF\u4E00-\u9FFF\u30FB　]{1,19}$/;
            if (!pattern.test(name)) {
              showError(
                "#error-name",
                "名前は全角（漢字・ひらがな・カタカナ）のみ入力できます（最大19文字）"
              );
              return false;
            } else {
              clearError("#error-name");
              return true;
            }
          }

          // フリガナバリデーション
          function validateFurigana() {
            const furigana = $("#furigana").val().trim();
            const pattern = /^[ァ-ヴー　]{1,30}$/;
            if (furigana === "") {
              showError(
                "#error-furigana",
                "正しくフリガナを入力してください。"
              );
              return false;
            } else if (!pattern.test(furigana)) {
              showError(
                "#error-furigana",
                "フリガナは全角カタカナのみ有効です（最大30文字）"
              );
              return false;
            } else {
              clearError("#error-furigana");
              return true;
            }
          }

          // 電話番号バリデーション（ハイフン2つ、携帯・固定両方対応）
          function validatePhone() {
            const phone = $("#phone").val().trim();
            const hyphenCount = (phone.match(/-/g) || []).length;
            const mobilePattern = /^0[789]0-\d{4}-\d{4}$/;
            const landlinePattern = /^0\d{1,4}-\d{1,4}-\d{3,4}$/;

            if (hyphenCount !== 2) {
              showError(
                "#error-phone",
                "電話番号はハイフン2つで入力してください（例：090-1234-5678）"
              );
              return false;
            } else if (
              !mobilePattern.test(phone) &&
              !landlinePattern.test(phone)
            ) {
              showError("#error-phone", "電話番号の形式が正しくありません");
              return false;
            } else {
              clearError("#error-phone");
              return true;
            }
          }

          window.addEventListener("DOMContentLoaded", function () {
            const phoneInput = document.querySelector("#phone");
            const iti = window.intlTelInput(phoneInput, {
              initialCountry: "jp", // 初期は日本
              preferredCountries: ["jp", "us", "gb"],
              utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            });

            // 既存のバリデーションを置き換え
            function validatePhoneIntl() {
              if (!iti.isValidNumber()) {
                showError("#error-phone", "電話番号の形式が正しくありません");
                return false;
              }
              clearError("#error-phone");
              return true;
            }

            // フォーム送信前に値をE.164形式に変換
          });

          // メールアドレスバリデーション（形式＋危険文字除外）
          function validateEmail() {
            const email = $("#email").val().trim();
            const pattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const suspicious = /[;<>'"`|\\]/;

            if (email === "") {
              showError("#error-email", "メールアドレスを入力してください。");
              return false;
            } else if (!pattern.test(email) || suspicious.test(email)) {
              showError(
                "#error-email",
                "正しいメールアドレス形式で入力してください。"
              );
              return false;
            } else {
              clearError("#error-email");
              return true;
            }
          }
          
          // フォーム全体チェック（最初のエラー項目にフォーカス移動）
          function validateForm() {
            let valid = true;
            let firstErrorFocused = false;

            if (!validateName()) {
              if (!firstErrorFocused) {
                $("#name").focus();
                firstErrorFocused = true;
              }
              valid = false;
            }

            if (!validateFurigana()) {
              if (!firstErrorFocused) {
                $("#furigana").focus();
                firstErrorFocused = true;
              }
              valid = false;
            }

            if (!validatePhone()) {
              if (!firstErrorFocused) {
                $("#phone").focus();
                firstErrorFocused = true;
              }
              valid = false;
            }

            if (!validateEmail()) {
              if (!firstErrorFocused) {
                $("#email").focus();
                firstErrorFocused = true;
              }
              valid = false;
            }

            return valid;
          }

          // 送信イベント（submit時）
          $("#seminar-form").on("submit", function (e) {
            e.preventDefault();

            if (!validateForm()) return;

            const formData = new FormData(this);
            for (const [key, value] of formData.entries()) {
              console.log(key, value); // ← JS 側で中身が入ってるか確認
            }
            window.scrollTo({ top: 0, behavior: "auto" });

            $.ajax({
              url: "submit.php",
              method: "POST",
              data: formData,
              processData: false,  // jQuery にデータ加工させない（FormData をそのまま送る）
              contentType: false,  // Content-Type ヘッダもブラウザ任せ（boundary込みで正しくつく）
              success: function(res) {
                // 送信成功後にジーニー画面へ
                $("body > *")
                  .not("#genie-success")
                  .fadeOut(600, function() {
                    $("#genie-success")
                      .css({ display: "flex" })
                      .fadeIn(800);
                  });
              },
              error: function(xhr, status, err) {
                alert("送信に失敗しました: " + err);
              }
            });
          });

          // リアルタイムバリデーション（input時）
          $("#name").on("input", validateName);
          $("#furigana").on("input", validateFurigana);
          $("#phone").on("input", validatePhone);
          $("#email").on("input", validateEmail);

          $("#grade").on("change", function () {
            const currentYear = new Date().getFullYear();
            const selected = parseInt($(this).val());

            if (!isNaN(selected)) {
              const graduateYear = currentYear + (4 - selected);
              $("#graduate_year").val(graduateYear);
            } else {
              $("#graduate_year").val("");
            }
          });
        </script>
      </div>
    </section>

    <footer
      class="flex justify-center items-center bg-[#1a1a40] text-yellow-300 py-8 px-4 text-sm text-xs"
    >
      &copy; 2025 Genie Inc. All rights reserved.
    </footer>

    <!-- 👇 スクロールでヘッダー非表示 -->
    <script>
      let lastScroll = 0;
      const header = document.getElementById("site-header");

      window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
          header.classList.add("-translate-y-full");
        } else {
          header.classList.remove("-translate-y-full");
        }

        lastScroll = currentScroll;
      });
    </script>
    <div id="genie-success" style="display: none">
      <img src="./img/genie.jpg" alt="Genie" class="genie-img" />
      <div class="genie-message">
        <section id="genie-story">
          <div class="story-line">
            “願い”は、叶えるものじゃない。見つけるものなんだ。
          </div>
          <div class="story-line">
            ジーニーは、君の“好き”を一緒に探しに来ただけ。
          </div>
          <div class="story-line">さあ、見つけよう。あなただけの Lamp を。</div>
        </section>
      </div>
      <button
        id="start-diagnosis"
        onclick="location.href='../lamp-ui/diagnosis/index.html'"
      >
        診断してみる
      </button>
    </div>
  </body>
</html>
