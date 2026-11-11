import * as React from 'react';

export function SkeletonRows({ rowCount = 8 }: { rowCount?: number }) {
  const rows = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <>
      {rows.map((row) => (
        <tr
          key={row}
          className="border-b border-border/60 animate-pulse"
        >
          {/* Employee */}
          <td className="px-4 py-3.5 sticky left-0 bg-background z-10">
            <div className="h-4 w-28 bg-muted rounded" />
          </td>
          {/* Department */}
          <td className="px-4 py-3.5">
            <div className="h-4 w-24 bg-muted rounded" />
          </td>
          {/* Email */}
          <td className="px-4 py-3.5">
            <div className="h-4 w-36 bg-muted rounded" />
          </td>
          {/* Basic Salary */}
          <td className="px-4 py-3.5 text-right">
            <div className="h-4 w-20 bg-muted rounded ml-auto" />
          </td>
          {/* Bonus */}
          <td className="px-4 py-3.5 text-right">
            <div className="h-4 w-16 bg-muted rounded ml-auto" />
          </td>
          {/* Date */}
          <td className="px-4 py-3.5">
            <div className="h-4 w-20 bg-muted rounded" />
          </td>
          {/* Status */}
          <td className="px-4 py-3.5">
            <div className="h-5 w-16 bg-muted rounded" />
          </td>
        </tr>
      ))}
    </>
  );
}
