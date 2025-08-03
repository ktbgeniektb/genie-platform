const SNSShareComponent = ({ id, topType }) => {
  const basePath = '/gs/genie-platform/apps/lamp-ui';
  const shareUrl = `${window.location.origin}${basePath}/result/${id}`;
  const text = `私の診断タイプは「${topType}」でした！ #Lamp診断`;

  const openPopup = (url) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`;
    openPopup(url);
  };

  const handleLineShare = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl
    )}`;
    openPopup(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("URLをコピーしました！");
  };

  return (
    <section className="sns-share">
      <h2>📤 結果をシェアしよう</h2>
      <button onClick={handleTwitterShare}>X（旧Twitter）でシェア</button>
      <button onClick={handleLineShare}>LINEで送る</button>
      <button onClick={handleCopy}>URLをコピー</button>
    </section>
  );
};

export default SNSShareComponent;