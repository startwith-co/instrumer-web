'use client';

import ChatLoading from '@/components/chat/chat-loading';
import { Suspense } from 'react';
import ChatPageContent from './chat-page-content';

const ChatPage = () => {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatPageContent />
    </Suspense>
  );
};

export default ChatPage;
