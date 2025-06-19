<h2>あなたの「好き」から導かれた深掘り質問</h2>
<form action="/deepdive/answer" method="POST">
    @csrf

    @foreach($questions as $i => $question)
        <label>{{ $question }}</label><br>
        <textarea name="q{{ $i + 1 }}"></textarea><br><br>
    @endforeach
  <button type="submit">次へ</button>
</form>
