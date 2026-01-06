'use client';

import S3Uploader from '@/components/common/s3-uploader';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ISolutionImage } from '@/types/solution';
import { ImagePlus, Upload, X } from 'lucide-react';
import Image from 'next/image';

const IMAGE_TYPE_OPTIONS = [
  { value: 'representation', label: '대표 이미지' },
  { value: 'detail', label: '상세 설명 PDF' },
  { value: 'optional', label: '추가 이미지' },
];

interface ImageUploaderProps {
  images: ISolutionImage[];
  onChange: (images: ISolutionImage[]) => void;
  multiple?: boolean;
  maxCount?: number;
}

const ImageUploader = ({ images, onChange, multiple = true, maxCount }: ImageUploaderProps) => {
  const isMaxReached = maxCount !== undefined && images.length >= maxCount;
  const remainingCount = maxCount !== undefined ? maxCount - images.length : undefined;

  const handleUploadSuccess = (urls: string[]) => {
    // maxCount가 설정된 경우, 남은 슬롯만큼만 추가
    const availableSlots = maxCount !== undefined ? maxCount - images.length : urls.length;
    const urlsToAdd = urls.slice(0, availableSlots);

    const newImages = urlsToAdd.map((url) => ({
      imageUrl: url,
      imageType: 'optional' as ISolutionImage['imageType'],
    }));
    onChange([...images, ...newImages]);
  };

  const handleImageTypeChange = (index: number, imageType: string) => {
    const updatedImages = [...images];
    updatedImages[index] = {
      ...updatedImages[index],
      imageType: imageType as ISolutionImage['imageType'],
    };
    onChange(updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* 업로드 버튼 */}
      <S3Uploader
        onSuccess={handleUploadSuccess}
        accept="image/*"
        multiple={multiple && !isMaxReached}
        maxSize={10 * 1024 * 1024}
      >
        {({ open, uploading, progress }) => (
          <button
            type="button"
            onClick={open}
            disabled={uploading || isMaxReached}
            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-primary hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Upload className="mb-2 h-8 w-8 animate-pulse text-gray-400" />
                <span className="text-sm text-gray-500">업로드 중... {progress}%</span>
              </>
            ) : isMaxReached ? (
              <>
                <ImagePlus className="mb-2 h-8 w-8 text-gray-300" />
                <span className="text-sm text-gray-400">최대 {maxCount}개까지 업로드 가능합니다</span>
              </>
            ) : (
              <>
                <ImagePlus className="mb-2 h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">클릭하여 이미지 업로드</span>
                <span className="text-xs text-gray-400">
                  최대 10MB{multiple ? ', 여러 장 선택 가능' : ''}
                  {remainingCount !== undefined && ` (${remainingCount}개 추가 가능)`}
                </span>
              </>
            )}
          </button>
        )}
      </S3Uploader>

      {/* 업로드된 이미지 목록 */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="relative rounded-lg border bg-white p-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                <Image src={image.imageUrl} alt={`솔루션 이미지 ${index + 1}`} fill className="object-cover" />
              </div>

              {/* 이미지 타입 선택 */}
              <div className="mt-2">
                <Select value={image.imageType} onValueChange={(value) => handleImageTypeChange(index, value)}>
                  <SelectTrigger className="h-8 w-full text-xs">
                    <SelectValue placeholder="이미지 타입" />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGE_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 삭제 버튼 */}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && <p className="text-center text-sm text-gray-500">등록된 이미지가 없습니다.</p>}
    </div>
  );
};

export default ImageUploader;
