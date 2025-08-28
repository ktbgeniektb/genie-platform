import api from "../lib/api";

export const fetchStudents = async () => {
  const res = await api.get("/students", {
    headers: { Accept: "application/json" },
  });
  return res.data;  // 配列としてそのまま返す
};

export default fetchStudents;