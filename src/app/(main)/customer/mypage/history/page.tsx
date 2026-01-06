'use client';

import { Badge } from '@/components/ui/badge';
import { Suspense } from 'react';

// TODO: 실제 결제 이력 API 연동 필요
interface PaymentHistory {
  id: number;
  solutionName: string;
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'REFUNDED';
  paymentDate: string;
  planName: string;
}

// 임시 데이터 (API 연동 전)
const mockPaymentHistory: PaymentHistory[] = [];

const getStatusBadge = (status: PaymentHistory['status']) => {
  const statusConfig = {
    COMPLETED: { label: '완료', variant: 'success' as const },
    PENDING: { label: '대기중', variant: 'warning' as const },
    CANCELLED: { label: '취소됨', variant: 'error' as const },
    REFUNDED: { label: '환불됨', variant: 'secondary' as const },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const PaymentHistoryContent = () => {
  // TODO: 실제 API 훅으로 교체
  const paymentHistory = mockPaymentHistory;

  if (paymentHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg className="size-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">결제 이력이 없습니다</h3>
        <p className="mt-1 text-sm text-gray-500">솔루션을 구매하면 이곳에 결제 이력이 표시됩니다.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">솔루션</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">플랜</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결제일</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paymentHistory.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">{payment.solutionName}</span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">{payment.planName}</span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">{formatDate(payment.paymentDate)}</span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <span className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center">{getStatusBadge(payment.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PaymentHistorySkeleton = () => (
  <div className="overflow-hidden animate-pulse">
    <div className="border-b border-gray-200 px-4 py-3">
      <div className="flex gap-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-16 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="px-4 py-4 flex gap-8">
          {[...Array(5)].map((_, j) => (
            <div key={j} className="h-4 w-20 bg-gray-200 rounded" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const PaymentHistoryPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">결제 이력</h1>
        <p className="mt-1 text-sm text-gray-500">솔루션 결제 내역을 확인할 수 있습니다.</p>
      </div>

      <Suspense fallback={<PaymentHistorySkeleton />}>
        <PaymentHistoryContent />
      </Suspense>
    </div>
  );
};

export default PaymentHistoryPage;
