<h2>🧠 AIが考えた「あなたへの深掘り質問」</h2>

<ul>
  @foreach ($questions as $question)
    <li>{{ $question }}</li>
  @endforeach
</ul>

<a href="/favorites-gpt">🔁 もう一度やり直す</a>
