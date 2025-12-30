import Modal from '@/components/common/modal';
import AlertProvider from './alert-provider';
import AuthProvider from './auth-provider';
import ModalProvider from './modal-provider';
import { QueryProvider } from './query-provider';
import SessionProvider from '@/contexts/session-provider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

const CoreProvider = ({ children }: ICoreProviderProps) => {
  return (
    <SessionProvider>
      <ModalProvider>
        <AuthProvider>
          <AlertProvider>
            <QueryProvider>{children}</QueryProvider>
          </AlertProvider>
        </AuthProvider>
        <Modal />
      </ModalProvider>
    </SessionProvider>
  );
};

export default CoreProvider;
