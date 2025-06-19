<h2>あなたへの深掘り質問</h2>
<div id="chat-box"></div>

<textarea id="user-input" placeholder="ここに答えてください"></textarea><br>
<button id="send-btn">送信</button>

<script>
let chatHistory = [];

function appendMessage(role, text) {
  const div = document.createElement('div');
  div.textContent = (role === 'user' ? 'あなた: ' : 'AI: ') + text;
  document.getElementById('chat-box').appendChild(div);
}

document.getElementById('send-btn').addEventListener('click', function () {
  const userInput = document.getElementById('user-input').value;
  appendMessage('user', userInput);
  document.getElementById('user-input').value = '';

  fetch('/deepdive/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify({
      history: chatHistory,
      answer: userInput
    })
  })
  .then(res => res.json())
  .then(data => {
    appendMessage('ai', data.question);
    chatHistory.push({ role: 'user', content: userInput });
    chatHistory.push({ role: 'ai', content: data.question });
  });
});
</script>
