'use client';

import { ISolutionFormData } from './solution-form';
import FileUploadBox from '@/components/common/file-upload-box';
import { ControlledInput } from '@/components/ui/controlled-input';
import { Dropdown } from '@/components/ui/dropdown';
import Textarea from '@/components/ui/textarea';
import { REGEX } from '@/constants/regex-constants';
import { CATEGORY_OPTIONS } from '@/constants/solution-constants';
import { ChevronDown } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

const SolutionInfoForm = () => {
  const form = useFormContext<ISolutionFormData>();
  const { control, watch, setValue } = form;

  const additionalImages = watch('additionalImages');

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8">
      <h2 className="mb-8 text-xl font-bold">솔루션 기본 정보 입력</h2>

      {/* 솔루션명 + 솔루션 기본 설명 (가로 배치) */}
      <div className="mb-6 grid grid-cols-2 gap-8">
        {/* 솔루션명 */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            솔루션명 <span className="text-red-500">*</span>
          </label>
          <ControlledInput
            form={form}
            name="name"
            type="text"
            variant="underline"
            placeholder="솔루션명을 입력해주세요."
            rules={{ required: '솔루션명을 입력해주세요.' }}
          />
        </div>

        {/* 솔루션 기본 설명 */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            솔루션 기본 설명 <span className="text-red-500">*</span>
          </label>
          <Controller
            name="explanation"
            control={control}
            rules={{ required: '솔루션 기본 설명을 입력해주세요.' }}
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                variant="underline"
                placeholder="솔루션 기본 설명을 입력해주세요."
                maxLength={300}
                showCount
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        {/* 솔루션 대표 가격 설정 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-700">
            솔루션 대표 가격 설정 <span className="text-red-500">*</span>
          </label>
          <ControlledInput
            form={form}
            name="price"
            type="number"
            variant="underline"
            placeholder="솔루션 플랜 중 주력 상품의 가격을 입력해주세요."
            rules={{
              validate: (value) => (typeof value === 'number' && value > 0) || '가격을 입력해주세요.',
            }}
          />
        </div>

        {/* 솔루션 웹사이트 URL */}
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-700">
            솔루션 웹사이트 URL <span className="text-red-500">*</span>
          </label>
          <ControlledInput
            form={form}
            name="webUrl"
            type="url"
            variant="underline"
            placeholder="솔루션 웹사이트 URL을 입력해주세요. (예: https://example.com)"
            rules={{
              required: '웹사이트 URL을 입력해주세요.',
              pattern: { value: REGEX.URL, message: '올바른 URL 형식이 아닙니다.' },
            }}
          />
        </div>

        {/* 솔루션 카테고리 */}
        <div className="mb-8">
          <label className="mb-2 block text-sm text-gray-700">
            솔루션 카테고리 <span className="text-red-500">*</span>
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: '카테고리를 선택해주세요.' }}
            render={({ field, fieldState }) => {
              const selectedLabel = CATEGORY_OPTIONS.find((opt) => opt.value === field.value)?.label;
              return (
                <>
                  <Dropdown.Root className="w-full block">
                    <Dropdown.Trigger
                      className={`w-full flex justify-between items-center border-0 border-b ${fieldState.error ? 'border-red-500' : 'border-gray-300'} rounded-none px-0 py-2 text-left text-sm`}
                    >
                      <span className={selectedLabel ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedLabel || '카테고리 선택'}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Dropdown.Trigger>
                    <Dropdown.Content align="start" className="w-full">
                      {CATEGORY_OPTIONS.map((option) => (
                        <Dropdown.Item key={option.value} onSelect={() => field.onChange(option.value)}>
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Content>
                  </Dropdown.Root>
                  {fieldState.error && <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>

      {/* 대표 이미지 + 솔루션 상세 설명 PDF (가로 배치) */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* 대표 이미지 */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            대표 이미지 <span className="text-red-500">*</span>
          </label>
          <Controller
            name="thumbnailUrl"
            control={control}
            rules={{ required: '대표 이미지를 등록해주세요.' }}
            render={({ field, fieldState }) => (
              <FileUploadBox
                value={field.value}
                onChange={field.onChange}
                type="image"
                label="이미지 등록"
                subLabel="(최대 1개)"
                className="w-full"
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        {/* 솔루션 상세 설명 PDF */}
        <div>
          <label className="mb-2 block text-sm text-gray-700">
            솔루션 상세 설명 PDF <span className="text-red-500">*</span>
          </label>
          <Controller
            name="pdfUrl"
            control={control}
            rules={{ required: 'PDF 파일을 등록해주세요.' }}
            render={({ field, fieldState }) => (
              <FileUploadBox
                value={field.value}
                onChange={field.onChange}
                type="pdf"
                label="PDF 파일 등록"
                subLabel="(최대 1개)"
                className="w-full"
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      {/* 추가 이미지 (선택) */}
      <div>
        <label className="mb-2 block text-sm text-gray-700">
          추가 이미지<span className="text-gray-400">(선택, 최대 4개)</span>
        </label>
        <FileUploadBox
          multiple
          values={additionalImages || []}
          onChangeMultiple={(urls) => setValue('additionalImages', urls)}
          maxCount={4}
          type="image"
          label="이미지 등록"
        />
      </div>
    </section>
  );
};

export default SolutionInfoForm;
