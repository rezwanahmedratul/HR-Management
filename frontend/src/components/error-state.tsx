import * as React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <AlertCircle className="w-8 h-8 stroke-[1.5] mb-2" aria-hidden="true" />
      <span className="text-sm font-medium mb-3">Error</span>
      {onRetry && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          aria-label="Retry"
          className="flex items-center justify-center w-8 h-8 rounded border border-border bg-background hover:bg-muted text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </div>
  );
}
