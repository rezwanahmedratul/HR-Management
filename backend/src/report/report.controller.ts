import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportQueryDto } from './dto/report-query.dto';
import { ReportRowDto } from './dto/report-row.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getReport(@Query() query: ReportQueryDto): Promise<ReportRowDto[]> {
    return this.reportService.getReport(query);
  }
}
