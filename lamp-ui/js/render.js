import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export function renderFromFirestore(id, firebaseConfig, templates) {
//   console.log("▶️ Firestoreレンダー開始: id=", id);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const ref = doc(db, "diagnosisResults", id);

  getDoc(ref).then((docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      // console.log("✅ Firestore取得成功:", data);

      const [top1, top2] = data.topType.split("_"); 
      // console.log(data.topType);

      const template = templates.find((t) => t.main === data.topType);
      // console.log("🎯 テンプレート:", template);

      setDisplay(top1, top2, template, data.score, db);
    } else {
      console.error("❌ Firestoreに診断結果が見つかりません");
    }
  }).catch((err) => {
    console.error("🔥 Firestoreエラー:", err);
  });
}

export function renderFromLocalStorage(templates) {
  const urlParams = new URLSearchParams(window.location.search);
  const top1 = urlParams.get("top1") || localStorage.getItem("top1");
  const top2 = urlParams.get("top2") || localStorage.getItem("top2");
  const key = `${top1}_${top2}`;
  const scores = {
    kyomei: Number(localStorage.getItem("kyomei")),
    tankyu: Number(localStorage.getItem("tankyu")),
    hyougen: Number(localStorage.getItem("hyougen")),
    taiken: Number(localStorage.getItem("taiken")),
    chosen: Number(localStorage.getItem("chosen"))
  };
  const template = templates.find((t) => t.main === key);
  setDisplay(top1, top2, template, data.score);
}

export function renderFromURLParams(templates) {
  const urlParams = new URLSearchParams(window.location.search);
  const top1 = urlParams.get("top1");
  const top2 = urlParams.get("top2");

  if (!top1 || !top2) {
    console.error("URLに top1 または top2 が含まれていません");
    return;
  }
  const key = `${top1}_${top2}`;
  const scores = {
    kyomei: Number(localStorage.getItem("kyomei")),
    tankyu: Number(localStorage.getItem("tankyu")),
    hyougen: Number(localStorage.getItem("hyougen")),
    taiken: Number(localStorage.getItem("taiken")),
    chosen: Number(localStorage.getItem("chosen"))
  };

  const data = { score: scores };

  const template = templates.find((t) => t.main === key);
  setDisplay(top1, top2, template, data.score);
}

function setDisplay(top1, top2, template, scores, db) {
//   console.log("🛠 setDisplay呼び出し", { top1, top2, template, scores });

  const key = `${top1}_${top2}`;
  $("#top-image").attr("src", `../img/results/${key}.jpg`);

  const displayOrder = [top1, top2].sort((a, b) => scores[b] - scores[a]);

  const typeColors = {
    kyomei: "#FFA94D",
    tankyu: "#58A7FF",
    hyougen: "#FFD93D",
    taiken: "#4DD599",
    chosen: "#FF5F5F",
  };

  const typeLabels = {
    kyomei: "共鳴型",
    tankyu: "探求型",
    hyougen: "表現型",
    taiken: "体験型",
    chosen: "挑戦型",
  };

  if (!template) {
    console.error("❌ テンプレートが見つかりません");
    return;
  }

  $("#main-type").html(
    `あなたの<br>「ビジョンの源泉」は<br>
    <span style="color: ${typeColors[displayOrder[0]]}; font-weight: bold;">
      ${typeLabels[displayOrder[0]]}
    </span> × 
    <span style="color: ${typeColors[displayOrder[1]]}; font-weight: bold;">
      ${typeLabels[displayOrder[1]]}
    </span>`
  );

  $("#description").html(template.description);
  $("#catch").html(template.catch);
  $("#features").html(template.features.map((f) => `<li>${f}</li>`).join(""));
  $("#moments").html(template.moments.map((f) => `<li>${f}</li>`).join(""));
  $("#tips").html(template.tips.map((f) => `<li>${f}</li>`).join(""));
  $("#sub").html(template.sub);

    const normalizedScores = {
    kyomei: Math.round((scores.kyomei / 75.5) * 100),
    tankyu: Math.round((scores.tankyu / 75.5) * 100),
    hyougen: Math.round((scores.hyougen / 75.5) * 100),
    taiken: Math.round((scores.taiken / 75.5) * 100),
    chosen: Math.round((scores.chosen / 75.5) * 100),
  };

  getDocs(collection(db, "diagnosisResults")).then((snapshot) => {
  const typeCount = {};
  snapshot.forEach((doc) => {
    const data = doc.data();
    const type = data.topType;
    if (!type) return;
    typeCount[type] = (typeCount[type] || 0) + 1;
  });

  const sorted = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
  const myTypeKey = `${top1}_${top2}`;
  const rank = sorted.findIndex(([type]) => type === myTypeKey) + 1;
  const totalTypes = sorted.length + 1;

  $("#type-ranking").html(
    `<h2>🥇 タイプランキング</h2>
    <p>あなたのタイプ「${typeLabels[top1]} × ${typeLabels[top2]}」は <strong>${rank}位 / 全${totalTypes}タイプ</strong> 中でした！</p>`
  );
});

  // チャート描画
  Chart.register(ChartDataLabels);

  const ctx = document.getElementById("result-chart").getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["共鳴型", "探求型", "表現型", "体験型", "挑戦型"],
      datasets: [{
        data: [
          normalizedScores.kyomei,
          normalizedScores.tankyu,
          normalizedScores.hyougen,
          normalizedScores.taiken,
          normalizedScores.chosen,
        ],
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderColor: "#fff",
        pointBackgroundColor: "#fff",
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: "#fff",
          font: { weight: "bold", size: 14 },
          anchor: "end",
          align: "bottom",
          offset: 10,
          formatter: (value) => value + "点",
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 15,
            backdropColor: "transparent",
          },
          pointLabels: {
            font: { size: 20 },
          },
          grid: {
            circular: false,
            color: (ctx) =>
              ctx.index === 6 ? "#FFD700" : "rgba(255,255,255,0.2)",
          },
        },
      },
    },
  });

  $("#top-image").addClass("lamp-appear");

  $(window).on("scroll", function () {
    $(".fade-up").each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() * 0.8
      ) {
        $(this).addClass("active");
      }
    });
  });
}

