import React from "react";
import { Card, CardHeader, CardContent, CardActions, Button, Typography } from "@mui/material";

export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <Card variant="outlined">
      <CardHeader title={student.name} subheader={`ID: ${student.id}`} />
      <CardContent>
        <Typography>メール：{student.email}</Typography>
        <Typography>ステータス：{student.status==="submitted"?"提出済":"未提出"}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>onEdit(student)}>編集</Button>
        <Button size="small" color="error" onClick={()=>onDelete(student.id)}>削除</Button>
      </CardActions>
    </Card>
  );
}
