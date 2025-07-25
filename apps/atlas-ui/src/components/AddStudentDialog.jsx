import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export default function AddStudentDialog({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name:"", email:"", graduation_year: "" });

  const handleSave = async () => {
    const student = {
      ...form,
      graduation_year: parseInt(form.graduation_year, 10),
    };

    // ✅ ここでログを出す
    console.log('送信する student:', student);

    try {
      await onSave(student); // ここで親コンポーネントの addStudent() を呼ぶ
      setForm({ name: "", email: "", graduation_year: "" });
      onClose();
    } catch (error) {
      console.error('登録エラー:', error.response?.data?.errors || error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新規学生登録</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth label="名前" margin="dense"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          fullWidth label="メール" margin="dense"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          fullWidth label="卒業年度" margin="dense" type="number"
          value={form.graduation_year}
          onChange={e => setForm({ ...form, graduation_year: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSave} variant="contained">追加</Button>
      </DialogActions>
    </Dialog>
  );
}
