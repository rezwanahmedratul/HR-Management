'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReportRow } from '../types/report';
import { formatCurrency, formatDate, formatText } from '../lib/format';
import { StatusBadge } from './status-badge';

interface ReportTableProps {
  rows: ReportRow[];
}

export function ReportTable({ rows }: ReportTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <th
                scope="col"
                className="px-4 py-3 sticky left-0 bg-muted/80 backdrop-blur-sm z-20 min-w-[160px]"
              >
                Employee
              </th>
              <th scope="col" className="px-4 py-3 min-w-[140px]">
                Department
              </th>
              <th scope="col" className="px-4 py-3 min-w-[200px]">
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right font-mono min-w-[120px]"
              >
                Basic Salary
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right font-mono min-w-[110px]"
              >
                Bonus
              </th>
              <th scope="col" className="px-4 py-3 font-mono min-w-[120px]">
                Date
              </th>
              <th scope="col" className="px-4 py-3 min-w-[110px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            <AnimatePresence mode="popLayout" initial={false}>
              {rows.map((row, index) => {
                const rowKey = `${row.employee_name}-${row.attendance_date ?? 'no-date'}-${index}`;

                return (
                  <motion.tr
                    key={rowKey}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(index * 0.035, 0.3),
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="group transition-colors duration-150 hover:bg-muted/40"
                  >
                    {/* Employee */}
                    <td className="px-4 py-3 font-medium text-foreground sticky left-0 bg-background group-hover:bg-muted/40 transition-colors z-10 whitespace-nowrap">
                      {row.employee_name}
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3 text-foreground whitespace-nowrap">
                      {formatText(row.department_name)}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatText(row.email)}
                    </td>

                    {/* Basic Salary */}
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground whitespace-nowrap">
                      {formatCurrency(row.basic_salary)}
                    </td>

                    {/* Bonus */}
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground whitespace-nowrap">
                      {formatCurrency(row.bonus)}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">
                      {formatDate(row.attendance_date)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
