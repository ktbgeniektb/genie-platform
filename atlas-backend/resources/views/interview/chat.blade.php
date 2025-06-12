<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>AI面談チャット</title>
</head>
<body>
  <h1>AIとの自己分析スタート！</h1>

  <div id="question-box">
    <p id="question"></p>
  </div>

  <textarea id="answer" rows="4" cols="50" placeholder="ここに答えてね"></textarea><br>
  <button id="next-btn">次へ</button>

<script>
const questions = [
  "あなたの人生の中で、一番“心が震えた瞬間”を教えてください",
  "周りに何を言われても、否定されても譲れない価値観はありますか？",
  "気づいたら夢中になっていたり、ずっと続けていることはありますか？"
];

let current = 0;
const answers = [];

function showQuestion() {
  document.getElementById('question').textContent = questions[current];
  document.getElementById('answer').value = '';
}

document.getElementById('next-btn').addEventListener('click', () => {
  const text = document.getElementById('answer').value.trim();
  if (!text) return alert("回答を入力してね");

  answers.push({ index: current, text: text });
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    // Laravel に送信する処理
    fetch("/interview/submit", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": '{{ csrf_token() }}'
    },
    body: JSON.stringify({ answers: answers })
    })
    .then(res => res.text())
    .then(html => {
    document.open();
    document.write(html);
    document.close();
    })
    .catch(err => {
      console.error("❌ エラー:", err);
      alert("送信中にエラーが発生しました");
    });
  }
});

showQuestion();
</script>

</body>
</html>
