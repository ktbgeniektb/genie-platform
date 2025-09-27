// src/api/logs.js
import { api } from "./client";

/**
 * payload = { industry: string, text: string, emotions: string[] }
 */
export const Logs = {
  list:   (limit = 10, page = 1) => api.get(`/lamp/logs?limit=${limit}&page=${page}`),
  create: (payload)              => api.post("/lamp/logs", payload),
  show:   (id)                   => api.get(`/lamp/logs/${id}`),
  update: (id, payload)          => api.post(`/lamp/logs/${id}?_method=PUT`, payload), // ← Laravel慣例（PUT直でもOK）
  destroy:(id)                   => api.del(`/lamp/logs/${id}`),
};
