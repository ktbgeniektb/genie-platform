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
  </header>

  <body
    class="m-0 flex flex-col opacity-0 animate-fadein duration-2000 max-w-[1200px] mx-auto"
  >
<section id="Contact" style="background-image: url('./img/form.jpg')">
      <div class="form-container">
          <form id="seminar-form" method="POST" action="submit.php">
            <div>
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
