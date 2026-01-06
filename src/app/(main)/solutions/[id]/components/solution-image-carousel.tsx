'use client';

import { CATEGORY_OPTIONS } from '@/constants/solution-constants';
import { ISolutionImage } from '@/types/solution';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SolutionImageCarouselProps {
  images?: ISolutionImage[];
  category: string;
}

const SolutionImageCarousel = ({ images, category }: SolutionImageCarouselProps) => {
  const hasImages = images && images.length > 0;
  const categoryLabel = CATEGORY_OPTIONS.find((opt) => opt.value === category)?.label || category;

  return (
    <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden bg-[#D9D9D9]">
      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black text-white px-4 py-1.5 text-xs font-medium rounded-full">{categoryLabel}</div>
      </div>

      {hasImages ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
          }}
          loop={images.length > 1}
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image src={image.imageUrl} alt={`Solution image ${index + 1}`} fill className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Placeholder when no images
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-400">No image available</p>
        </div>
      )}

      {/* Custom Navigation Buttons */}
      {hasImages && images.length > 1 && (
        <>
          <button
            className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-10 rounded-full bg-black/70 text-white hover:bg-black/80 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-10 rounded-full bg-black/70 text-white hover:bg-black/80 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {/* Custom Pagination */}
      {hasImages && (
        <div className="swiper-pagination-custom absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5 [&_.swiper-pagination-bullet]:size-3 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-4" />
      )}
    </div>
  );
};

export default SolutionImageCarousel;
