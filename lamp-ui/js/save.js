import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveDiagnosis(scoreData, topType) {
  try {
    // 🔽 entries.json に追記（await で待つ）
    // const response = await fetch("/../../gs/genie-platform/lp/entries.json", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: new URLSearchParams({
    //     name: localStorage.getItem("userName"),
    //     topType: topType
    //   })
    // });

    // const data = await response.json();
    // console.log("✅ entries.json 更新:", data);

    // 🔽 Firestoreに保存
    const docRef = await addDoc(collection(db, "diagnosisResults"), {
      score: scoreData,
      topType: topType,
      name: localStorage.getItem("userName"), // ← ここにも保存したいなら
      createdAt: serverTimestamp()
    });

    // 🔽 遷移は最後に
    window.location.href = `./result.html?id=${docRef.id}`;
  } catch (error) {
    alert("保存に失敗しました");
    console.error("🔥 Firestore or PHP Error:", error);
  }
}
