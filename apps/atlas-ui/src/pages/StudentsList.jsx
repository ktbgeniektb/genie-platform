import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchStudents from "../lib/studentsApi";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function StudentsList() {
  // 1) useQueryでデータ取得
  const {data, isLoading, isError} = useQuery({
    queryKey: ["students", { page: 1 }],
    queryFn: fetchStudents,
  });

  const rows = Array.isArray(data) ? data : [];

  const columns = [
    { accessorKey: "name", header: "氏名",
      cell: (info) => <strong>{info.getValue()}</strong> },
    { accessorKey: "email", header: "メールアドレス",
      cell: (info) => <span className="cell-email">{info.getValue()}</span> },
    { accessorKey: "graduation_year", header: "卒業年",
      cell: (info) => <span>{info.getValue()}卒</span> },
  ];

  // useReactTable も無条件に呼ぶ（データは rows を渡す）
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 2) ロード中
  if (isLoading) return <p>読み込み中…</p>;
  // 3) エラー時
  if (isError)   return <p>読み込みに失敗しました</p>;
  // 4) データが空
  if (!data || data.length === 0) return <p>学生がいません</p>;

  // 5) 正常表示
return (
  <div className="list-card">
    <h1 className="list-title">学生一覧</h1>

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
    `}</style>
  </div>
);
}