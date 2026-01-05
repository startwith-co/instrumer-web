'use client';

import KeywordInput from './keyword-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ISolutionFormData } from './solution-form';

const SolutionKeywordForm = () => {
  const { control } = useFormContext<ISolutionFormData>();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8">
      <h2 className="mb-8 text-xl font-bold">키워드 검색 태그</h2>
      <Controller
        name="keywords"
        control={control}
        rules={{
          validate: (value) => (value && value.length > 0) || '최소 1개의 키워드를 입력해주세요.',
        }}
        render={({ field, fieldState }) => (
          <KeywordInput
            keywords={field.value || []}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    </section>
  );
};

export default SolutionKeywordForm;
