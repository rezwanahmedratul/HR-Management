import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async findAllNames(): Promise<string[]> {
    const departments = await this.departmentRepository.find({
      select: ['department_name'],
      order: { department_name: 'ASC' },
    });
    return departments.map((d) => d.department_name);
  }
}
