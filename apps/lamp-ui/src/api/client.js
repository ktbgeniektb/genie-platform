// src/api/client.js
const BASE = import.meta.env.VITE_API_BASE_URL || "";

export const token = {
  get: () => localStorage.getItem("lamp_token") || "",
  set: (t) => localStorage.setItem("lamp_token", t),
  clear: () => localStorage.removeItem("lamp_token"),
};

async function request(path, { method = "GET", headers = {}, body } = {}) {
  const token = localStorage.getItem("lamp_token");
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch {}

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get:  (path)       => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  del:  (path)       => request(path, { method: "DELETE" }),
};
