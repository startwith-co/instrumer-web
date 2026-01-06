'use client';

import { MOTION } from '@/constants/motion-constants';
import { ModalContext, useModals } from '@/contexts/modal-provider';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';

const Modal = () => {
  const { openedModals } = useContext(ModalContext);
  const { closeModal } = useModals();

  useEffect(() => {
    document.body.style.overflow = openedModals.length > 0 ? 'hidden' : 'auto';
  }, [openedModals]);

  return (
    <>
      {openedModals.map((modal) => {
        const { id, component } = modal;

        return (
          <div
            key={id}
            className="fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden"
          >
            <div
              className="fixed inset-0 h-dvh w-dvw overflow-hidden bg-black/50"
              onClick={() => closeModal(id)}
            />
            <motion.div className="relative" {...MOTION.POP}>
              {component}
            </motion.div>
          </div>
        );
      })}
    </>
  );
};

export default Modal;
