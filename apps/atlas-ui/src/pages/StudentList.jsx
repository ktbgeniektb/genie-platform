import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });

    useEffect(() => {
    fetch(`${API_URL}/students`)
        .then((res) => res.json())
        .then(setStudents);
    }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("削除しますか？")) return;
    await fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleUpdate = async () => {
    await fetch(`${API_URL}/students/${editStudent.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editStudent),
    });
    setEditStudent(null);
    setStudents(students.map((s) => (s.id === editStudent.id ? editStudent : s)));
  };
const API_URL = import.meta.env.VITE_API_URL;

const handleAdd = async () => {
  if (!newStudent.name || !newStudent.email) return alert("全項目入力してね！");

  const res = await fetch(`${API_URL}/students`, {
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
        <Card className="mb-6">
        <CardHeader>
            <CardTitle>新規登録</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            <Input
            placeholder="名前"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-[200px]"
            />
            <Input
            placeholder="メール"
            type="email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="w-[300px]"
            />
            <Button onClick={handleAdd}>追加</Button>
        </CardContent>
        </Card>


      {/* 👇 一覧表示（そのまま） */}
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名前</TableHead>
            <TableHead>メール</TableHead>
            <TableHead>操作</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {students.map((s) => (
            <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>
                <Button variant="outline" size="sm" onClick={() => setEditStudent(s)} className="mr-2">
                    編集
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>
                    削除
                </Button>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>


      {/* 👇 編集モード（そのまま） */}
        {editStudent && (
        <Card className="mt-6">
            <CardHeader>
            <CardTitle>編集モード</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
            <Input
                value={editStudent.name}
                onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                className="w-[200px]"
            />
            <Input
                value={editStudent.email}
                type="email"
                onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                className="w-[300px]"
            />
            <Button variant="success" onClick={handleUpdate}>
                保存
            </Button>
            </CardContent>
        </Card>
        )}
    </div>
  );
};

export default StudentList;
