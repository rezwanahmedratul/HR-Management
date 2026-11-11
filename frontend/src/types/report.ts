export type AttendanceStatus = 'Present' | 'Absent' | 'Leave';

export interface ReportRow {
  employee_name: string;
  department_name: string | null;
  email: string | null;
  basic_salary: number | null;
  bonus: number | null;
  attendance_date: string | null;
  status: AttendanceStatus | null;
}

export interface ReportFilters {
  search: string;
  department: string;
  status: string;
}
