interface ChatErrorProps {
  message: string;
}

const ChatError = ({ message }: ChatErrorProps) => {
  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center">
      <p className="text-destructive">{message}</p>
    </div>
  );
};

export default ChatError;
