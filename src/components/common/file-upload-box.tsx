'use client';

import S3Uploader from '@/components/common/s3-uploader';
import { Plus, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface SingleFileUploadBoxProps {
  value: string;
  onChange: (url: string) => void;
  multiple?: false;
  values?: never;
  onChangeMultiple?: never;
  maxCount?: never;
  type?: 'image' | 'pdf';
  accept?: string;
  label?: string;
  subLabel?: string;
  height?: number;
  aspectRatio?: string;
  className?: string;
  error?: string;
}

interface MultiFileUploadBoxProps {
  value?: never;
  onChange?: never;
  multiple: true;
  values: string[];
  onChangeMultiple: (urls: string[]) => void;
  maxCount?: number;
  type?: 'image' | 'pdf';
  accept?: string;
  label?: string;
  subLabel?: string;
  height?: number;
  aspectRatio?: string;
  className?: string;
  error?: string;
}

type FileUploadBoxProps = SingleFileUploadBoxProps | MultiFileUploadBoxProps;

const FileUploadBox = (props: FileUploadBoxProps) => {
  const {
    type = 'image',
    accept,
    label = '파일 등록',
    subLabel,
    height,
    aspectRatio = '4/3',
    className = '',
    error,
  } = props;
  const fileAccept = accept || (type === 'image' ? 'image/*' : 'application/pdf');
  const maxSize = type === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;

  // URL에서 파일명 추출
  const getFileName = (url: string) => {
    try {
      const decodedUrl = decodeURIComponent(url);
      const fileName = decodedUrl.split('/').pop() || '파일';
      return fileName.length > 20 ? fileName.slice(-20) : fileName;
    } catch {
      return '파일';
    }
  };

  const boxStyle = height ? { height } : { aspectRatio };

  // Multiple 모드
  if (props.multiple) {
    const { values, onChangeMultiple, maxCount } = props;
    const isMaxReached = maxCount !== undefined && values.length >= maxCount;
    const remainingCount = maxCount !== undefined ? maxCount - values.length : undefined;

    const handleUploadSuccess = (urls: string[]) => {
      const availableSlots = maxCount !== undefined ? maxCount - values.length : urls.length;
      const urlsToAdd = urls.slice(0, availableSlots);
      onChangeMultiple([...values, ...urlsToAdd]);
    };

    const handleRemove = (index: number) => {
      const newValues = values.filter((_, i) => i !== index);
      onChangeMultiple(newValues);
    };

    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-4 gap-4">
          {/* 업로드된 이미지들 */}
          {values.map((url, index) => (
            <div
              key={index}
              style={boxStyle}
              className={`relative overflow-hidden rounded-md border border-gray-200 bg-[#F5F5F5] ${className}`}
            >
              {type === 'image' ? (
                <Image src={url} alt={`업로드 이미지 ${index + 1}`} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center px-2">
                  <span className="max-w-full truncate text-sm text-gray-600">{getFileName(url)}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ))}

          {/* 업로드 버튼 */}
          {!isMaxReached && (
            <S3Uploader onSuccess={handleUploadSuccess} accept={fileAccept} maxSize={maxSize} multiple>
              {({ open, uploading, progress }) => (
                <button
                  type="button"
                  onClick={open}
                  disabled={uploading}
                  style={boxStyle}
                  className={`flex flex-col items-center justify-center rounded-md bg-[#F5F5F5] transition-colors hover:bg-gray-100 ${error ? 'border border-red-500' : ''} ${className}`}
                >
                  {uploading ? (
                    <>
                      <Upload className="mb-2 h-6 w-6 animate-pulse text-gray-400" />
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </>
                  ) : (
                    <>
                      <Plus className="mb-2 h-6 w-6 text-gray-400" />
                      <span className="text-sm text-gray-600">{label}</span>
                      {remainingCount !== undefined ? (
                        <span className="text-xs text-gray-400">(최대 {remainingCount}개)</span>
                      ) : (
                        subLabel && <span className="text-xs text-gray-400">{subLabel}</span>
                      )}
                    </>
                  )}
                </button>
              )}
            </S3Uploader>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  // Single 모드 (기존 로직)
  const { value, onChange } = props;

  if (value) {
    return (
      <div
        style={boxStyle}
        className={`relative overflow-hidden rounded-md border border-gray-200 bg-[#F5F5F5] ${className}`}
      >
        {type === 'image' ? (
          <Image src={value} alt="업로드 이미지" fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center px-2">
            <span className="max-w-full truncate text-sm text-gray-600">{getFileName(value)}</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <S3Uploader onSuccess={(urls) => onChange(urls[0])} accept={fileAccept} maxSize={maxSize}>
        {({ open, uploading, progress }) => (
          <button
            type="button"
            onClick={open}
            disabled={uploading}
            style={boxStyle}
            className={`flex flex-col items-center justify-center rounded-md bg-[#F5F5F5] transition-colors hover:bg-gray-100 ${error ? 'border border-red-500' : ''} ${className}`}
          >
            {uploading ? (
              <>
                <Upload className="mb-2 h-6 w-6 animate-pulse text-gray-400" />
                <span className="text-sm text-gray-500">{progress}%</span>
              </>
            ) : (
              <>
                <Plus className="mb-2 h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-600">{label}</span>
                {subLabel && <span className="text-xs text-gray-400">{subLabel}</span>}
              </>
            )}
          </button>
        )}
      </S3Uploader>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUploadBox;
