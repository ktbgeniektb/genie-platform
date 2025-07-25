import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import AppHeader from "../components/AppHeader";
import FilterBar from "../components/FilterBar";
import StudentList from "../components/StudentList";
import AppPagination from "../components/Pagination";
import AddStudentDialog from "../components/AddStudentDialog";
import EditStudentDialog from "../components/EditStudentDialog";
import NotificationSnackbar from "../components/NotificationSnackbar";
import {Table, TableRow, TableCell, TableHead, TableBody, TableContainer, Paper, IconButton } from '@mui/material';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StudentsList() {
  const API = import.meta.env.VITE_API_URL;
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [openAdd, setOpenAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [snack, setSnack] = useState({ open:false,message:"",severity:"success" });

  // 初回とフィルター変更時に students→filtered を計算
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${API}/students`, {
          withCredentials: true
        });
        setStudents(res.data);
      } catch (err) {
        console.error("学生データ取得失敗:", err);
        // 401ならログイン画面にリダイレクトするなど
      }
    };
    fetchStudents();
  }, []);
  useEffect(() => {
    let arr = students;
    if (searchTerm) arr = arr.filter(s => s.name.includes(searchTerm));
    if (yearFilter) arr = arr.filter(s => String(s.graduation_year) === yearFilter); // ←ここ修正
    setFiltered(arr);
    setPage(1);
  }, [students, searchTerm, yearFilter]);

  // ページャー用スライス
  const pageCount = Math.ceil(filtered.length/perPage);
  const pageData = filtered.slice((page-1)*perPage, page*perPage);

  // CRUD 関数
  const addStudent = async (data) => {
    await axios.get(`${import.meta.env.VITE_LARAVEL_ORIGIN}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
  
  const payload = {
    ...data,
    graduation_year: Number(data.graduation_year)
  };

  const res = await axios.post(`${API}/students`, payload, {
    withCredentials: true,
    headers: {
      Accept: 'application/json'  // ← バリデーションエラー時の419防止
    }
    });

    const created = res.data;
    setStudents([...students, created]);
    setOpenAdd(false);
    setSnack({ open: true, message: "追加しました", severity: "success" });
  };

  const updateStudent = async (data) => {
    await axios.get(`${import.meta.env.VITE_LARAVEL_ORIGIN}/sanctum/csrf-cookie`, {
      withCredentials: true
    });

    await axios.put(`${API}/students/${data.id}`, data, {
      withCredentials: true
    });

    setStudents(students.map(s => s.id === data.id ? data : s));
    setEditTarget(null);
    setSnack({ open: true, message: "更新しました", severity: "info" });
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("削除しますか？")) return;

    await axios.get(`${import.meta.env.VITE_LARAVEL_ORIGIN}/sanctum/csrf-cookie`, {
      withCredentials: true
    });

    await axios.delete(`${API}/students/${id}`, {
      withCredentials: true
    });

    setStudents(students.filter(s => s.id !== id));
    setSnack({ open: true, message: "削除しました", severity: "warning" });
  };
  
  return (
    <>
      <AppHeader />

      <Container sx={{ py: 4 }}>
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          onAddClick={() => setOpenAdd(true)}
        />
        
        <StudentList
          students={pageData}
          onEdit={s => setEditTarget(s)}
          onDelete={deleteStudent}
        />

        <AppPagination page={page} count={pageCount} onChange={setPage} />
      </Container>

      <AddStudentDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={addStudent}
      />

      {editTarget && (
        <EditStudentDialog
          open={!!editTarget}
          student={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={updateStudent}
        />
      )}

      <NotificationSnackbar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </>
  );

}
