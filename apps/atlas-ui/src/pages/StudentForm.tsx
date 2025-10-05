import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import api from "../lib/api";

// ====== Types ======
interface Student {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  education: string;
  graduation_year?: number | null;
  line_id?: string;
  postal_code?: string;
  address_prefecture?: string;
  address_line1?: string;
  application_reason?: string;
}

// ====== 取得関数 ======
async function fetchStudent(id: string): Promise<Student> {
  const res = await api.get(`/students/${id}`);
  return res.data.student;
}

interface StudentFormProps {
  mode: "create" | "edit" | "delete";
}

interface FormState {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  education: string;
  graduation_year: string;
  line_id?: string;
  postal_code?: string;
  address_prefecture?: string;
  address_line1?: string;
  application_reason?: string;
}

export default function StudentForm({ mode }: StudentFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const location = useLocation();
  const passed = location.state?.student;

  // ====== Edit/Delete は対象データを取得 ======
  const needFetch = mode !== "create";
  const { data: initial, isLoading } = useQuery<Student>({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id!),
    enabled: needFetch && !!id,
    initialData: passed || qc.getQueryData(["student", id]),
  });

  // ====== フォーム状態 ======
  const [form, setForm] = useState<FormState>({
    name: "",
    furigana: "",
    email: "",
    phone: "",
    education: "",
    graduation_year: "",
  });

  useEffect(() => {
    if (initial && mode !== "create") {
      setForm({
        name: initial.name ?? "",
        furigana: initial.furigana ?? "",
        education: initial.education ?? "",
        graduation_year: String(initial.graduation_year ?? ""),
        email: initial.email ?? "",
        phone: initial.phone ?? "",
        line_id: initial.line_id ?? "",
        postal_code: initial.postal_code ?? "",
        address_prefecture: initial.address_prefecture ?? "",
        address_line1: initial.address_line1 ?? "",
        application_reason: initial.application_reason ?? "",
      });
    }
  }, [initial, mode]);

  // ====== Create ======
  const createMut = useMutation({
    mutationFn: (payload: any) => api.post("/students", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
    onError: (err: any) => console.error(err.response?.data || err),
  });

  // ====== Update ======
  const updateMut = useMutation({
    mutationFn: (payload: any) => api.put(`/students/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["student", id] });
      navigate(`/students/${id}`);
    },
    onError: (err: any) => console.error(err.response?.data || err),
  });

  // ====== Delete ======
  const deleteMut = useMutation({
    mutationFn: () => api.delete(`/students/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
  });

  // ====== 送信処理 ======
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
    };

    console.log("POST payload", payload);

    if (mode === "create") {
      await createMut.mutateAsync(payload);
    } else if (mode === "edit") {
      await updateMut.mutateAsync(payload);
    }
  }

  // ====== UI：Delete のときは確認ダイアログ ======
  if (mode === "delete") {
    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      );
    }

    return (
      <AlertDialog open={true} onOpenChange={(open) => !open && navigate(-1)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>学生を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              対象: <strong>{initial?.name ?? "(no name)"}</strong>
              <br />
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate(-1)}>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMut.mutateAsync()}
              disabled={deleteMut.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMut.isPending ? "削除中..." : "削除する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // ====== 共通フォーム（Create/Edit） ======
  if (needFetch && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Card className="border-border shadow-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {mode === "create" ? "Register a new student" : "Edit student information"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {mode === "create"
              ? "Fill in the details below to add a new student to Atlas"
              : "Update the student information below"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* 氏名 */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  氏名 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="山田 太郎"
                  required
                  className="h-10"
                />
              </div>

              {/* ふりがな */}
              <div className="space-y-2">
                <Label htmlFor="furigana" className="text-sm font-medium">
                  ふりがな <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="furigana"
                  value={form.furigana}
                  onChange={(e) => setForm({ ...form, furigana: e.target.value })}
                  placeholder="やまだ たろう"
                  required
                  className="h-10"
                />
              </div>

              {/* メール */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  メール <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="taro@example.com"
                  required
                  className="h-10"
                />
              </div>

              {/* 携帯番号 */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  携帯番号 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="080-1234-5678"
                  required
                  className="h-10"
                />
              </div>

              {/* 最終学歴 */}
              <div className="space-y-2">
                <Label htmlFor="education" className="text-sm font-medium">
                  最終学歴（予定） <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="education"
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
                  placeholder="○○大学 △△学部"
                  required
                  className="h-10"
                />
              </div>

              {/* 卒業年度 */}
              <div className="space-y-2">
                <Label htmlFor="graduation_year" className="text-sm font-medium">
                  卒業年度
                </Label>
                <Input
                  id="graduation_year"
                  type="number"
                  value={form.graduation_year ?? ""}
                  onChange={(e) => setForm({ ...form, graduation_year: e.target.value })}
                  placeholder="2027"
                  inputMode="numeric"
                  className="h-10"
                />
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
                className="min-w-[100px]"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={createMut.isPending || updateMut.isPending}
                className="min-w-[100px]"
              >
                {mode === "create"
                  ? createMut.isPending
                    ? "作成中..."
                    : "作成"
                  : updateMut.isPending
                    ? "更新中..."
                    : "更新"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
