import api from "../lib/api";

export const fetchStudents = async () => {
  const res = await api.get("/students", {
  params: {
    page,
    per,
    ...(q ? { q } : {}),
    ...(year ? { year } : {}),
  },
});
  return res.data;
};

export default fetchStudents;