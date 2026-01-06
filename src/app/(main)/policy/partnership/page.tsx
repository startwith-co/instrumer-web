import { PolicyTemplate } from '@/components/policy/policy-template';
import Link from 'next/link';

const PARTNERSHIP_SECTIONS = [
  {
    title: '제1조 (광고 콘텐츠의 명확한 표시)',
    content:
      "'인스트루머'는 광고성 콘텐츠에 대해 '광고', '협찬' 등의 문구를 명확히 표시하여 이용자가 이를 인지할 수 있도록 합니다.",
  },
  {
    title: '제2조 (광고주와의 계약)',
    content: (
      <>
        <p>
          1. &apos;인스트루머&apos;는 광고주와의 계약 시 광고 내용, 기간, 수수료 등을 명확히 규정하며, 계약 내용을
          성실히 이행합니다.
        </p>
        <p>
          2. &apos;인스트루머&apos;과 광고주는 이해상충이 발생하지 않도록 상호 신뢰에 기반한 기준을 준수하며, 특정
          업체에 대한 과도한 편향 노출은 제한될 수 있습니다.
        </p>
      </>
    ),
  },
  {
    title: '제3조 (이용자 보호)',
    content:
      "'인스트루머'는 광고로 인한 이용자의 피해를 최소화하기 위해 광고 내용을 사전에 검토하며, 허위·과장 광고를 방지합니다.",
  },
  {
    title: '',
    content: (
      <>
        <p className="font-semibold">SOLU 광고제휴 희망시 아래의 구글폼 작성을 부탁드립니다.</p>
        <Link href="https://www.googleform.com" target="_blank" className="text-blue-600 underline hover:text-blue-800">
          www.googleform.com
        </Link>
      </>
    ),
  },
];

export default function PartnershipPage() {
  return (
    <PolicyTemplate
      title="광고제휴"
      description="법적 근거: 「표시·광고의 공정화에 관한 법률」, 「전자상거래 등에서의 소비자보호에 관한 법률」"
      sections={PARTNERSHIP_SECTIONS}
    />
  );
}
