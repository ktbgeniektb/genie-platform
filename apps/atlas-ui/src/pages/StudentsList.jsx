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
    { accessorKey: "name", header: "氏名" },
    { accessorKey: "email", header: "メールアドレス" },
    { accessorKey: "graduation_year", header: "卒業年" },
  ];

  // useReactTable も無条件に呼ぶ（データは rows を渡す）
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // 2) ロード中
  if (isLoading) return <p>読み込み中…</p>;
  // 3) エラー時
  if (isError)   return <p>読み込みに失敗しました</p>;
  // 4) データが空
  if (!data || data.length === 0) return <p>学生がいません</p>;

  // 5) 正常表示
  return (
    <div>
      <h1>学生一覧</h1>
      <table className="min-w-full border">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th key={h.id} className="border px-2 py-1">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border px-2 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}