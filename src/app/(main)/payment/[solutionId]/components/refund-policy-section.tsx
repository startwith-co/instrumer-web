const RefundPolicySection = () => {
  return (
    <div className="bg-[#F6F7F9] rounded-md p-4 flex flex-col gap-2">
      <h2 className="text-base font-semibold">[취소/환불 유의 사항]</h2>

      <ul className="flex flex-col gap-1.5 text-xs">
        <li className="flex items-start gap-1">
          <span className="text-gray-400">•</span>
          <span className="text-primary font-medium">결제 직후 24시간 이내로 취소 시 전액 환불처리됩니다.</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">결제 직후 24시간 이후엔 주문 취소 및 환불이 불가합니다.</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">
            결제 진행 시 취소/환불 유의 사항에 동의한 것으로 간주하며, 인스트루머는 거래 당사자가 아닌
            통신판매중개자로서 거래 시스템을 제공하며,{' '}
            <span className="text-destructive font-medium">
              개별 솔루션의 제공, 계약 이행, 취소 및 환불에 관한 책임은 해당 솔루션 제공자에게 귀속됩니다.
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RefundPolicySection;
