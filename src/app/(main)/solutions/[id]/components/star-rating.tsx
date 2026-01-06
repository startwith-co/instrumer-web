import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // 1-5
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const StarRating = ({ rating, size = 'sm', className }: StarRatingProps) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={cn('flex items-center gap-0.5', sizeClasses[size], className)}>
      {Array.from({ length: rating }).map((_, index) => (
        <span key={index} className="text-black">
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
