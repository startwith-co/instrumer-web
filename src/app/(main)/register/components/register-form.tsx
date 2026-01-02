'use client';

import ConsumerRegisterForm from './consumer-register-form';
import VendorRegisterForm from './vendor-register-form';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type TabType = 'consumer' | 'vendor';

const RegisterForm = () => {
  const [activeTab, setActiveTab] = useState<TabType>('consumer');

  return (
    <div className="w-full max-w-[900px] rounded-lg bg-white shadow-lg">
      {/* 탭 헤더 */}
      <div className="flex">
        <button
          type="button"
          onClick={() => setActiveTab('consumer')}
          className={cn(
            'flex-1 rounded-tl-lg py-5 text-center font-semibold leading-none tracking-[-0.02em] transition-colors',
            activeTab === 'consumer'
              ? 'bg-white text-primary'
              : 'bg-[#F1F1F1] text-gray-500 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),inset_-2px_0_4px_rgba(0,0,0,0.1)] hover:text-gray-700'
          )}
        >
          수요 고객 회원가입
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('vendor')}
          className={cn(
            'flex-1 rounded-tr-lg py-5 text-center font-semibold leading-none tracking-[-0.02em] transition-colors',
            activeTab === 'vendor'
              ? 'bg-white text-primary'
              : 'bg-[#F1F1F1] text-gray-500 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),inset_2px_0_4px_rgba(0,0,0,0.1)] hover:text-gray-700'
          )}
        >
          벤더 회원가입
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="p-8">{activeTab === 'consumer' ? <ConsumerRegisterForm /> : <VendorRegisterForm />}</div>
    </div>
  );
};

export default RegisterForm;
