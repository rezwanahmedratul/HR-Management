import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity({ name: 'Salary' })
export class Salary {
  @PrimaryGeneratedColumn({ name: 'salary_id' })
  salary_id!: number;

  @Column({ name: 'employee_id', type: 'int', nullable: true })
  employee_id!: number | null;

  @Column({ name: 'basic_salary', type: 'decimal', precision: 10, scale: 2 })
  basic_salary!: number;

  @Column({
    name: 'bonus',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  bonus!: number | null;

  @OneToOne(() => Employee, (employee) => employee.salary, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;
}
