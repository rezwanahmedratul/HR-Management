import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { ReportQueryDto } from './dto/report-query.dto';
import { ReportRowDto } from './dto/report-row.dto';

interface RawReportRow {
  employee_name: string;
  department_name: string | null;
  email: string | null;
  basic_salary: string | number | null;
  bonus: string | number | null;
  attendance_date: string | Date | null;
  status: 'Present' | 'Absent' | 'Leave' | null;
}

function formatDateString(val: unknown): string | null {
  if (!val) return null;
  if (typeof val === 'string') {
    const match = val.match(/^\d{4}-\d{2}-\d{2}/);
    if (match) return match[0];
  }
  if (val instanceof Date) {
    const year = val.getFullYear();
    const month = String(val.getMonth() + 1).padStart(2, '0');
    const day = String(val.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return String(val);
}

function parseDecimal(val: unknown): number | null {
  if (val === null || val === undefined) return null;
  const num = typeof val === 'number' ? val : parseFloat(String(val));
  return Number.isNaN(num) ? null : num;
}

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getReport(query: ReportQueryDto): Promise<ReportRowDto[]> {
    const qb = this.employeeRepository
      .createQueryBuilder('e')
      .leftJoin('e.department', 'd')
      .leftJoin('e.salary', 's')
      .leftJoin('e.attendances', 'a')
      .select([
        'e.employee_name AS employee_name',
        'd.department_name AS department_name',
        'e.email AS email',
        's.basic_salary AS basic_salary',
        's.bonus AS bonus',
        'a.attendance_date AS attendance_date',
        'a.status AS status',
      ])
      .orderBy('e.employee_name', 'ASC')
      .addOrderBy('a.attendance_date', 'ASC');

    if (query.search && query.search.trim().length > 0) {
      const term = `%${query.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(e.employee_name) LIKE :term OR LOWER(e.email) LIKE :term)',
        { term },
      );
    }

    if (query.department && query.department.trim().length > 0) {
      qb.andWhere('d.department_name = :department', {
        department: query.department.trim(),
      });
    }

    if (query.status && query.status.trim().length > 0) {
      qb.andWhere('a.status = :status', { status: query.status.trim() });
    }

    const rawRows = (await qb.getRawMany()) as RawReportRow[];

    return rawRows.map((row) => ({
      employee_name: row.employee_name,
      department_name: row.department_name ?? null,
      email: row.email ?? null,
      basic_salary: parseDecimal(row.basic_salary),
      bonus: parseDecimal(row.bonus),
      attendance_date: formatDateString(row.attendance_date),
      status: row.status ?? null,
    }));
  }
}
