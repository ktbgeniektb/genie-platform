import { useQuery } from "@tanstack/react-query";

export type Student = {
  id: number;
  name: string;
  email: string;
  graduation_year: number;
  created_at?: string;
  updated_at?: string;
};