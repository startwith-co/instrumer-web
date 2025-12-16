import { EmptyStateIndicator, EmptyStateIndicatorProps } from 'stream-chat-react';

interface IChatEmptyStateIndicatorProps extends EmptyStateIndicatorProps {
  children?: React.ReactNode;
}

const ChatEmptyStateIndicator = ({ ...props }: IChatEmptyStateIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <EmptyStateIndicator {...props} />
      <div>Empty View 디자인 필요</div>
    </div>
  );
};

export default ChatEmptyStateIndicator;
