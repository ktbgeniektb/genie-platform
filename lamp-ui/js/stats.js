import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const typeCount = {};
const scoreSum = { kyomei: 0, tankyu: 0, hyougen: 0, taiken: 0, chosen: 0 };
let total = 0;

const snapshot = await getDocs(collection(db, "diagnosisResults"));

snapshot.forEach(doc => {
  const data = doc.data();
  const { topType, score } = data;

  typeCount[topType] = (typeCount[topType] || 0) + 1;

  for (let key in score) scoreSum[key] += score[key];
  total++;
});

const scoreAvg = {};
for (let key in scoreSum) {
  scoreAvg[key] = (scoreSum[key] / total).toFixed(1);
}

// 棒グラフ：topTypeランキング
const sorted = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
const topLabels = sorted.map(e => e[0]);
const topValues = sorted.map(e => e[1]);

new Chart(document.getElementById("topTypeChart"), {
  type: "bar",
  data: {
    labels: topLabels,
    datasets: [{
      label: "人数",
      data: topValues,
    }]
  }
});

// レーダーチャート：平均スコア
new Chart(document.getElementById("avgScoreRadar"), {
  type: "radar",
  data: {
    labels: ["共鳴", "探求", "表現", "体験", "挑戦"],
    datasets: [{
      label: "平均スコア",
      data: [
        scoreAvg.kyomei,
        scoreAvg.tankyu,
        scoreAvg.hyougen,
        scoreAvg.taiken,
        scoreAvg.chosen
      ]
    }]
  },
  options: {
    scales: {
      r: { min: 0, max: 75.5 }
    }
  }
});
