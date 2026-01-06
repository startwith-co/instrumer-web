const OrderDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-3 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-6" />
      <div className="flex flex-row gap-6">
        {/* 이미지 */}
        <div className="w-[220px] h-[140px] bg-gray-200 rounded-lg shrink-0" />
        {/* 정보 */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="flex justify-between mt-2">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdererInfoSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      <div className="h-6 w-24 bg-gray-200 rounded mb-6" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex justify-between">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

const RefundPolicySkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-4 w-full bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
};

const PaymentSummarySkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      <div className="h-6 w-24 bg-gray-200 rounded mb-6" />
      <div className="flex flex-col gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="h-12 w-full bg-gray-200 rounded-lg" />
    </div>
  );
};

const PaymentPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="mx-auto px-20 py-12 w-full">
        <div className="flex flex-row gap-8">
          {/* 좌측 */}
          <div className="flex-1 flex flex-col gap-6">
            <OrderDetailSkeleton />
            <OrdererInfoSkeleton />
            <RefundPolicySkeleton />
          </div>

          {/* 우측 */}
          <div className="w-[400px]">
            <PaymentSummarySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPageSkeleton;
