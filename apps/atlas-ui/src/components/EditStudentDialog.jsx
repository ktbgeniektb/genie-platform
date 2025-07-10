import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

export default function EditStudentDialog({ open, onClose, onSave, student }) {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (student) {
      setForm(student);
    } else {
      setForm({ name: "", email: "" });
    }
  }, [student]);

  const handleSave = () => {
    onSave(form);
    setForm({ name: "", email: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{student ? "学生情報を編集" : "新規学生登録"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="名前"
          margin="dense"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          fullWidth
          label="メール"
          margin="dense"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSave} variant="contained">
          {student ? "更新" : "追加"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
