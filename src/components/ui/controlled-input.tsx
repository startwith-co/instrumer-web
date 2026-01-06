'use client';

import Input from '@/components/ui/input';
import { formatNumberWithCommas, getOnlyNumber } from '@/utils/utils';
import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { Controller, FieldValues, Path, UseFormReturn, useWatch } from 'react-hook-form';

interface IControlledInputProps<T extends FieldValues> extends Omit<
  React.ComponentProps<'input'>,
  'name' | 'type' | 'form'
> {
  form: UseFormReturn<T>;
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  variant?: 'default' | 'underline';
  rules?: Parameters<UseFormReturn<T>['register']>[1];
}

export const ControlledInput = <T extends FieldValues>({
  form,
  name,
  type = 'text',
  label,
  variant,
  rules,
  ...props
}: IControlledInputProps<T>) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const watchedValue = useWatch({ control: form.control, name });

  // Sync displayValue with form value for number type
  useEffect(() => {
    if (type === 'number' && watchedValue) {
      const formatted = formatNumberWithCommas(watchedValue.toString());
      if (formatted !== displayValue) {
        setDisplayValue(formatted);
      }
    } else if (type === 'number' && !watchedValue) {
      setDisplayValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValue, type]);

  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <Input
            value={type === 'number' ? displayValue : field.value}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            label={label}
            variant={variant}
            error={form.formState.errors?.[name]?.message as string}
            type={type === 'number' ? 'text' : type}
            required={!!rules?.required}
            onChange={(e) => {
              if (type === 'number') {
                // Store the raw number value in the form
                const rawValue = getOnlyNumber(e.target.value);
                field.onChange(rawValue ? Number(rawValue) : 0);

                // Update the display value with commas
                const formatted = formatNumberWithCommas(e.target.value);
                setDisplayValue(formatted);
              } else {
                field.onChange(e);
              }
            }}
            {...props}
          />
        );
      }}
    />
  );
};
