'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function TestButton() {
  const [showInput, setShowInput] = useState(false);
  const [id, setId] = useState('');

  const handleLogin = async () => {
    if (!id.trim()) return;
    // 로그인 후 토큰 생성
    const res = await signIn('login-credentials', { login: id, password: 'test', redirect: false });
    if (res?.ok) {
      await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: id, userName: id }),
      });
      window.location.reload();
    }
  };

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="fixed top-2 right-2 z-50 px-2 py-1 bg-gray-500 text-white rounded text-sm"
      >
        테스트 로그인
      </button>
    );
  }

  return (
    <div className="fixed top-2 right-2 z-50 flex gap-2">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        placeholder="ID 입력"
        className="px-2 py-1 border rounded text-sm"
        autoFocus
      />
      <button onClick={handleLogin} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
        로그인
      </button>
    </div>
  );
}
