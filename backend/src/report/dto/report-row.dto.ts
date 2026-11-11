export interface ReportRowDto {
  employee_name: string;
  department_name: string | null;
  email: string | null;
  basic_salary: number | null;
  bonus: number | null;
  attendance_date: string | null;
  status: 'Present' | 'Absent' | 'Leave' | null;
}
