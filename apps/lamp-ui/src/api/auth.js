// src/api/auth.js
import { api } from "./client";

export async function login(email, password) {
  // Laravel側は x-www-form-urlencoded でもOKだが、JSONで受けられるならこれで十分
  const data = await api.post("/lamp/login", { email, password });
  // { message, token, user }
  return data;
}

export async function me() {
  return await api.get("/lamp/me"); // { id, name, email, ... }
}

export async function logout() {
  // 成功/失敗問わずクライアント側のトークンは捨てる
  try { await api.post("/lamp/logout", {}); } catch {}
}
