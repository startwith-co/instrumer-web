'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Types
interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

interface DropdownProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onSelect?: () => void;
}

interface DropdownLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type DropdownSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

// Context
const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트는 Dropdown.Root 내부에서 사용해야 합니다.');
  }
  return context;
};

// Root Component
const DropdownRoot = ({ children, defaultOpen = false, onOpenChange, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  }, [onOpenChange]);

  const close = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, close]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, open, triggerRef, contentRef }}>
      <div className={cn('relative inline-block', className)}>{children}</div>
    </DropdownContext.Provider>
  );
};

// Trigger Component
const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const { toggle, isOpen, triggerRef } = useDropdown();

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [forwardedRef, triggerRef]
    );

    return (
      <button
        ref={setRefs}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={toggle}
        className={cn('inline-flex items-center justify-center', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownTrigger.displayName = 'DropdownTrigger';

// Content Component
const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, align = 'start', sideOffset = 4, ...props }, forwardedRef) => {
    const { isOpen, contentRef } = useDropdown();

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef, contentRef]
    );

    if (!isOpen) return null;

    const alignmentClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return (
      <div
        ref={setRefs}
        role="menu"
        aria-orientation="vertical"
        style={{ marginTop: sideOffset }}
        className={cn(
          'absolute z-50 min-w-[180px] overflow-hidden rounded-md border bg-white p-1 shadow-lg',
          'animate-in fade-in-0 zoom-in-95',
          alignmentClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownContent.displayName = 'DropdownContent';

// Item Component
const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ children, className, onSelect, disabled, ...props }, ref) => {
    const { close } = useDropdown();

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
      close();
    };

    return (
      <button
        ref={ref}
        role="menuitem"
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'relative flex justify-start items-start w-full cursor-pointer select-none rounded-sm px-3 py-2 text-sm outline-none',
          'transition-colors hover:bg-gray-100 focus:bg-gray-100',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownItem.displayName = 'DropdownItem';

// Label Component
const DropdownLabel = React.forwardRef<HTMLDivElement, DropdownLabelProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('px-3 py-2 text-xs font-semibold text-gray-500', className)} {...props}>
      {children}
    </div>
  );
});
DropdownLabel.displayName = 'DropdownLabel';

// Separator Component
const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(({ className, ...props }, ref) => {
  return <div ref={ref} role="separator" className={cn('-mx-1 my-1 h-px bg-gray-200', className)} {...props} />;
});
DropdownSeparator.displayName = 'DropdownSeparator';

// Compound Component Export
export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Label: DropdownLabel,
  Separator: DropdownSeparator,
};

export { useDropdown };
