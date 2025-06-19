<h2>あなたの「好き」を深掘りしていこう</h2>
<div id="chat-box"></div>

<textarea id="user-input" placeholder="ここに答えてください"></textarea><br>
<button id="send-btn">送信</button>

<script>
let chatHistory = [];
let currentQuestionIndex = 0;
const questions = @json($questions); // ← サーバーから渡されたやつ

function appendMessage(role, text) {
  const div = document.createElement('div');
  div.innerHTML = (role === 'user' ? '<strong>あなた：</strong>' : '<strong>AI：</strong>') + text;
  document.getElementById('chat-box').appendChild(div);
}

// 最初の質問を出す
appendMessage('ai', questions[currentQuestionIndex]);

document.getElementById('send-btn').addEventListener('click', function () {
  const input = document.getElementById('user-input').value;
  appendMessage('user', input);
  chatHistory.push({ role: 'user', content: input });

  document.getElementById('user-input').value = '';

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    appendMessage('ai', questions[currentQuestionIndex]);
    chatHistory.push({ role: 'ai', content: questions[currentQuestionIndex] });
  } else {
    appendMessage('ai', 'ありがとうございました！自己理解を深める手助けができて嬉しいです。');
    document.getElementById('send-btn').disabled = true;
  }
});
</script>
