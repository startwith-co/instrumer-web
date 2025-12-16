import React from 'react';
import { ChannelSearch, ChannelSearchProps, SearchInput, SearchInputProps } from 'stream-chat-react';

interface IChatChannelSearchProps extends ChannelSearchProps {
  children?: React.ReactNode;
  // 추가적으로 필요한 커스텀 Props가 있다면 정의
}

const ChatChannelSearchInput = (props: SearchInputProps) => {
  return <SearchInput {...props} placeholder="실시간 상담 검색" />;
};

const ChatChannelSearch = (props: IChatChannelSearchProps) => {
  return (
    <div className="block relative w-full">
      <ChannelSearch {...props} SearchInput={ChatChannelSearchInput} />
    </div>
  );
};

export default ChatChannelSearch;
