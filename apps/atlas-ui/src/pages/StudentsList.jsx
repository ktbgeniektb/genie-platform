import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@mantine/hooks";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom"; // ← 詳細ページに飛ばす場合だけ
import api from "../lib/api";
import StudentsKPI from "../components/StudentsKPI";

export default function StudentsList() {
  // 検索・フィルタ・ページング状態
  const [page, setPage] = useState(1);
  const [per, setPer] = useState(20);
  const [year, setYear] = useState("");
  const [qInput, setQInput] = useState("");
  const [debouncedQ] = useDebouncedValue(qInput, 500);

  // フィルタ変更時は1ページ目に戻す
  useEffect(() => { setPage(1); }, [debouncedQ, year, per]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students", { page, per, q: debouncedQ, year }],
    queryFn: async ({ queryKey }) => {
      const [, opts] = queryKey;
      const res = await api.get("/students", {
        params: {
          page: opts.page,
          per: opts.per,
          ...(opts.q ? { q: opts.q } : {}),
          ...(opts.year ? { year: opts.year } : {}),
        },
      });
      return res.data; // Laravelのpaginateレスポンスを想定
    },
    keepPreviousData: true,
  });

  const rows = Array.isArray(data?.data) ? data.data : [];
  const current = data?.current_page ?? 1;
  const last = data?.last_page ?? 1;

  // 一覧に新カラムを追加（ふりがな/携帯/住所/学歴など）
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "氏名",
        cell: (info) => {
          const id = info.row.original?.id;
          const label = info.getValue();
          // 詳細画面があるならLink、なければstrongだけ
          return id ? (
            <Link to={`/students/${id}`} className="cell-link">
              {label}
            </Link>
          ) : (
            <strong>{label}</strong>
          );
        },
      },
      { accessorKey: "furigana", header: "ふりがな", cell: (i) => i.getValue() ?? "-" },
      {
        accessorKey: "email",
        header: "メール",
        cell: (i) => <span className="cell-email">{i.getValue()}</span>,
      },
      {
        accessorKey: "phone",
        header: "携帯番号",
        cell: (i) => <span className="cell-phone">{i.getValue() ?? "-"}</span>,
      },
      {
        accessorKey: "graduation_year",
        header: "卒業年度",
        cell: (i) => {
          const v = i.getValue();
          return <span>{v != null ? `${v}卒` : "-"}</span>;
        },
      },
      {
        id: "address",
        header: "現住所",
        cell: (info) => {
          const r = info.row.original;
          const pref = r?.address_prefecture || "";
          const line1 = r?.address_line1 || "";
          const text = [pref, line1].filter(Boolean).join(" ");
          return text || "-";
        },
      },
      {
        accessorKey: "education",
        header: "最終学歴（予定）",
        cell: (i) => i.getValue() ?? "-",
      },
      {
        accessorKey: "es_pdf_url",
        header: "エントリーシート",
        cell: ({ getValue }) => {
          const url = getValue();
          return url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="es-link"
            >
              PDF
            </a>
          ) : (
            <span style={{ opacity: 0.5 }}>-</span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ローディング/エラー/空
  if (isLoading) return <p>読み込み中…</p>;
  if (isError) return <p>読み込みに失敗しました</p>;
  if (rows.length === 0)
    return (
      <div className="list-card">
        <h1 className="list-title">学生一覧</h1>
        <FilterBar
          qInput={qInput}
          setQInput={setQInput}
          year={year}
          setYear={setYear}
          per={per}
          setPer={setPer}
        />
        <p>学生がいません</p>
      </div>
    );

  return (
    <div>
      <StudentsKPI
        items={[
          { label: "26卒内定出し", value: "68/70", hint: "+3" },
          { label: "26卒内定承諾", value: "31/35", hint: "+3" },
          { label: "26卒説明会着席数（年次）", value: "4,557/5,000", hint: "+12" },
          { label: "26卒説明会着席数（月次）", value: "30/20", hint: "+12" },
          { label: "27卒内定出し", value: "0/70" },
          { label: "27卒内定承諾", value: "0/35" },
          { label: "27卒説明会着席数（年次）", value: "2,624/7,500", hint: "+8" },
          { label: "27卒説明会着席数（月次）", value: "185/365", hint: "+10" },
        ]}
      />

      <div className="list-card">
        <h1 className="list-title">学生一覧</h1>

        <FilterBar
          qInput={qInput}
          setQInput={setQInput}
          year={year}
          setYear={setYear}
          per={per}
          setPer={setPer}
        />

        <div className="table-wrap">
          <table className="list-table">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <style>{`
          /* Genieっぽいダーク基調 */
          .list-card{background:#0b0f1a;border:1px solid #1e293b;border-radius:12px;padding:16px;color:#f1f5f9}
          .list-title{font-size:18px;margin:0 0 12px;font-weight:600;color:#60a5fa}

          .table-wrap{overflow:auto;border:1px solid #1e293b;border-radius:10px}
          .list-table{width:100%;border-collapse:separate;border-spacing:0;color:#e2e8f0}
          .list-table thead th{background:#1e293b;color:#93c5fd;text-align:left;font-weight:600;padding:10px 12px;border-bottom:1px solid #334155;position:sticky;top:0}
          .list-table td{padding:10px 12px;border-bottom:1px solid #1e293b;vertical-align:middle}
          .list-table tbody tr:nth-child(odd){background:rgba(255,255,255,.02)}
          .list-table tbody tr:hover{background:rgba(96,165,250,.1)}

          .cell-link{color:#93c5fd;text-decoration:none}
          .cell-link:hover{opacity:.9;text-decoration:underline}
        `}</style>

        <div style={{ display:"flex", gap:8, alignItems:"center", marginTop:12 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current <= 1}>
            Prev
          </button>
          <span>{current} / {last}</span>
          <button onClick={() => setPage((p) => Math.min(last, p + 1))} disabled={current >= last}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/** フィルタUIだけ分離（JSのまま） */
function FilterBar({ qInput, setQInput, year, setYear, per, setPer }) {
  return (
    <div style={{ display:"flex", gap:12, alignItems:"end", marginBottom:12, flexWrap:"wrap" }}>
      <div>
        <label>検索</label><br />
        <input
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          placeholder="名前 / ふりがな / メール / 電話"
        />
      </div>
      <div>
        <label>卒業年度</label><br />
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">すべて</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </div>
      <div>
        <label>表示件数</label><br />
        <select value={per} onChange={(e) => setPer(Number(e.target.value))}>
          {[10,20,50,100].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  );
}
