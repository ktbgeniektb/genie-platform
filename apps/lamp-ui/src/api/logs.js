// src/api/logs.js
import { api } from "./client";

function mapLog(row = {}) {
  return {
    id: row.id,
    industry: row.industry ?? row.category ?? null,
    content: row.comment ?? row.body ?? row.text ?? row.content ?? "",  // ←本文を正規化
    createdAt: row.created_at ?? row.createdAt ?? row.created ?? null,
  };
}

export const Logs = {
  list: async (limit = 10, page = 1) => {
    const res = await api.get(`/lamp/logs?limit=${limit}&page=${page}`);
    // ページネーション対応（dataが配列の場合を優先）
    if (Array.isArray(res?.data)) {
      return res.data.map(mapLog);
    }
    // もしAPIが素配列で返す場合
    if (Array.isArray(res)) {
      return res.map(mapLog);
    }
    return [];
  },
  create: (payload) => api.post("/lamp/logs", payload),
  show:   async (id) => mapLog(await api.get(`/lamp/logs/${id}`)),
  update: (id, payload) => api.put(`/lamp/logs/${id}`, payload),
  destroy:(id) => api.delete(`/lamp/logs/${id}`),
};

// ショートカット
export async function fetchRecentLogs(limit = 3) {
  return Logs.list(limit, 1); // ここで正規化後の配列が返る
}
