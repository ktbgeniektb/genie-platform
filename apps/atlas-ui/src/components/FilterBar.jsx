import React from "react";
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export default function FilterBar({
  searchTerm, setSearchTerm,
  yearFilter, setYearFilter,
  onAddClick // statusFilter削除
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ my:2 }}>
      <TextField label="名前で検索" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>卒業年度</InputLabel>
        <Select value={yearFilter} label="卒業年度" onChange={e => setYearFilter(e.target.value)}>
          <MenuItem value="">全て</MenuItem>
          <MenuItem value="2025">25卒</MenuItem>
          <MenuItem value="2026">26卒</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={onAddClick}>新規登録</Button>
    </Stack>
  );
}
