import React from "react";
import { Stack } from "@mui/material";
import StudentCard from "./StudentCard";

export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <Stack spacing={2}>
      {students.map(s => (
        <StudentCard
          key={s.id}
          student={s}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}
