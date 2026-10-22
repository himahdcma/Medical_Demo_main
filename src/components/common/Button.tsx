import React from 'react';
import { cn } from '../../utils/formatters';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-medical-600 text-white hover:bg-medical-700 active:bg-medical-800 shadow-sm shadow-medical-200 border border-transparent focus:ring-medical-500',
      secondary:
        'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 focus:ring-slate-400',
      outline:
        'bg-white text-medical-700 border border-medical-300 hover:bg-medical-50 active:bg-medical-100 focus:ring-medical-500',
      ghost:
        'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-transparent focus:ring-slate-400',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm border border-transparent focus:ring-red-500',
      teal:
        'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm border border-transparent focus:ring-teal-500',
    };

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-lg font-medium gap-1.5',
      md: 'text-sm px-4 py-2.5 rounded-xl font-medium gap-2',
      lg: 'text-base px-6 py-3.5 rounded-xl font-semibold gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
