import React, { useEffect, useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("http://localhost:9090/api/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("削除しますか？")) return;
    await fetch(`http://localhost:9090/api/students/${id}`, { method: "DELETE" });
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:9090/api/students/${editStudent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editStudent),
    });
    setEditStudent(null);
    setStudents(students.map((s) => (s.id === editStudent.id ? editStudent : s)));
  };

  const handleAdd = async () => {
    if (!newStudent.name || !newStudent.email) return alert("全項目入力してね！");
    const res = await fetch("http://localhost:9090/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    const created = await res.json();
    setStudents([...students, created]);
    setNewStudent({ name: "", email: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">学生管理画面</h1>

      {/* 👇 追加フォーム */}
      <div className="mb-6 border p-4">
        <h2 className="text-lg font-semibold mb-2">新規登録</h2>
        <input
          type="text"
          placeholder="名前"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="email"
          placeholder="メール"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1">追加</button>
      </div>

      {/* 👇 一覧表示（そのまま） */}
      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">名前</th>
            <th className="border px-2 py-1">メール</th>
            <th className="border px-2 py-1">操作</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="border px-2 py-1">{s.id}</td>
              <td className="border px-2 py-1">{s.name}</td>
              <td className="border px-2 py-1">{s.email}</td>
              <td className="border px-2 py-1">
                <button onClick={() => setEditStudent(s)} className="text-blue-600 mr-2">編集</button>
                <button onClick={() => handleDelete(s.id)} className="text-red-600">削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 👇 編集モード（そのまま） */}
      {editStudent && (
        <div className="mt-4 border-t pt-4">
          <h2 className="text-xl mb-2">編集モード</h2>
          <input
            type="text"
            value={editStudent.name}
            onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="email"
            value={editStudent.email}
            onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1">保存</button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
