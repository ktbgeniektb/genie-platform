import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import AppHeader from "../components/AppHeader";
import FilterBar from "../components/FilterBar";
import StudentList from "../components/StudentList";
import AppPagination from "../components/Pagination";
import AddStudentDialog from "../components/AddStudentDialog";
import EditStudentDialog from "../components/EditStudentDialog";
import NotificationSnackbar from "../components/NotificationSnackbar";
import axios from "axios";

export default function StudentsPage() {
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
    fetch(`${API}/students`).then(r=>r.json()).then(setStudents);
  }, []);
  useEffect(() => {
    let arr = students;
    if (searchTerm) arr = arr.filter(s=>s.name.includes(searchTerm));
    if (yearFilter) arr = arr.filter(s=>s.graduationYear===yearFilter);
    if (statusFilter) arr = arr.filter(s=>s.status===statusFilter);
    setFiltered(arr);
    setPage(1);
  },[students,searchTerm,yearFilter,statusFilter]);

  // ページャー用スライス
  const pageCount = Math.ceil(filtered.length/perPage);
  const pageData = filtered.slice((page-1)*perPage, page*perPage);

  // CRUD 関数
  const addStudent = async (data) => {
    await axios.get(`${import.meta.env.VITE_LARAVEL_ORIGIN}/sanctum/csrf-cookie`, {
      withCredentials: true
    });

    const res = await axios.post(`${API}/students`, data, {
      withCredentials: true
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
      <AppHeader/>
      <Container sx={{ py:4 }}>
        <FilterBar
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          yearFilter={yearFilter} setYearFilter={setYearFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          onAddClick={()=>setOpenAdd(true)}
        />
        <StudentList
          students={pageData}
          onEdit={s=>setEditTarget(s)}
          onDelete={deleteStudent}
        />
        <AppPagination page={page} count={pageCount} onChange={setPage}/>
      </Container>

      <AddStudentDialog open={openAdd} onClose={()=>setOpenAdd(false)} onSave={addStudent}/>
      {editTarget && (
        <EditStudentDialog
          open={!!editTarget}
          student={editTarget}
          onClose={()=>setEditTarget(null)}
          onSave={updateStudent}
        />
      )}

      <NotificationSnackbar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={()=>setSnack({...snack,open:false})}
      />
    </>
  );
}
