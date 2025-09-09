import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';

async function fetchStudent(id) {
  const res = await api.get(`/students/${id}`, { toast: false });
  return res.data;                 // axiosはここにJSON本体
}

export default function StudentDetail() {
  const { id } = useParams();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id),
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
    select: (raw) => raw?.data ?? raw,
  })

  function onDelete() {
    if (isDeleting) return;
    if (confirm("この学生を削除しますか？"));
  }

  if (!id) return <div>URLが不正です</div>;
  if (isLoading) return <div>読み込み中...</div>;
  if (isError) {
    const status = error?.response?.status; // axiosのHTTPステータス
    if (status === 404) {
      return (
        <div>
          <p><Link to="/students">← 一覧へ</Link></p>
          学生が見つかりません（ID: {id}）
        </div>
      );
    }
    return <div>取得に失敗：{String(error?.message ?? '')}</div>;
  }

// 返却の直前で
const s = data;

return (
  <div className="detail-card">
    {/* ヘッダー */}
    <div className="detail-head">
      <div className="head-left">
        <div className="avatar">{(s.name || "?").slice(0, 1)}</div>
        <div>
          <h1 className="detail-title">{s.name}</h1>
          <div className="detail-sub">
            <span>{s.furigana || "ふりがな未設定"}</span>
            <span className="dot">•</span>
            <span>{s.graduation_year != null ? `${s.graduation_year}卒` : "-"}</span>
            {s.education && (<><span className="dot">•</span><span>{s.education}</span></>)}
          </div>
          <div className="badge-row">
            <span className="badge">候補者</span>
            {s.address_prefecture && <span className="badge ghost">{s.address_prefecture}</span>}
          </div>
        </div>
      </div>
      <div className="actions">
        {s.es_pdf_url && (
          <a href={s.es_pdf_url} target="_blank" rel="noopener noreferrer" className="btn subtle">
            📄 ES
          </a>
        )}
        <button className="btn danger" onClick={onDelete}>削除</button>
        <Link to="/students" className="btn ghost">一覧へ</Link>
      </div>
    </div>

    {/* 概要 */}
    <div className="section">
      <h2 className="section-title">概要</h2>
      <div className="field-grid">
        <Field label="氏名" value={s.name} strong />
        <Field label="ふりがな" value={s.furigana} />
        <Field label="最終学歴（予定）" value={s.education} />
        <Field label="卒業予定年度" value={s.graduation_year != null ? `${s.graduation_year}卒` : ""} />
      </div>
    </div>

    {/* 連絡先（コピー付き） */}
    <div className="section">
      <h2 className="section-title">連絡先</h2>
      <div className="field-grid">
        <CopyField label="メール" value={s.email} />
        <CopyField label="携帯" value={s.phone} />
        <Field label="LINE ID" value={s.line_id} mono />
      </div>
    </div>

    {/* 住所 */}
    <div className="section">
      <h2 className="section-title">住所</h2>
      <div className="field-grid">
        <Field label="郵便番号" value={s.postal_code} mono />
        <Field label="都道府県" value={s.address_prefecture} />
        <Field label="市区町村・番地等" value={s.address_line1} />
        <Field
          label="表示"
          value={[s.address_prefecture, s.address_line1].filter(Boolean).join(" ")}
        />
      </div>
    </div>

    {/* メモ */}
    <div className="section">
      <h2 className="section-title">メモ</h2>
      {s.application_reason ? (
        <pre className="note">{s.application_reason}</pre>
      ) : (
        <div className="empty">未入力</div>
      )}
    </div>

    {/* このページ専用のスタイル（共通CSSに移してもOK） */}
    <style>{`
      .detail-card{background:#0b0f1a;border:1px solid #1e293b;border-radius:14px;padding:16px;color:#e2e8f0;line-height:1.55}
      .detail-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;border-bottom:1px solid #1e293b;padding-bottom:12px;margin-bottom:12px}
      .head-left{display:flex;gap:12px;align-items:center}
      .avatar{width:40px;height:40px;border-radius:999px;background:#1e293b;display:flex;align-items:center;justify-content:center;font-weight:700;color:#93c5fd;border:1px solid #334155}
      .detail-title{margin:0;color:#60a5fa;font-size:22px;font-weight:700}
      .detail-sub{margin-top:6px;color:#94a3b8;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
      .detail-sub .dot{opacity:.6}
      .badge-row{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap}
      .badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:#1e293b;border:1px solid #334155;color:#93c5fd;font-size:12px}
      .badge.ghost{background:transparent;color:#cbd5e1}
      .actions{display:flex;gap:8px}
      .btn{padding:8px 12px;border-radius:10px;border:1px solid #334155;background:#0b1220;color:#e2e8f0;cursor:pointer;transition:all .15s}
      .btn:hover{background:#0e1626;transform:translateY(-1px)}
      .btn.primary{border-color:#3b82f6;background:#1e3a8a}
      .btn.danger{border-color:#ef4444;background:#7f1d1d}
      .btn.ghost{background:transparent}
      .btn.subtle{background:#0b0f1a}
      .section{border:1px solid #1e293b;border-radius:12px;padding:12px;margin-bottom:12px;background:#0b1220}
      .section-title{margin:0 0 10px;color:#93c5fd;font-size:16px}
      .field-grid{display:grid;grid-template-columns:160px 1fr;row-gap:10px;column-gap:12px}
      .field-label{color:#94a3b8}
      .field-value{font-weight:500}
      .field-value.mono{font-family:ui-monospace, SFMono-Regular, Menlo, monospace}
      .field-value.strong{font-weight:700}
      .note{white-space:pre-wrap;line-height:1.6;background:#0b0f1a;border:1px solid #1e293b;border-radius:8px;padding:10px}
      .empty{color:#64748b}
      @media (max-width:640px){ .detail-head{flex-direction:column} .field-grid{grid-template-columns:1fr} }
    `}</style>
  </div>
);

}

function Field({ label, value, mono, strong }) {
  if (value == null || value === "") return null;
  return (
    <>
      <div className="field-label">{label}</div>
      <div className={`field-value ${mono ? "mono" : ""} ${strong ? "strong" : ""}`}>{value}</div>
    </>
  );
}

function CopyField({ label, value }) {
  if (!value) return null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); } catch {}
  };
  return (
    <>
      <div className="field-label">{label}</div>
      <div className="field-value mono" style={{display:"flex",gap:8,alignItems:"center"}}>
        <span>{value}</span>
        <button className="btn" style={{padding:"4px 8px"}} onClick={copy} title="コピー">コピー</button>
      </div>
    </>
  );
}
