import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity({ name: 'Attendance' })
export class Attendance {
  @PrimaryGeneratedColumn({ name: 'attendance_id' })
  attendance_id!: number;

  @Column({ name: 'employee_id', type: 'int', nullable: true })
  employee_id!: number | null;

  @Column({ name: 'attendance_date', type: 'date' })
  attendance_date!: string;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  status!: 'Present' | 'Absent' | 'Leave';

  @ManyToOne(() => Employee, (employee) => employee.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;
}
