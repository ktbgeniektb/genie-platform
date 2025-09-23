import axios from "axios";

// ---- 共通: エラーメッセージ整形（Laravel想定） -----------------
function toMessage(error) {
  if (error?.response) {
    const { status, data } = error.response;
    if (status === 422 && data?.errors) {
      const first = Object.values(data.errors)?.[0];
      return Array.isArray(first) ? first[0] : data.message || "入力内容を確認してください";
    }
    if (status === 401) return "ログインが必要です（401）";
    if (status === 403) return "権限がありません（403）";
    if (status === 404) return "見つかりませんでした（404）";
    if (status >= 500) return "サーバーでエラーが発生しました（500）";
    return data?.message || `エラーが発生しました（${status}）`;
  }
  if (error?.request) return "ネットワークまたはサーバーに接続できません";
  return error?.message || "不明なエラー";
}

// CustomEventという新イベントを作る。detailの中身は呼び出し側で決める
export function emitToast(detail) {
  // detail: { type: "info" | "success" | "error", message: string }
  window.dispatchEvent(new CustomEvent("toast", { detail }));
}

// ---- axios インスタンス -------------------------------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  withCredentials: false,
});

// ---- リクエストインターセプター（任意: 認証ヘッダー等） ----------
api.interceptors.request.use((config) => {
  // 例: トークン付与
  // const token = localStorage.getItem("token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- レスポンスインターセプター -----------------------------------
api.interceptors.response.use(
  (res) => {
    // オプション: 呼び出し側が { toast: { success: "保存しました" }} を指定したときだけ成功トースト
    const toastOpt = res.config?.toast;
    if (toastOpt?.success) {
      emitToast({ type: "success", message: toastOpt.success });
    }
    return res;
  },
  (error) => {
    // 失敗時は共通エラートースト（ただし呼び出し側で { toast: false } を指定したら抑止）
    const cfg = error?.config;
    if (cfg?.toast !== false) {
      emitToast({ type: "error", message: toMessage(error) });
    }
    return Promise.reject(error);
  }
);

export default api;
