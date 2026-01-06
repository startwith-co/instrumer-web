import { IUserResponse } from '@/lib/user';
import { getHypenNumber } from '@/utils/utils';

interface OrdererInfoSectionProps {
  user: IUserResponse;
}

const OrdererInfoSection = ({ user }: OrdererInfoSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-md font-semibold">주문자 정보</h2>

      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">주문자명</span>
          <span className="text-sm ">{user.businessName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">연락처</span>
          <span className="text-sm">{getHypenNumber(user.phone ?? '')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Email</span>
          <span className="text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default OrdererInfoSection;
