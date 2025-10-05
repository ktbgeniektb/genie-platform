// src/pages/Students.tsx

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@mantine/hooks";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";

export default function Students() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [per, setPer] = useState(20);
  const [year, setYear] = useState("");
  const [qInput, setQInput] = useState("");
  const [debouncedQ] = useDebouncedValue(qInput, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ, year, per]);

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
      return res.data;
    },
    keepPreviousData: true,
  });

    const rows = Array.isArray(data?.data) ? data.data : [];
    const current = data?.current_page ?? 1;
    const last = data?.last_page ?? 1;

    const columns = useMemo(
    () => [
        {
        accessorKey: "name",
        header: "氏名",
        cell: (info) => {
            const id = info.row.original?.id;
            const label = info.getValue();
            return id ? (
            <Link
                to={`/students/${id}`}
                className="text-blue-600 font-medium hover:underline"
            >
                {label}
            </Link>
            ) : (
            <span className="font-medium">{label}</span>
            );
        },
        },
        {
        accessorKey: "graduation_year",
        header: "卒業年度",
        cell: (i) => {
            const v = i.getValue();
            return <span>{v ? `${v}卒` : "-"}</span>;
        },
        },
        {
        id: "address",
        header: "現住所・学歴",
        cell: (info) => {
            const r = info.row.original;
            const pref = r?.address_prefecture || "";
            const line1 = r?.address_line1 || "";
            const edu = r?.education || "";
            const text = [pref, line1].filter(Boolean).join(" ");

            return (
            <div className="truncate max-w-[220px]" title={text}>
                <div>{text || "-"}</div>
                {edu && (
                <div className="text-xs text-muted-foreground mt-0.5">
                    {edu}
                </div>
                )}
            </div>
            );
        },
        },
        {
        accessorKey: "email",
        header: "メール",
        cell: (i) => (
            <div className="truncate max-w-[180px]" title={i.getValue() ?? ""}>
            {i.getValue() ?? "-"}
            </div>
        ),
        },
        {
        accessorKey: "phone",
        header: "携帯番号",
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
                className="text-blue-500 hover:underline"
            >
                PDF
            </a>
            ) : (
            <span className="text-muted-foreground">-</span>
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

  if (isLoading)
    return (
      <div className="p-6 text-muted-foreground">読み込み中...</div>
    );
  if (isError)
    return (
      <div className="p-6 text-red-500">読み込みに失敗しました</div>
    );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Students</h2>
        <p className="text-muted-foreground">
          Manage and monitor student information
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">学生一覧</h3>
          <button
            onClick={() => navigate("/students/create")}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition"
          >
            + 新規登録
          </button>
        </div>

        <FilterBar
          qInput={qInput}
          setQInput={setQInput}
          year={year}
          setYear={setYear}
          per={per}
          setPer={setPer}
        />

        <div className="overflow-x-auto border border-border rounded-lg mt-4">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className="text-left font-semibold text-muted-foreground px-4 py-2 border-b border-border"
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-6 text-muted-foreground">
                    学生がいません
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-muted/30 transition-colors border-b border-border"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current <= 1}
            className="px-3 py-1 border border-border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-muted-foreground">
            {current} / {last}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(last, p + 1))}
            disabled={current >= last}
            className="px-3 py-1 border border-border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterBar({ qInput, setQInput, year, setYear, per, setPer }) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground mb-1">検索</label>
        <input
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          placeholder="名前 / ふりがな / メール / 電話"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground mb-1">卒業年度</label>
        <select
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">すべて</option>
          {[2026, 2027, 2028, 2029, 2030].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground mb-1">表示件数</label>
        <select
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          value={per}
          onChange={(e) => setPer(Number(e.target.value))}
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
