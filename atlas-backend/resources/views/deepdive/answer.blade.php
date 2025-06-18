<h2>あなたの深掘り回答</h2>

@foreach ($answers as $i => $value)
  <p><strong>Q{{ $i + 1 }}:</strong> {{ $value }}</p>
@endforeach

<form action="/vision/style" method="GET">
  <button type="submit">この内容で次へ進む ▶</button>
</form>