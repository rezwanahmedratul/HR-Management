'use client';

import * as React from 'react';
import { Check, X, Clock } from 'lucide-react';
import { AttendanceStatus } from '../types/report';

interface StatusBadgeProps {
  status: AttendanceStatus | string | null | undefined;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) {
    return <span className="text-muted-foreground">—</span>;
  }

  switch (status) {
    case 'Present':
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-foreground text-background"
          role="status"
        >
          <Check className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
          <span>Present</span>
        </span>
      );

    case 'Absent':
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border border-foreground text-foreground bg-transparent"
          role="status"
        >
          <X className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
          <span>Absent</span>
        </span>
      );

    case 'Leave':
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border border-dashed border-foreground/60 text-foreground bg-muted/40"
          role="status"
        >
          <Clock className="w-3 h-3 stroke-[2]" aria-hidden="true" />
          <span>Leave</span>
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-border text-muted-foreground">
          {status}
        </span>
      );
  }
}
