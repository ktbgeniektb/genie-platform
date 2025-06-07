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
    await addDoc(collection(db, "diagnosisResults"), {
      score: scoreData,
      topType: topType,
      createdAt: serverTimestamp()
    });
    window.location.href = "./result.html";
  } catch (error) {
    alert("保存に失敗しました");
    console.error("Firestore error:", error);
  }
}
