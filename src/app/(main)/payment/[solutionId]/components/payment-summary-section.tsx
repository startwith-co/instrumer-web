import { Button } from '@/components/ui/button';

interface PaymentSummarySectionProps {
  price: number;
}

const PaymentSummarySection = ({ price }: PaymentSummarySectionProps) => {
  const amount = price;
  const tax = Math.floor(amount * 0.1);
  const totalAmount = amount + tax;

  const handlePayment = () => {
    // TODO: 결제 모듈 연동
    console.log('결제 모듈 연동 예정');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 금액 내역 */}
      <div className="flex flex-col gap-3 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-md font-semibold">결제 금액</h2>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">주문 금액</span>
          <span className="text-sm">{amount.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">부가세 (10%)</span>
          <span className="text-sm">{tax.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-primary">총 결제 금액</span>
          <span className="text-lg font-semibold text-primary">{totalAmount.toLocaleString()}원</span>
        </div>
      </div>

      {/* 결제 방법 - Stub */}
      <div className="flex flex-col gap-3 p-6 bg-white rounded-md shadow-md">
        <h3 className="text-base font-semibold mb-4">결제 방법</h3>
        <div className="text-sm text-gray-400 text-center py-8 bg-gray-50 rounded-lg">결제 모듈 연동 예정</div>
        {/* 결제하기 버튼 */}
        <Button onClick={handlePayment} className="w-full h-12 text-base">
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentSummarySection;
