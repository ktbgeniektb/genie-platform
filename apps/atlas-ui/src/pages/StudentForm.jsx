import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

// ====== 取得関数 ======
async function fetchStudent(id) {
  const res = await api.get(`/students/${id}`);
  return res.data; // (HINT) APIの形に合わせて
}

export default function StudentForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  // ====== Edit/Delete は対象データを取得 ======
  const needFetch = mode !== "create";
  const { data: initial, isLoading } = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id),
    enabled: needFetch && !!id,
    select: (raw) => raw, // 必要ならここで data 整形
  });

  // ====== フォーム状態 ======
  const [form, setForm] = useState({
  name: "", furigana: "", email: "", phone: "", education: "", graduation_year: "",
    // 任意で: furigana, phone, line_id, postal_code, address_prefecture, address_line1, application_reason...
  });

useEffect(() => {
  if (initial && mode !== "create") {
    setForm((prev) => ({
      ...prev,
      name: initial.name ?? "",
      furigana: initial.furigana ?? "",
      education: initial.education ?? "",
      graduation_year: initial.graduation_year ?? "",
      email: initial.email ?? "",
      phone: initial.phone ?? "",
      line_id: initial.line_id ?? "",
      postal_code: initial.postal_code ?? "",
      address_prefecture: initial.address_prefecture ?? "",
      address_line1: initial.address_line1 ?? "",
      application_reason: initial.application_reason ?? "",
      // es_pdf_url はフォームで編集しないなら入れなくてOK
    }));
  }
}, [initial, mode]);

  // ====== Create ======
  const createMut = useMutation({
    mutationFn: (payload) => api.post("/students", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
    onError: (err) => console.error(err.response?.data || err),
  });

  // ====== Update ======
  const updateMut = useMutation({
    mutationFn: (payload) => api.put(`/students/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["student", id] });
      navigate(`/students/${id}`);
    },
    onError: (err) => console.error(err.response?.data || err),
  });

  // ====== Delete ======
  const deleteMut = useMutation({
    mutationFn: () => api.delete(`/students/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
  });

  // ====== 送信処理 ======
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
    };

    console.log('POST payload', payload);

    if (mode === "create") {
      await createMut.mutateAsync(payload);
    } else if (mode === "edit") {
      await updateMut.mutateAsync(payload);
    } else if (mode === "delete") {
      // ここは「削除確認」画面想定
      await deleteMut.mutateAsync();
    }
  }

  // ====== UI：Delete のときは確認だけ ======
  if (mode === "delete") {
    if (isLoading) return <div>Loading...</div>;
    return (
      <div className="card">
        <h1>学生を削除しますか？</h1>
        <p>対象: <strong>{initial?.name ?? "(no name)"}</strong></p>
        <div className="row gap">
          <button className="btn danger" onClick={handleSubmit} disabled={deleteMut.isPending}>
            {deleteMut.isPending ? "削除中..." : "削除する"}
          </button>
          <button className="btn ghost" onClick={() => navigate(-1)}>キャンセル</button>
        </div>
      </div>
    );
  }

  // ====== 共通フォーム（Create/Edit） ======
  if (needFetch && isLoading) return <div>Loading...</div>;

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>{mode === "create" ? "学生を新規作成" : "学生を編集"}</h1>

      <label className="f">
        <span>氏名</span>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="山田 太郎"
          required
        />
      </label>

      <label className="f">
        <span>メール</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="taro@example.com"
          required
        />
      </label>

      <label className="f">
        <span>卒業年度</span>
        <input
          type="number"
          value={form.graduation_year ?? ""}
          onChange={(e) => setForm({ ...form, graduation_year: e.target.value })}
          placeholder="2027"
          inputMode="numeric"
        />
      </label>

      <label className="f">
        <span>ふりがな</span>
        <input
          value={form.furigana}
          onChange={(e) => setForm({ ...form, furigana: e.target.value })}
          required
          placeholder="やまだ たろう"
        />
      </label>

      <label className="f">
        <span>携帯番号</span>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          placeholder="080-1234-5678"
        />
      </label>

      <label className="f">
        <span>最終学歴（予定）</span>
        <input
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })}
          required
          placeholder="○○大学 △△学部"
        />
      </label>


      <div className="row gap">
        <button className="btn primary" type="submit" disabled={createMut.isPending || updateMut.isPending}>
          {mode === "create" ? (createMut.isPending ? "作成中..." : "作成") : (updateMut.isPending ? "更新中..." : "更新")}
        </button>
        <button className="btn ghost" type="button" onClick={() => navigate(-1)}>キャンセル</button>
      </div>
    </form>
  );
}
