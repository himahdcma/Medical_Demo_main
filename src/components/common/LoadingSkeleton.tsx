import React from 'react';
import { cn } from '../../utils/formatters';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200/80 rounded-lg',
        className
      )}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col space-y-3">
      <Skeleton className="w-full h-44 rounded-xl" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="w-20 h-4 rounded-md" />
        <Skeleton className="w-full h-5 rounded-md" />
        <Skeleton className="w-3/4 h-3 rounded-md" />
      </div>
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="w-16 h-5 rounded-md" />
          <Skeleton className="w-10 h-3 rounded-md" />
        </div>
        <Skeleton className="w-24 h-9 rounded-xl" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3">
      <Skeleton className="w-full h-10 rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="w-full h-12 rounded-lg" />
      ))}
    </div>
  );
};
