import { Budget, Category, FilterKey, IFilterConfig } from '@/types';

export const BUDGET_OPTIONS: { value: Budget; label: string; minPrice?: number; maxPrice?: number }[] = [
  { value: '전체', label: '전체' },
  { value: '500,000원 미만', label: '500,000원 미만', maxPrice: 500000 },
  { value: '500,000원~1,000,000원 미만', label: '500,000원~1,000,000원 미만', minPrice: 500000, maxPrice: 1000000 },
  { value: '1,000,000원~3,000,000원 미만', label: '1,000,000원~3,000,000원 미만', minPrice: 1000000, maxPrice: 3000000 },
  { value: '3,000,000원~5,000,000원 미만', label: '3,000,000원~5,000,000원 미만', minPrice: 3000000, maxPrice: 5000000 },
  { value: '5,000,000원~10,000,000원 미만', label: '5,000,000원~10,000,000원 미만', minPrice: 5000000, maxPrice: 10000000 },
  { value: '10,000,000원 이상', label: '10,000,000원 이상', minPrice: 10000000 },
];

export const CATEGORY_OPTIONS: { value: Category; label: string; image?: string }[] = [
  {
    value: 'ADVERTISING_AUTOMATION',
    label: '광고 자동화',
    image: '/images/home/advertising_automation.png',
  },
  {
    value: 'MARKETING_ANALYSIS_AUTOMATION',
    label: '마케팅 분석 · 자동화',
    image: '/images/home/marketing_analysis.png',
  },
  {
    value: 'INFLUENCER_CREATOR_COLLABORATION',
    label: '인플루언서 · 크리에이터 협업',
    image: '/images/home/influencer_collaboration.png',
  },
  {
    value: 'CRM',
    label: '고객 관계 관리(CRM)',
    image: '/images/home/crm.png',
  },
  {
    value: 'CUSTOMER_SERVICE',
    label: '고객 상담 · CS',
    image: '/images/home/customer_service.png',
  },
  {
    value: 'ACCOUNTING_FINANCE',
    label: '회계 · 재무 관리',
    image: '/images/home/accounting_finance.png',
  },
  {
    value: 'INVENTORY_LOGISTICS',
    label: '재고 · 물류 관리',
    image: '/images/home/inventory_logistics.png',
  },
  {
    value: 'PAYMENT_SUBSCRIPTION',
    label: '결제 · 구독 관리',
    image: '/images/home/payment_subscription.png',
  },
  {
    value: 'CONTENT_CREATION_DESIGN',
    label: '콘텐츠 제작 · 디자인',
    image: '/images/home/content_design.png',
  },
];

export const FILTER_CONFIG: Record<FilterKey, IFilterConfig> = {
  category: { paramName: 'category', multiple: false },
  minPrice: { paramName: 'minPrice', multiple: false },
  maxPrice: { paramName: 'maxPrice', multiple: false },
};
