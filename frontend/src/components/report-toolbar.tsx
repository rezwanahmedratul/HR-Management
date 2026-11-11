'use client';

import * as React from 'react';
import { Search, Download, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  departments: string[];
  status: string;
  onStatusChange: (value: string) => void;
  onExportCsv: () => void;
  isExportDisabled?: boolean;
}

const statusOptions = ['All', 'Present', 'Absent', 'Leave'] as const;

export function ReportToolbar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  departments,
  status,
  onStatusChange,
  onExportCsv,
  isExportDisabled = false,
}: ReportToolbarProps) {
  const [deptOpen, setDeptOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const deptRef = React.useRef<HTMLDivElement>(null);
  const statusRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        deptRef.current &&
        !deptRef.current.contains(event.target as Node)
      ) {
        setDeptOpen(false);
      }
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setStatusOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const departmentList = ['All', ...departments];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full h-9 pl-9 pr-3 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow"
          aria-label="Search employee name or email"
        />
      </div>

      {/* Department Filter Dropdown */}
      <div className="relative" ref={deptRef}>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setDeptOpen(!deptOpen);
            setStatusOpen(false);
          }}
          className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          aria-haspopup="listbox"
          aria-expanded={deptOpen}
          aria-label="Filter by department"
        >
          <span>{department || 'Department'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
              deptOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {deptOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-1.5 w-44 py-1 rounded-md border border-border bg-card shadow-lg z-30"
              role="listbox"
            >
              {departmentList.map((dept) => {
                const isSelected =
                  dept === 'All' ? !department : department === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      onDepartmentChange(dept === 'All' ? '' : dept);
                      setDeptOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3 py-1.5 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:bg-muted transition-colors"
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{dept}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-foreground stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Filter Dropdown */}
      <div className="relative" ref={statusRef}>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setStatusOpen(!statusOpen);
            setDeptOpen(false);
          }}
          className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          aria-haspopup="listbox"
          aria-expanded={statusOpen}
          aria-label="Filter by status"
        >
          <span>{status || 'Status'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
              statusOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {statusOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-1.5 w-36 py-1 rounded-md border border-border bg-card shadow-lg z-30"
              role="listbox"
            >
              {statusOptions.map((opt) => {
                const isSelected =
                  opt === 'All' ? !status : status === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onStatusChange(opt === 'All' ? '' : opt);
                      setStatusOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3 py-1.5 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:bg-muted transition-colors"
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-foreground stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Export to CSV Button */}
      <div className="relative ml-auto group">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onExportCsv}
          disabled={isExportDisabled}
          aria-label="Export to CSV"
          className="flex items-center justify-center w-9 h-9 rounded-md border border-border bg-background text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        >
          <Download className="w-4 h-4 stroke-[1.75]" />
        </motion.button>

        {/* Minimal Tooltip on Hover */}
        <div
          role="tooltip"
          className="pointer-events-none absolute right-0 top-full mt-1.5 hidden group-hover:flex items-center px-2 py-1 text-xs rounded border border-border bg-foreground text-background whitespace-nowrap z-20 shadow-sm"
        >
          CSV
        </div>
      </div>
    </div>
  );
}
