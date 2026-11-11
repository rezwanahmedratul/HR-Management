import * as React from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <Inbox className="w-8 h-8 stroke-[1.5] mb-2" aria-hidden="true" />
      <span className="text-sm font-medium">Empty</span>
    </div>
  );
}
