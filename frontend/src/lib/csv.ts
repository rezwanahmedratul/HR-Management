import { ReportRow } from '../types/report';

function escapeCsvField(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export function exportReportToCsv(
  rows: ReportRow[],
  filename = 'hr-report.csv',
): void {
  const headers = [
    'Employee',
    'Department',
    'Email',
    'Basic Salary',
    'Bonus',
    'Date',
    'Status',
  ];

  const csvRows = [
    headers.join(','),
    ...rows.map((row) =>
      [
        escapeCsvField(row.employee_name),
        escapeCsvField(row.department_name ?? ''),
        escapeCsvField(row.email ?? ''),
        escapeCsvField(row.basic_salary ?? ''),
        escapeCsvField(row.bonus ?? ''),
        escapeCsvField(row.attendance_date ?? ''),
        escapeCsvField(row.status ?? ''),
      ].join(','),
    ),
  ];

  const blob = new Blob([csvRows.join('\r\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
