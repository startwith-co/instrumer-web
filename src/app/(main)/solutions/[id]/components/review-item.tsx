import StarRating from './star-rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IGetSolutionReviewResponse } from '@/types/review';
import dayjs from 'dayjs';

interface ReviewItemProps {
  review: IGetSolutionReviewResponse;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  // 날짜 포맷: "작성일시 | 25.01.01 AM 11:38"
  const formattedDate = dayjs(review.createdAt).format('작성일시 : YY.MM.DD A hh:mm');

  // 이름 마스킹: 처음 2글자 + "****"
  const maskBusinessName = (name: string): string => {
    if (name.length <= 2) return name + '****';
    return name.slice(0, 2) + '****';
  };

  const maskedName = maskBusinessName(review.businessName);

  return (
    <div className="flex gap-3 p-3 bg-[#F9F9F9] rounded-[10px] items-center">
      {/* Avatar */}
      <Avatar className="size-9 shrink-0">
        <AvatarImage src={review.profileImageUrl} />
        <AvatarFallback className="bg-[#D9D9D9] text-gray-600">{review.businessName[0]}</AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Header: Name, Stars, Date */}
        <div className="flex items-start justify-between">
          <div className="flex flex-row items-center gap-1">
            <p className="text-xs text-gray-900">{maskedName}</p>
            <StarRating rating={review.rate} size="xs" />
          </div>
          <span className="text-xs text-gray-500 shrink-0">{formattedDate}</span>
        </div>

        {/* Review Text */}
        <p className="text-sm font-medium text-gray-700 whitespace-pre-line">{review.context}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
