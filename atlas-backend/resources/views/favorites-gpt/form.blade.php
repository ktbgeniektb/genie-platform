<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<meta name="csrf-token" content="{{ csrf_token() }}">

<h2>好きの棚卸し</h2>

<div id="form-area">
  <label>Q1. 今までに夢中になったこと・好きだったことは？</label><br>
  <textarea id="q1"></textarea><br><br>

  <label>Q2. 夢中になったこと・好きだったことの中で一番うれしかった・心が動いたできごとは？</label><br>
  <textarea id="q2"></textarea><br><br>
  <button id="add-btn">このできごとを追加する</button>

  <p id="added-msg" style="display:none;">
    ✅ 追加しました！<br>
    他にも思い出せる「好きだったこと」があれば「もう1つ追加する」を押してください。
  </p>
</div>

<div id="control-area" style="display:none; margin-top:2rem;">
  <button id="add-more-btn">さらに追加する</button>
  <button id="submit-btn">終了して送信</button>
</div>

<script>
  const answers = [];

  $("#add-btn").on("click", function () {
    const q1 = $("#q1").val().trim();
    const q2 = $("#q2").val().trim();

    if (!q1 || !q2) {
      alert("どちらも入力してね！");
      return;
    }

    answers.push({ q1, q2 });
    $("#q1").val("");
    $("#q2").val("");

    $("#form-area").hide();
    $("#control-area").show();
  });

  $("#add-more-btn").on("click", function () {
    $("#form-area").show();
    $("#control-area").hide();
  });

  $("#submit-btn").on("click", function () {
    fetch("/favorites-gpt/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
      body: JSON.stringify({ answers }),
    })
      .then(res => res.text())
      .then(html => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch(err => {
        console.error("送信エラー", err);
        alert("送信に失敗しました");
      });
  });
</script>
