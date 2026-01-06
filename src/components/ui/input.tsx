import { cn } from '@/lib/utils';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  variant?: 'default' | 'underline';
  showCount?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, variant = 'default', showCount, maxLength, value, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="flex flex-col w-full space-y-1">
        {label && <label className="text-sm text-gray-600">{label}</label>}
        <div className="relative w-full">
          <input
            type={type}
            data-slot="input"
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 bg-transparent text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              variant === 'default' &&
                'dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/10 rounded-md border px-3 py-1 shadow-xs transition-[color,box-shadow]',
              variant === 'underline' &&
                'border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:border-primary focus-visible:ring-0',
              error && variant === 'default' && 'border-red-500 focus-visible:border-red-500',
              error && variant === 'underline' && 'border-red-500 focus-visible:border-red-500',
              showCount && 'pr-16',
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            maxLength={maxLength}
            value={value}
            {...props}
          />
          {showCount && maxLength && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
