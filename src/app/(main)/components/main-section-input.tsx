'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const MainSectionInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = inputRef.current?.value.trim();
    if (keyword) {
      router.push(`/solutions?keyword=${keyword}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="relative w-full pl-6 pr-1.5 py-1.5 flex items-center rounded-full shadow-[0px_0px_10px_0px_#0000001A] bg-white"
      >
        <input
          ref={inputRef}
          type="search"
          placeholder="키워드를 검색해주세요."
          className="w-full bg-white text-black placeholder:text-[#7A7A7A] text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="flex size-8 items-center justify-center rounded-full bg-black p-1 text-center text-white"
        >
          →
        </button>
      </form>
    </>
  );
};

export default MainSectionInput;
