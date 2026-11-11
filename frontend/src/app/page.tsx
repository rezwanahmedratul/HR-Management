'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { fetchDepartments, fetchReport } from '../lib/api';
import { exportReportToCsv } from '../lib/csv';
import { ReportRow } from '../types/report';
import { ThemeToggle } from '../components/theme-toggle';
import { ReportToolbar } from '../components/report-toolbar';
import { ReportTable } from '../components/report-table';
import { SkeletonRows } from '../components/skeleton-rows';
import { EmptyState } from '../components/empty-state';
import { ErrorState } from '../components/error-state';

export default function HomePage() {
  const [rows, setRows] = React.useState<ReportRow[]>([]);
  const [departments, setDepartments] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Filter states
  const [searchInput, setSearchInput] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');

  // Debounce search input (250 ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Load departments once
  React.useEffect(() => {
    let active = true;
    fetchDepartments()
      .then((data) => {
        if (active) setDepartments(data);
      })
      .catch(() => {
        // Fallback: continue even if department list fails
      });
    return () => {
      active = false;
    };
  }, []);

  // Fetch report data on filter changes
  const loadReport = React.useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await fetchReport({
        search: debouncedSearch,
        department: selectedDept,
        status: selectedStatus,
      });
      setRows(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, selectedDept, selectedStatus]);

  React.useEffect(() => {
    loadReport();
  }, [loadReport]);

  const handleExportCsv = () => {
    exportReportToCsv(rows);
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-between"
      >
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          HR Report
        </h1>
        <ThemeToggle />
      </motion.header>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <ReportToolbar
          search={searchInput}
          onSearchChange={setSearchInput}
          department={selectedDept}
          onDepartmentChange={setSelectedDept}
          departments={departments}
          status={selectedStatus}
          onStatusChange={setSelectedStatus}
          onExportCsv={handleExportCsv}
          isExportDisabled={isLoading || hasError || rows.length === 0}
        />
      </motion.div>

      {/* Main Content Area */}
      <section className="flex-1">
        {hasError ? (
          <div className="rounded-lg border border-border bg-card p-6">
            <ErrorState onRetry={loadReport} />
          </div>
        ) : isLoading ? (
          <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 sticky left-0 bg-muted/80 backdrop-blur-sm z-20 min-w-[160px]">
                      Employee
                    </th>
                    <th className="px-4 py-3 min-w-[140px]">Department</th>
                    <th className="px-4 py-3 min-w-[200px]">Email</th>
                    <th className="px-4 py-3 text-right font-mono min-w-[120px]">
                      Basic Salary
                    </th>
                    <th className="px-4 py-3 text-right font-mono min-w-[110px]">
                      Bonus
                    </th>
                    <th className="px-4 py-3 font-mono min-w-[120px]">Date</th>
                    <th className="px-4 py-3 min-w-[110px]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <SkeletonRows rowCount={8} />
                </tbody>
              </table>
            </div>
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-6">
            <EmptyState />
          </div>
        ) : (
          <ReportTable rows={rows} />
        )}
      </section>
    </main>
  );
}
