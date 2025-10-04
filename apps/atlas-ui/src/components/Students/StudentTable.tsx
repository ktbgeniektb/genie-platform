import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StudentTableProps {
  searchQuery: string;
  statusFilter: string;
}

const students = [
  { id: 1, name: "Alice Johnson", email: "alice.j@email.com", status: "active", progress: 85, lastActive: "2h ago" },
  { id: 2, name: "Bob Smith", email: "bob.s@email.com", status: "active", progress: 92, lastActive: "1d ago" },
  { id: 3, name: "Charlie Brown", email: "charlie.b@email.com", status: "at-risk", progress: 45, lastActive: "5d ago" },
  { id: 4, name: "Diana Prince", email: "diana.p@email.com", status: "active", progress: 78, lastActive: "3h ago" },
  { id: 5, name: "Ethan Hunt", email: "ethan.h@email.com", status: "inactive", progress: 30, lastActive: "14d ago" },
  { id: 6, name: "Fiona Green", email: "fiona.g@email.com", status: "active", progress: 88, lastActive: "1h ago" },
];

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
  switch (status) {
    case "active":
      return "default";
    case "at-risk":
      return "destructive";
    default:
      return "secondary";
  }
};

export const StudentTable = ({ searchQuery, statusFilter }: StudentTableProps) => {
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell className="text-muted-foreground">{student.email}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(student.status)}>
                  {student.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{student.progress}%</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{student.lastActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
