import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import fetchStudents from "../lib/studentsApi";

export default function StudentsList() {
  // 1) useQueryでデータ取得
  const {data, isLoading, isError} = useQuery({
    queryKey: ["students", { page: 1 }],
    queryFn: fetchStudents,
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
    <ul>{data.map(s=>(
      <li key={s.id}>
        {s.name} ({s.email}) — {s.graduation_year}卒
      </li>
      ))}
    </ul>
  </div>
  );
}
