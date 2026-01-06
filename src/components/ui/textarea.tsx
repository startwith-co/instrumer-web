import { cn } from '@/lib/utils';
import * as React from 'react';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  error?: string;
  variant?: 'default' | 'underline';
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, variant = 'default', showCount, maxLength, value, rows = 1, onChange, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;
    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    // ref 병합
    React.useImperativeHandle(ref, () => internalRef.current!);

    // 높이 조절 함수
    const adjustHeight = React.useCallback(() => {
      const textarea = internalRef.current;
      if (!textarea) return;

      textarea.style.height = 'auto';
      const lineHeight = 24;
      const maxHeight = lineHeight * 6;
      const minHeight = 36;

      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.max(minHeight, Math.min(scrollHeight, maxHeight))}px`;
    }, []);

    // value 변경 시 높이 조절
    React.useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    // onChange 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      adjustHeight();
    };

    return (
      <div className="flex flex-col w-full space-y-1">
        {label && <label className="text-sm text-gray-600">{label}</label>}
        <div className="relative w-full">
          <textarea
            ref={internalRef}
            data-slot="textarea"
            rows={rows}
            className={cn(
              'placeholder:text-muted-foreground flex w-full bg-transparent text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-y-auto',
              variant === 'default' &&
                'border-input focus-visible:border-ring focus-visible:ring-ring/10 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 rounded-md border px-3 py-2 shadow-xs transition-[color,box-shadow]',
              variant === 'underline' &&
                'border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:border-primary focus-visible:ring-0 resize-none',
              error && 'border-red-500 focus-visible:border-red-500',
              className
            )}
            aria-invalid={!!error}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {showCount && maxLength && (
            <span className="absolute right-0 top-2 text-sm text-gray-400">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
