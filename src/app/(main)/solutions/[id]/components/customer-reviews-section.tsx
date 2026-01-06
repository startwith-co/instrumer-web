'use client';

import { SimplePagination } from '@/components/ui/pagination';
import { useSolutionReviews } from '@/lib/review';
import { useState } from 'react';
import ReviewItem from './review-item';

interface CustomerReviewsSectionProps {
  solutionSeq: number;
}

const CustomerReviewsSection = ({ solutionSeq }: CustomerReviewsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data } = useSolutionReviews(solutionSeq, {
    page: currentPage - 1, // API는 0-based indexing
    size: pageSize,
  });

  const reviews = data?.data?.content || [];
  const totalPages = data?.data?.pageInfo?.totalPages || 0;

  return (
    <section className="mb-16">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">이용 고객 리뷰</h2>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <>
          <div className="space-y-3 mb-6">
            {reviews.map((review) => (
              <ReviewItem key={review.solutionReviewSeq} review={review} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <SimplePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-gray-50 rounded-[10px]">
          <p className="text-gray-500">아직 작성된 리뷰가 없습니다.</p>
        </div>
      )}
    </section>
  );
};

export default CustomerReviewsSection;
