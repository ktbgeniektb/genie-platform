// src/api/logs.js
import { api } from "./client";

function normalizeEmotions(e) {
  if (Array.isArray(e)) return e;
  if (e == null || e === "") return [];
  if (typeof e === "string") {
    // JSON文字列 or カンマ区切りの両対応
    try {
      const parsed = JSON.parse(e);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return e.split(",").map(s => s.trim()).filter(Boolean);
  }
  if (typeof e === "object") return Object.values(e).filter(Boolean);
  return [];
}

function mapLog(row = {}) {
  return {
    id: row.id,
    user_id: row.user_id ?? null,
    industry: row.industry ?? row.category ?? null,
    content: row.comment ?? row.body ?? row.text ?? row.content ?? "",
    // ← 重要: emotionsを素通し（必要なら正規化）
    emotions: normalizeEmotions(row.emotions),
    detection: row.detection ?? null,
    createdAt: row.created_at ?? row.createdAt ?? row.created ?? null,
    updatedAt: row.updated_at ?? row.updatedAt ?? null,
  };
}

export const Logs = {
  list: async (limit = 10, page = 1) => {
    const res = await api.get(`/lamp/logs?limit=${limit}&page=${page}`);
    // 1) ページネーション { data: [...] }
    if (Array.isArray(res?.data?.data)) {
      return res.data.data.map(mapLog);
    }
    // 2) 素配列
    if (Array.isArray(res?.data)) {
      return res.data.map(mapLog);
    }
    // 3) まれに素の配列が返る実装
    if (Array.isArray(res)) {
      return res.map(mapLog);
    }
    return [];
  },

  create: (payload) => api.post("/lamp/logs", payload),

  show: async (id) => {
    const res = await api.get(`/lamp/logs/${id}`);
    const row = res?.data?.data ?? res?.data ?? res; // Resource対応/素返し両対応
    return mapLog(row);
  },

  update: (id, payload) => api.put(`/lamp/logs/${id}`, payload),
  destroy: (id) => api.delete(`/lamp/logs/${id}`),
};

// ショートカット
export async function fetchRecentLogs(limit = 3) {
  return Logs.list(limit, 1);
}
