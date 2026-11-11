import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Department } from '../department/department.entity';
import { Salary } from '../salary/salary.entity';
import { Attendance } from '../attendance/attendance.entity';

@Entity({ name: 'Employee' })
export class Employee {
  @PrimaryGeneratedColumn({ name: 'employee_id' })
  employee_id!: number;

  @Column({ name: 'employee_name', type: 'varchar', length: 100 })
  employee_name!: string;

  @Column({ name: 'department_id', type: 'int', nullable: true })
  department_id!: number | null;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: true })
  email!: string | null;

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'department_id' })
  department!: Department | null;

  @OneToOne(() => Salary, (salary) => salary.employee)
  salary!: Salary;

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendances!: Attendance[];
}
