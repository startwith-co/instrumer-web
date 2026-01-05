'use client';

import Input from '@/components/ui/input';
import { X } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
  maxKeywords?: number;
  error?: string;
}

const KeywordInput = ({ keywords, onChange, maxKeywords = 10, error }: KeywordInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddKeyword = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    if (keywords.includes(trimmedValue)) {
      alert('이미 등록된 키워드입니다.');
      return;
    }
    if (keywords.length >= maxKeywords) {
      alert(`키워드는 최대 ${maxKeywords}개까지 등록할 수 있습니다.`);
      return;
    }

    onChange([...keywords, trimmedValue]);
    setInputValue('');
  };

  const handleRemoveKeyword = (index: number) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    onChange(updatedKeywords);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 입력 중(IME 조합 중)에는 무시
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className="space-y-4">
      {/* 라벨 */}
      <label className="block text-sm text-gray-700">
        키워드 입력 <span className="text-red-500">*</span>
      </label>

      {/* 입력 필드 + 태그 (가로 배치) */}
      <div className="flex items-center gap-4">
        <div className="w-[400px] shrink-0">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="underline"
            placeholder="키워드를 입력해주세요."
          />
        </div>

        {/* 키워드 태그 목록 */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 rounded-md bg-[#F1F1F1] px-3 py-1.5 text-sm text-gray-700"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(index)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default KeywordInput;
