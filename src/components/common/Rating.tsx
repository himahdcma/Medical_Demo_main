import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/formatters';

interface RatingProps {
  value: number;
  max?: number;
  count?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  count,
  size = 'sm',
  showCount = true,
  className,
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center text-amber-400">
        {Array.from({ length: max }).map((_, index) => {
          const filled = index + 1 <= Math.round(value);
          return (
            <Star
              key={index}
              className={cn(
                iconSizes[size],
                filled ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
              )}
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold text-slate-700">{value.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className="text-[11px] text-slate-400">({count.toLocaleString()})</span>
      )}
    </div>
  );
};
