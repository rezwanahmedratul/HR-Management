import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salary } from './salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salary])],
  exports: [TypeOrmModule],
})
export class SalaryModule {}
