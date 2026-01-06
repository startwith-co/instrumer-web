import { PolicyTemplate } from '@/components/policy/policy-template';

const PRIVACY_SECTIONS = [
  {
    title: '제1조 (개인정보의 수집 항목 및 수집 방법)',
    content: (
      <>
        <p>&apos;인스트루머&apos;는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
        <p>1. 필수 항목</p>
        <ul className="my-2 ml-6 list-disc space-y-1">
          <li>밴더 : 사업자명, 사업자등록증, 담당자 성명, 담당자 연락처, 담당자 이메일</li>
          <li>기업 고객 : 사업자명, 담당자 연락처, 담당자 이메일, 종사 산업군</li>
        </ul>
        <p>2. 위 정보는 회원가입 시 수집됩니다.</p>
      </>
    ),
  },
  {
    title: '제2조 (개인정보의 수집 및 이용 목적)',
    content: (
      <>
        <p>&apos;인스트루머&apos;는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</p>
        <ol className="my-2 ml-6 list-decimal space-y-1">
          <li>서비스 제공 및 계약 이행</li>
          <li>회원 관리</li>
          <li>고객 상담 및 불만 처리</li>
          <li>마케팅 및 광고 활용(이용자의 동의가 있는 경우)</li>
        </ol>
      </>
    ),
  },
  {
    title: '제3조 (개인정보의 보유 및 이용 기간)',
    content:
      "'인스트루머'는 개인정보 수집 및 이용 목적이 달성된 후에는 '개인저오의 안정한 파기 절차 및 방법'에 따라 즉시 파기하거나, 관련 법령에 따라 일정 기간 동안 별도로 분리 보관한 후 파기합니다.",
  },
  {
    title: '제4조 (개인정보의 제3자 제공)',
    content:
      "'인스트루머'는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 따라 요구되는 경우에는 예외로 합니다.",
  },
  {
    title: '제5조 (정보주체의 권리와 그 행사 방법)',
    content:
      "이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지 등을 요청할 수 있으며, '인스트루머'는 이에 지체 없이 조치합니다.",
  },
];

export default function PrivacyPage() {
  return (
    <PolicyTemplate
      title="개인정보보호 및 처리방침"
      description="법적 근거: 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」"
      sections={PRIVACY_SECTIONS}
    />
  );
}
